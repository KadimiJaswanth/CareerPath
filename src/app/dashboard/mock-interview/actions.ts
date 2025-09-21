'use server';

import {
  generateFeedbackForAnswers,
  type InterviewFeedbackInput,
} from '@/ai/flows/interview-feedback-generator';

export async function getFeedbackForInterview(input: InterviewFeedbackInput) {
  try {
    const result = await generateFeedbackForAnswers(input);
    return result;
  } catch (error) {
    console.error('Error in interview feedback generation:', error);
    throw new Error('Failed to generate interview feedback.');
  }
}
