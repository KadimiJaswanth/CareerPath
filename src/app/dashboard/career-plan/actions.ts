'use server';

// This file is no longer used for generating the career plan on the client-side,
// but the AI flow is kept for potential future use or for other parts of the application.

import {
  generateCareerPlan,
  type CareerPlanInput,
} from '@/ai/flows/personalized-career-plan';

export async function generateCareerPlanAction(input: CareerPlanInput) {
  try {
    const result = await generateCareerPlan(input);
    return result;
  } catch (error) {
    console.error('Error generating career plan:', error);
    // Re-throw the error or handle it as needed, but don't return mock data.
    throw new Error('Failed to generate career plan.');
  }
}
