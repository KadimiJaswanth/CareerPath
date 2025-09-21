'use server';

import {
  generateInterviewQuestions,
  type InterviewQuestionGeneratorInput,
} from '@/ai/flows/interview-question-generator';

export async function generateInterviewQuestionsAction(
  input: InterviewQuestionGeneratorInput
) {
  try {
    const result = await generateInterviewQuestions(input);
    return result;
  } catch (error) {
    console.error('Error generating interview questions:', error);
    throw new Error('Failed to generate interview questions.');
  }
}
