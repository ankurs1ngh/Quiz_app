import create from 'zustand';
import { QuizStore } from '../interface/interface';

const useQuizOneStore = create<QuizStore>((set) => ({
  title: 'Quiz One Title',
  quizStarted: false,
  toggleQuiz: () => set((state: any) => ({ quizStarted: !state.quizStarted })),
  totalQuestions: 0,
  setTotalQuestions: (totalQuestions: any) =>
    set(() => ({ totalQuestions: totalQuestions })),
  questions: [],
  setInitialQuestions: (initialQuestions: any) =>
    set(() => ({ questions: initialQuestions })),
  currentQuestion: 1,
  nextQuestion: () =>
    set((state: any) => ({ currentQuestion: state.currentQuestion + 1 })),
  addQuestion: (question: any) =>
    set((state: any) => ({ questions: [...state.questions, question] })),
  submitAnswer: (answer: any) =>
    set((state: any) => {
      const updatedQuestionWIthAnswer = state.questions.map((question: any) => {
        if (question.id === answer.id) {
          return { ...question, submittedAns: answer.submittedAns };
        }
        return question;
      });

      return { questions: updatedQuestionWIthAnswer };
    }),
}));

const useQuizTwoStore = create((set) => ({
  title: 'Quiz Two Title',
  quizStarted: false,
  toggleQuiz: () => set((state: any) => ({ quizStarted: !state.quizStarted })),
  totalQuestions: 0,
  setTotalQuestions: (totalQuestions: any) =>
    set(() => ({ totalQuestions: totalQuestions })),
  questions: [],
  setInitialQuestions: (initialQuestions: any) =>
    set(() => ({ questions: initialQuestions })),
  currentQuestion: 1,
  nextQuestion: () =>
    set((state: any) => ({ currentQuestion: state.currentQuestion + 1 })),
  addQuestion: (question: any) =>
    set((state: any) => ({ questions: [...state.questions, question] })),
  submitAnswer: (answer: any) =>
    set((state: any) => {
      const updatedQuestionWIthAnswer = state.questions.map((question: any) => {
        if (question.id === answer.id) {
          return { ...question, submittedAns: answer.submittedAns };
        }
        return question;
      });

      return { questions: updatedQuestionWIthAnswer };
    }),
}));

export { useQuizOneStore, useQuizTwoStore };

// { id: 1, title: '4 + 2', answer: 6, submittedAns: null }
// { id: 1, title: '4 + 2', answer: 6, submittedAns: 6 }
