'use server';

/**
 * @fileOverview A resume generation AI agent (ResumeGPT).
 *
 * - generateResume - A function that handles generating a resume from user details.
 */

import { ai } from '@/ai/genkit';
import {
  ResumeGeneratorInputSchema,
  ResumeGeneratorOutputSchema,
  type ResumeGeneratorInput,
  type ResumeGeneratorOutput,
} from './resume-generator-schemas';

export async function generateResume(
  input: ResumeGeneratorInput
): Promise<ResumeGeneratorOutput> {
  return resumeGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeGeneratorPrompt',
  input: { schema: ResumeGeneratorInputSchema },
  output: { schema: ResumeGeneratorOutputSchema },
  prompt: `You are ResumeGPT, an expert in writing professional, ATS-friendly resumes.
Your task is to generate a complete, well-formatted resume based on the user’s details.

## Requirements
- Output MUST include two versions:
  1. **resumeText** → plain text version, properly formatted with sections (Summary, Education, Experience, Projects, Skills, Certifications).
  2. **resumeHTML** → clean HTML version with inline styling (suitable for embedding in a preview window on a website).
- The HTML must be minimal (no external CSS/JS), use standard fonts (Arial/Calibri), proper headings (\`h2\` for sections, \`p\`/\`ul\` for content).
- Avoid tables; use simple block sections so the resume works well with Applicant Tracking Systems (ATS).
- Do not add extra explanations — output strictly in JSON.

## User Details
- Name: {{{name}}}
- Email: {{{email}}}
{{#if phone}}- Phone: {{{phone}}}{{/if}}
{{#if location}}- Location: {{{location}}}{{/if}}
{{#if linkedin}}- LinkedIn: {{{linkedin}}}{{/if}}
- Summary: {{{summary}}}

### Education
{{#each education}}
- Degree: {{{degree}}}
- University: {{{university}}}
- Year: {{{year}}}
{{#if gpa}}- GPA: {{{gpa}}}{{/if}}
{{/each}}

{{#if experience}}
### Experience
{{#each experience}}
- Role: {{{role}}}
- Company: {{{company}}}
- Duration: {{{duration}}}
- Achievements:
{{#each achievements}}
  - {{{this}}}
{{/each}}
{{/each}}
{{/if}}

{{#if projects}}
### Projects
{{#each projects}}
- Title: {{{title}}}
- Description: {{{description}}}
{{/each}}
{{/if}}

### Skills
- {{{skills}}}

{{#if certifications}}
### Certifications
{{#each certifications}}
- {{{this}}}
{{/each}}
{{/if}}

Now, generate the 'resumeText' and 'resumeHTML' based on these details.
`,
});

const resumeGeneratorFlow = ai.defineFlow(
  {
    name: 'resumeGeneratorFlow',
    inputSchema: ResumeGeneratorInputSchema,
    outputSchema: ResumeGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
