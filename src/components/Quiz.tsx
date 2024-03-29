import React, { useEffect, useState } from 'react';

import { Box, Input, Center, Button, HStack, Stack , Text, VStack} from '@chakra-ui/react';
import useSelectQuiz from '../hooks/useSelectQuiz';

const Quiz = ({ quizName , utils }: any) => {
  const [userAnswer, setUserAnswer] = useState<any>('');

  const useQuizStore: any = useSelectQuiz(quizName);

  const title = useQuizStore((state: any) => state.title);
  const questions = useQuizStore((state: any) => state.questions);
  const currentQuestion = useQuizStore((state: any) => state.currentQuestion);
  const nextQuestion = useQuizStore((state: any) => state.nextQuestion);
  const submitAnswer = useQuizStore((state: any) => state.submitAnswer);
  const totalQuestions = useQuizStore((state: any) => state.totalQuestions);  
  const reset = useQuizStore((state: any) => state.reset);

  const [counterQuiz , setCounterQuiz] = useState<number>(20);

  
  let resetTotalQuestions: any
  let resetRange: any
  let resetOperator: any

  console.log(questions) 

  if(quizName ==="quiz one") { 
    resetTotalQuestions = () => utils.setTotalQuestionsForQuizOne('')
    resetRange = () => utils.setRangeQuizOne('')
    resetOperator = () => utils.setOperatorQuizOne('')
  }

  if(quizName ==="quiz two") {
    resetTotalQuestions = () => utils.setTotalQuestionsForQuizTwo('')
    resetRange = () => utils.setRangeQuizTwo('')
    resetOperator = () => utils.setOperatorQuizTwo('')
  }

  const handleReset = ()=>{
    reset()
    resetTotalQuestions();
    resetRange();
    resetOperator();
  }

  useEffect(()=>{
    if(counterQuiz === 0){
      answerSubmitted();
      setCounterQuiz(20);
    }
    const timer:any=
    counterQuiz > 0 && setInterval(()=> setCounterQuiz(counterQuiz-1),1000 );
    return () =>clearInterval(timer); 
    
  },[counterQuiz])

  const answerSubmitted = () => {
    setCounterQuiz(20);
    const answer = {
      ...questions[currentQuestion - 1],
      submittedAns: userAnswer,
    };

    submitAnswer(answer);

    nextQuestion();
    setUserAnswer('');
  };

  if (currentQuestion > totalQuestions) {
    
    return (
      <div>
        {questions.map((question: any) => (
          <Box key={question.id} bg='gray.200' p={4} style={{marginBottom:'10px'}}>
            <h1>Question: {question.title}</h1>
            <h1>Correct Answer: {question.answer}</h1>
            <h1>Submitted Answer: {question.submittedAns}</h1>
            <h1>
              Result:
              {question.answer === question.submittedAns ? 'Correct' : 'Wrong'}
            </h1>
          </Box>
        ))}
        <Stack>
            <Button size='md' style={{color:'#FFF' , backgroundColor:'red'}} onClick={handleReset}>Reset</Button>
        </Stack>
      </div>
    );
  }
  
  return (
    
    <div>
        
      {title}
      <Box bg='gray.200' height='80px'>
        <Center h='80px'>{questions[currentQuestion - 1].title}</Center>
        <Stack>
            <Text fontSize='xs'> Timer:{counterQuiz}</Text>
        </Stack>
      </Box>
      <Center py={4} style={{display:'block'}}>
        <HStack spacing='24px'>
          <Input
            placeholder='Enter Your Answer'
            value={userAnswer}
            onChange={(e: any) => setUserAnswer(Number(e.target.value))}
          />

          <Button colorScheme='blue' size='md' style={{marginLeft:'10px'}} onClick={answerSubmitted}>
            Button
          </Button>
        </HStack>
        <VStack>
            <Button size='md' style={{color:'#FFF' , backgroundColor:'red', marginTop:'20px'}} onClick={handleReset}>Reset</Button>
        </VStack>
      </Center>
    </div>
);
};

export default Quiz;
