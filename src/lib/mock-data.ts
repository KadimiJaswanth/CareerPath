// This file contains mock data to be used as a fallback when AI generation fails.

// This mock data is no longer used in the actions, but is kept for reference or future testing purposes.

export const mockCareerPlanResult = {
  recommendedCareers: [
    {
      career: 'Frontend Developer (Mock)',
      description: 'Creates the user interface and experience of a website or application.',
      salaryRange: '₹7,00,000 - ₹14,00,000',
      demand: 'High',
      skillGap: {
        possessed: ['JavaScript', 'React'],
        missing: ['TypeScript', 'Next.js', 'GraphQL'],
      },
    },
    {
      career: 'UI/UX Designer (Mock)',
      description: 'Designs user-friendly and visually appealing interfaces for digital products.',
      salaryRange: '₹6,00,000 - ₹12,00,000',
      demand: 'Medium',
      skillGap: {
        possessed: ['Graphic Design'],
        missing: ['Figma', 'User Research', 'Prototyping'],
      },
    },
  ],
  actionableRoadmap: [
    {
      title: 'Learn Advanced React Concepts (Mock)',
      description: 'Focus on Hooks, Context API, and state management libraries to build more complex applications.',
    },
    {
      title: 'Master a Design Tool (Mock)',
      description: 'Complete a comprehensive course on Figma, focusing on creating design systems and interactive prototypes.',
    },
    {
      title: 'Build a Portfolio Project (Mock)',
      description: 'Create a full-stack application that showcases your skills. Deploy it and add it to your resume and GitHub.',
    },
  ],
};

export const mockInterviewPrepResult = {
  interviewQuestions: [
    {
      question: 'This is a mock question. Can you walk me through one of the projects on your resume?',
      expectedAnswer: 'This is a model answer. You should start by giving a brief overview of the project, explaining the problem it solved. Then, detail your specific role, the technologies you used, and the challenges you faced. Conclude with the outcome and what you learned.',
    },
    {
      question: 'This is another mock question. How do you handle constructive feedback?',
      expectedAnswer: 'This is a model answer. A good response would be to express that you view feedback as a valuable tool for growth. Provide a specific example of a time you received feedback, how you incorporated it, and the positive result it had on your work.',
    },
  ],
};

export const mockResumeResult = {
    resumeText: `
John Doe (Mock)
john.doe@example.com | (123) 456-7890 | linkedin.com/in/johndoe

## Professional Summary
This is a mock summary. Highly motivated professional...

## Work Experience
**Software Engineer** at Tech Corp
- Developed and maintained web applications.

## Education
**Bachelor of Science** in Computer Science from State University
`,
    resumeHTML: `
<div style="font-family: Arial, sans-serif; color: #333;">
  <div style="text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 1rem; margin-bottom: 1rem;">
    <h1 style="font-size: 2.5rem; font-weight: bold; margin: 0;">John Doe (Mock Data)</h1>
    <p>john.doe@example.com | (123) 456-7890 | linkedin.com/in/johndoe</p>
  </div>
  <div>
    <h2 style="font-size: 1.25rem; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 0.25rem; margin-bottom: 0.5rem; color: #008080;">Professional Summary</h2>
    <p>This is a mock professional summary demonstrating the fallback functionality. Highly motivated and results-oriented professional with experience in software development and project management.</p>
  </div>
  <div style="margin-top: 1rem;">
    <h2 style="font-size: 1.25rem; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 0.25rem; margin-bottom: 0.5rem; color: #008080;">Work Experience</h2>
    <div>
      <h3 style="font-size: 1rem; font-weight: bold;">Software Engineer</h3>
      <p style="font-style: italic; margin-bottom: 0.25rem;">Tech Corp, San Francisco, CA | 2022 - Present</p>
      <ul>
        <li>Developed and maintained web applications using mock data.</li>
      </ul>
    </div>
  </div>
</div>
`
};

export const mockInterviewSimulationResult = {
    question: "This is a mock question. Tell me about yourself.",
    feedback: "This is mock feedback on your previous answer. You did a great job structuring your response!",
    interviewFinished: false,
};
