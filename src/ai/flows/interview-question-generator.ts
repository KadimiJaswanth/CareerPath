'use server';

/**
 * @fileOverview An AI agent (InterviewGPT) for generating interview questions.
 *
 * - generateInterviewQuestions - A function that generates interview questions from a user profile.
 * - InterviewQuestionGeneratorInput - The input type for the generateInterviewQuestions function.
 * - InterviewQuestionGeneratorOutput - The return type for the generateInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectSchema = z.object({
  title: z.string().describe('Project title'),
  description: z.string().describe('A brief description of the project'),
});

const InterviewQuestionGeneratorInputSchema = z.object({
  name: z.string().describe('Full name of the user'),
  role: z.string().describe('The job role the user is applying for'),
  skills: z.array(z.string()).describe('List of relevant skills'),
  experience: z.string().describe('A summary of the user\'s work experience'),
  projects: z
    .array(ProjectSchema)
    .optional()
    .describe('List of personal or professional projects'),
});
export type InterviewQuestionGeneratorInput = z.infer<
  typeof InterviewQuestionGeneratorInputSchema
>;

const QuestionAndAnswerSchema = z.object({
  question: z.string().describe('The generated interview question.'),
  expectedAnswer: z
    .string()
    .describe('A model answer to the generated question.'),
});

const InterviewQuestionGeneratorOutputSchema = z.object({
  interviewQuestions: z
    .array(QuestionAndAnswerSchema)
    .describe(
      'A list of 4-5 realistic interview questions with model answers.'
    ),
});
export type InterviewQuestionGeneratorOutput = z.infer<
  typeof InterviewQuestionGeneratorOutputSchema
>;

export async function generateInterviewQuestions(
  input: InterviewQuestionGeneratorInput
): Promise<InterviewQuestionGeneratorOutput> {
  return interviewQuestionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interviewQuestionGeneratorPrompt',
  input: {schema: InterviewQuestionGeneratorInputSchema},
  output: {schema: InterviewQuestionGeneratorOutputSchema},
  prompt: `You are InterviewGPT, an expert technical and HR interviewer.
Your task is to generate realistic interview questions and model answers based on the candidate’s profile.
Keep the tone professional but supportive, as if preparing the candidate for a real job interview.

## Candidate Profile
- **Name**: {{{name}}}
- **Target Role**: {{{role}}}
- **Experience**: {{{experience}}}
- **Skills**: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{#if projects}}
- **Projects**:
{{#each projects}}
  - **{{title}}**: {{description}}
{{/each}}
{{/if}}

## Instructions
1.  Generate **4-5 questions** that are a mix of technical, behavioral, and project-specific questions.
2.  Tailor the questions to the candidate's specific profile (role, skills, experience).
3.  For each question, provide a concise but comprehensive "expectedAnswer". The answer should be a model of what a good response would sound like.
4.  Ensure the output is strictly in the requested JSON format.
`,
});

const interviewQuestionGeneratorFlow = ai.defineFlow(
  {
    name: 'interviewQuestionGeneratorFlow',
    inputSchema: InterviewQuestionGeneratorInputSchema,
    outputSchema: InterviewQuestionGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
