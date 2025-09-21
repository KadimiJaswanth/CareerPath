'use server';

/**
 * @fileOverview An AI agent that provides feedback on interview answers by comparing them to a model answer.
 *
 * - generateFeedbackForAnswers - Generates feedback for a list of answers.
 * - InterviewFeedbackInput - The input type for the function.
 * - InterviewFeedbackOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFeedbackSchema = z.object({
  question: z.string().describe('The original interview question.'),
  userAnswer: z.string().describe("The user's answer to the question."),
  feedback: z
    .string()
    .describe(
      "Constructive feedback on the user's answer based on the model answer provided. Be specific, encouraging, and provide actionable advice. (2-4 sentences)."
    ),
});

const InterviewFeedbackInputSchema = z.object({
  role: z.string().describe('The job role the user is interviewing for.'),
  questionsAndAnswers: z.array(
    z.object({
      question: z.string(),
      userAnswer: z.string(),
      modelAnswer: z.string(),
    })
  ),
});
export type InterviewFeedbackInput = z.infer<
  typeof InterviewFeedbackInputSchema
>;

const InterviewFeedbackOutputSchema = z.object({
  overallFeedback: z.string().describe("A brief, overall summary of the user's performance (2-3 sentences)."),
  feedbackByQuestion: z.array(AnswerFeedbackSchema),
});
export type InterviewFeedbackOutput = z.infer<
  typeof InterviewFeedbackOutputSchema
>;

export async function generateFeedbackForAnswers(
  input: InterviewFeedbackInput
): Promise<InterviewFeedbackOutput> {
  return interviewFeedbackGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interviewFeedbackGeneratorPrompt',
  input: {schema: InterviewFeedbackInputSchema},
  output: {schema: InterviewFeedbackOutputSchema},
  prompt: `You are an expert interview coach. Your task is to provide constructive feedback on a candidate's answers for a mock interview for the role of {{{role}}}.

For each question, you are given the question, the candidate's answer, and a model answer.
Compare the candidate's answer to the model answer and provide specific, actionable feedback.

## Instructions
1.  **Analyze each answer individually**: Compare the user's answer against the provided model answer.
2.  **Provide Specific Feedback**: For each question, identify strengths and weaknesses. Did they hit the key points from the model answer? Was their structure logical?
3.  **Generate Overall Feedback**: After reviewing all answers, provide a concise summary of their overall performance.
4.  **Maintain a Supportive Tone**: The feedback should be encouraging and aimed at helping the user improve.
5.  **Format**: Ensure the output is in the requested JSON format.

## Interview Details
- **Role**: {{{role}}}

{{#each questionsAndAnswers}}
---
### Question
- **Question**: {{{question}}}
- **Model Answer**: {{{modelAnswer}}}
- **Candidate's Answer**: {{{userAnswer}}}
---
{{/each}}
`,
});

const interviewFeedbackGeneratorFlow = ai.defineFlow(
  {
    name: 'interviewFeedbackGeneratorFlow',
    inputSchema: InterviewFeedbackInputSchema,
    outputSchema: InterviewFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
