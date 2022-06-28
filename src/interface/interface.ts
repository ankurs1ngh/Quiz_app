export interface QuizStore {
    title : string;
    quizStarted: boolean;
    totalQuestions: number;
    toggleQuiz : () => void;
    setTotalQuestions : (totalQuestions: any) => void;
    questions: Question[];
    setInitialQuestions: (initialQuestions: any) => void;
    currentQuestion: number;
    nextQuestion: () => void;
    addQuestion: (question: any) => void;
    submitAnswer: (answer: any) => void;
}

export interface Question { 
    id: number;
    title: string; 
    answer: number, 
    submittedAns: number | string;
}