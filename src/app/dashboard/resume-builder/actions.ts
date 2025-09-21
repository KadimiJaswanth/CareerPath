'use server';

import { generateResume } from '@/ai/flows/resume-generator';
import type { ResumeGeneratorInput } from '@/ai/flows/resume-generator-schemas';

export type { ResumeGeneratorInput };

export async function generateResumeAction(input: ResumeGeneratorInput) {
  try {
    const result = await generateResume(input);
    return result;
  } catch (error) {
    console.error('Error generating resume:', error);
    throw new Error('Failed to generate resume.');
  }
}
