'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/personalized-career-plan.ts';
import '@/ai/flows/resume-generator.ts';
import '@/ai/flows/interview-question-generator.ts';
import '@/ai/flows/interview-feedback-generator.ts';
