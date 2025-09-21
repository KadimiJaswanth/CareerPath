/**
 * @fileOverview Schemas and types for the resume generation AI agent.
 */

import { z } from 'zod';

const EducationSchema = z.object({
  degree: z.string().describe('Degree obtained'),
  university: z.string().describe('Name of the university or institution'),
  year: z.string().describe('Graduation year'),
  gpa: z.string().optional().describe('Grade Point Average'),
});

const ExperienceSchema = z.object({
  role: z.string().describe('Job title or role'),
  company: z.string().describe('Company name'),
  duration: z.string().describe('Employment duration (e.g., May 2024 – Aug 2024)'),
  achievements: z.array(z.string()).describe('List of key achievements or responsibilities'),
});

const ProjectSchema = z.object({
  title: z.string().describe('Project title'),
  description: z.string().describe('A brief description of the project'),
});

export const ResumeGeneratorInputSchema = z.object({
  name: z.string().describe('Full name of the user'),
  email: z.string().describe('Email address'),
  phone: z.string().optional().describe('Phone number'),
  location: z.string().optional().describe('City and country'),
  linkedin: z.string().optional().describe('LinkedIn profile URL'),
  summary: z.string().describe('A brief professional summary'),
  education: z.array(EducationSchema).describe('List of educational qualifications'),
  experience: z.array(ExperienceSchema).optional().describe('List of work experiences'),
  projects: z.array(ProjectSchema).optional().describe('List of personal or professional projects'),
  skills: z.array(z.string()).describe('List of relevant skills'),
  certifications: z.array(z.string()).optional().describe('List of certifications'),
});
export type ResumeGeneratorInput = z.infer<typeof ResumeGeneratorInputSchema>;

export const ResumeGeneratorOutputSchema = z.object({
  resumeText: z.string().describe('The plain text version of the generated resume.'),
  resumeHTML: z.string().describe('The clean HTML version of the generated resume with inline styling.'),
});
export type ResumeGeneratorOutput = z.infer<typeof ResumeGeneratorOutputSchema>;
