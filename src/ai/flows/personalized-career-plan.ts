'use server';

/**
 * @fileOverview Generates personalized career recommendations and actionable plans.
 *
 * - generateCareerPlan - A function that generates personalized career plans.
 * - CareerPlanInput - The input type for the generateCareerPlan function.
 * - CareerPlanOutput - The return type for the generateCareerPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerPlanInputSchema = z.object({
  userSkills: z
    .string()
    .describe("A comma separated list of the user's existing skills."),
  userInterests: z
    .string()
    .describe("A comma separated list of the user's interests."),
  careerGoal: z
    .string()
    .describe("The user's desired career path or specific role."),
});
export type CareerPlanInput = z.infer<typeof CareerPlanInputSchema>;

const ActionStepSchema = z.object({
  title: z.string().describe('The title of the action step.'),
  description: z.string().describe('A detailed description of the action step.'),
});

const CareerRecommendationSchema = z.object({
  career: z.string().describe('The name of the career path (e.g., "Data Scientist").'),
  description: z.string().describe('A brief, one-sentence description of what this career entails.'),
  salaryRange: z.string().describe('An estimated annual salary range for this role in India (e.g., "₹8,00,000 - ₹15,00,000").'),
  demand: z.string().describe('The future demand level for this role (e.g., "High", "Medium", "Growing").'),
  skillGap: z.object({
    possessed: z.array(z.string()).describe('A list of skills the user already has that are relevant to this career.'),
    missing: z.array(z.string()).describe('A list of key skills the user needs to acquire for this career.'),
  }),
});

const CareerPlanOutputSchema = z.object({
  recommendedCareers: z
    .array(CareerRecommendationSchema)
    .describe('A list of 3 detailed career recommendations based on the user\'s profile.'),
  actionableRoadmap: z
    .array(ActionStepSchema)
    .describe(
      'A step-by-step plan with 3-5 actionable steps tailored to the user\'s skills and interests, outlining how to pursue the recommended career path.'
    ),
});
export type CareerPlanOutput = z.infer<typeof CareerPlanOutputSchema>;


export async function generateCareerPlan(
  input: CareerPlanInput
): Promise<CareerPlanOutput> {
  return generateCareerPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerPlanPrompt',
  input: {schema: CareerPlanInputSchema},
  output: {schema: CareerPlanOutputSchema},
  prompt: `You are an expert AI career advisor for Indian students. Based on the user’s education, skills, and interests, generate a detailed career path. Always return structured JSON only.

  User Profile:
  - Current Skills: {{{userSkills}}}
  - Interests: {{{userInterests}}}
  - Stated Career Goal: {{{careerGoal}}}

  Instructions:

  1.  **Career Recommendations (3 Suggestions)**:
      *   Analyze the user's profile to suggest 3 specific and relevant career paths.
      *   For each career, you MUST provide:
          *   'career': The job title.
          *   'description': What the role is about.
          *   'salaryRange': An estimated annual salary range in India (in INR, e.g., "₹8,00,000 - ₹15,00,000").
          *   'demand': The future demand level ("High", "Medium", "Growing").
          *   'skillGap': Analyze the user's 'userSkills' against common requirements for the role.
              *   'possessed': List which of the user's skills are relevant.
              *   'missing': List the most important skills the user needs to learn.

  2.  **Actionable Roadmap (3-5 Steps)**:
      *   Create a clear, step-by-step plan to help the user achieve their goals.
      *   Each step must have a 'title' and a 'description'.
      *   The steps should be practical and could include learning new skills, getting certifications, or building projects.

  Your entire output must be in a valid JSON format, strictly adhering to the defined output schema.
  `,
});

const generateCareerPlanFlow = ai.defineFlow(
  {
    name: 'generateCareerPlanFlow',
    inputSchema: CareerPlanInputSchema,
    outputSchema: CareerPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
