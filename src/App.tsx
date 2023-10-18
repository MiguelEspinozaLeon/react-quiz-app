import { useState } from 'react'
import './App.css'

type question = {
  questionText: string,
  answers: string[],
  correctAnswer: string
}
const questions : question[] = [
  {
    questionText: 'What is the capital of France?',
    answers: [
      'New York',
      'Paris',
      'Tokyo',
      'Dallas'
    ],
    correctAnswer: 'Paris'
  },
  {
    questionText: 'What color is the sky?',
    answers: [
      'blue',
      'red',
      'yellow',
      'brown'
    ],
    correctAnswer: 'blue' 

  },
  {
    questionText: 'What is 2 + 2?',
    answers: [
      '4',
      '16',
      '3',
      '2'
    ],
    correctAnswer: '4' 
  },
  {
    questionText: 'How many months are there in a year?',
    answers: [
      '9',
      '10',
      '12',
      '11'
    ],
    correctAnswer: '12' 
  }
]


function App() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  
  const handleAnswerSelect = (answer: string) => {
      if(answer === questions[currentQuestion].correctAnswer){
        setScore(prevstate=> prevstate + 100);
      }else{
        setWrongAnswers(prevstate => prevstate + 1);
      }
      nextQuestion()
  } 

  function nextQuestion(){
    if(currentQuestion == questions.length-1){
      setIsQuizFinished(true);
      setCurrentQuestion(0);
    }else{
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  const takeTestAgain = () => {
    setIsQuizFinished(false);
    setScore(0);
    setWrongAnswers(0);
  }
  

  return (
    <>
           {isQuizFinished ? (
            <>
              <p>Your final score was : {score/questions.length}</p>
              <p className='text-red-500 font-bold'>You got {wrongAnswers} question{wrongAnswers > 1 ? "s" : ''} wrong.</p>
              <button className='rounded-lg border-2 border-black w-[100px] bg-sky-500' onClick={takeTestAgain}>Take test again</button>
            </>
           ) : ( 
              <div className='container flex flex-col items-center gap-2'>
                <h1 className='text-2xl underline'>{questions[currentQuestion].questionText}</h1>
                <ul className='flex flex-col items-center gap-2'>
                  {questions[currentQuestion].answers.map((answer: string, index: number)=>(
                      <li key={index}>
                          <button className='rounded-lg border-2 border-black w-[100px] hover:bg-green-500' onClick={()=> {handleAnswerSelect(answer)}} >{answer}</button>
                      </li>
                  ))}
                </ul>      
              </div>
           )}      
    </>
  )
}

export default App
