import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
import { SimpleGrid, Button, VStack, Input, Center, Select, Stack , Text } from '@chakra-ui/react';

import { useQuizOneStore, useQuizTwoStore } from '../store/quizstore';

const Layout = () => {
  const [totalQuestionsForQuizOne, setTotalQuestionsForQuizOne] =
    useState<number | string>('');
  const [totalQuestionsForQuizTwo, setTotalQuestionsForQuizTwo] =
    useState<number | string>('');

  const quizOneStarted = useQuizOneStore((state: any) => state.quizStarted);
  const toggleQuizOne = useQuizOneStore((state: any) => state.toggleQuiz);

  const setQuizOneTotalQuestions = useQuizOneStore(
    (state: any) => state.setTotalQuestions,
  );
  const setQuizOneInitialQuestions = useQuizOneStore(
    (state: any) => state.setInitialQuestions,
  );

  const quizTwoStarted = useQuizTwoStore((state: any) => state.quizStarted);
  const toggleQuizTwo = useQuizTwoStore((state: any) => state.toggleQuiz);

  const setQuizTwoTotalQuestions = useQuizTwoStore(
    (state: any) => state.setTotalQuestions,
  );
  const setQuizTwoInitialQuestions = useQuizTwoStore(
    (state: any) => state.setInitialQuestions,
  );



  const [rangeQuizOne , setRangeQuizOne] = useState<number | string>('');
  const [rangeQuizTwo , setRangeQuizTwo] = useState<number | string>('');
  const [operatorQuizOne , setOperatorQuizOne] = useState<string>('');
  const [operatorQuizTwo , setOperatorQuizTwo] = useState<string>('');
  // const [range , setRange]= useState<number>(10)

  const utils = {
    toggleQuizOne,
    toggleQuizTwo,

    setQuizOneInitialQuestions,
    setQuizTwoInitialQuestions,

    setTotalQuestionsForQuizOne,
    setTotalQuestionsForQuizTwo,

    setRangeQuizOne,
    setRangeQuizTwo,

    setOperatorQuizOne,
    setOperatorQuizTwo
  }

  const GenerateAndToggleQuiz = (quizName: string) => {
    const operators = ['+', '-', '*', '/'];
    const answerGenerator: any = {
      '+': (n1: number, n2: number) => n1 + n2,
      '-': (n1: number, n2: number) => n1 - n2,
      '*': (n1: number, n2: number) => n1 * n2,
      '/': (n1: number, n2: number) => Math.floor(n1 / n2),
    };

    let range:any = 10;
    let operator: any
    

    const questionsOne: any = [];
    const questionsTwo: any = [];

    const generatedQuestions = (quizName: string, length: number) => {
      
      const num1 = Math.floor(Math.random() * range + 1);
      const num2 = Math.floor(Math.random() * range + 1);
      const operatorIndex = Math.floor(Math.random() * 3 + 1);

      const question = `${num1} ${operator!='all' ? operator : operators[operatorIndex]} ${num2}`;
      const answer = answerGenerator[operator!='all' ? operator : operators[operatorIndex]](num1, num2);

      if (quizName === 'quiz one') {
        const newQuestion = {
          id: questionsOne.length + 1,
          title: question,
          answer,
          submittedAns: '',
        };
        questionsOne.push(newQuestion);
      }

      if (quizName === 'quiz two') {
        const newQuestion = {
          id: questionsTwo.length + 1,
          title: question,
          answer,
          submittedAns: '',
        };
        questionsTwo.push(newQuestion);
      }
    };

    if (quizName === 'quiz one') {
      range=rangeQuizOne;
      operator= operatorQuizOne;
      new Array(totalQuestionsForQuizOne)
        .fill('')
        .map((_, index) => generatedQuestions('quiz one', index));
      setQuizOneTotalQuestions(totalQuestionsForQuizOne);
      setQuizOneInitialQuestions(questionsOne);
      // setRange(rangeQuizOne);

      toggleQuizOne();
    }

    if (quizName === 'quiz two') {
      range=rangeQuizTwo;
      operator= operatorQuizTwo
      new Array(totalQuestionsForQuizTwo)
        .fill('')
        .map((_, index) => generatedQuestions('quiz two', index));
      setQuizTwoTotalQuestions(totalQuestionsForQuizTwo);
      setQuizTwoInitialQuestions(questionsTwo);

      toggleQuizTwo();
    }
  };

  return (
    <SimpleGrid columns={2} spacing={10}>
      {quizOneStarted ? (
        <Quiz quizName='quiz one' utils={utils}/>
      ) : (
        <Center>
          <VStack width='40%'>
            <Input
              placeholder='Enter Number of Questions'
              value={totalQuestionsForQuizOne}
              onChange={(e: any) =>
                setTotalQuestionsForQuizOne(Number(e.target.value))
              }
            />
            <Input
              placeholder='Enter Range'
              value={rangeQuizOne}
              onChange={(e: React.ChangeEvent<{ value: unknown }>)=>{setRangeQuizOne(e.target.value as number)}}
            />
            <Select variant='outlined' placeholder='select operator' value={operatorQuizOne} onChange={(e: React.ChangeEvent<{ value: unknown }>)=>{setOperatorQuizOne(e.target.value as string)}}>
              <option value='all'>All Operators</option>
              <option value='+'>Addition</option>
              <option value='-'>Subtraction</option>
              <option value='*'>Multiplication</option>
              <option value='/'>Division</option>
            </Select>
            <Button onClick={() => GenerateAndToggleQuiz('quiz one')}>
              Start Quiz One
            </Button>
          </VStack>
        </Center>
      )}

      {quizTwoStarted ? (
        <Quiz quizName='quiz two' utils={utils}/>
      ) : (
        <Center>
          <VStack width='40%'>
            <Input
              placeholder='Enter Number of Questions'
              value={totalQuestionsForQuizTwo}
              onChange={(e: any) =>
                setTotalQuestionsForQuizTwo(Number(e.target.value))
              }
            />
            <Input 
              placeholder='Enter Range'
              value={rangeQuizTwo}
              onChange={(e: React.ChangeEvent<{ value: unknown }>)=>{setRangeQuizTwo(e.target.value as number)}} 
            />
            <Select variant='outlined' placeholder='select operator' value={operatorQuizTwo} onChange={(e: React.ChangeEvent<{ value: unknown }>)=>{setOperatorQuizTwo(e.target.value as string)}}>
              <option value='all'>All Operators</option>
              <option value='+'>Addition</option>
              <option value='-'>Subtraction</option>
              <option value='*'>Multiplication</option>
              <option value='/'>Division</option>
            </Select>
            <Button onClick={() => GenerateAndToggleQuiz('quiz two')}>
              Start Quiz Two
            </Button>
          </VStack>
        </Center>
      )}
    </SimpleGrid>
  );
};

export default Layout;
