export const careers = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    description: 'Design, develop, and maintain software systems and applications to meet user needs.',
    averageSalary: '₹12,00,000',
    demand: 'High',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'API Design'],
    image: '1',
    learningResources: [
      { title: 'freeCodeCamp - Full-Stack Web Development', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' },
      { title: 'The Odin Project - Full Stack JavaScript', url: 'https://www.theodinproject.com/paths/full-stack-javascript' },
      { title: 'Coursera - Meta Front-End Developer Professional Certificate', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=Software%20Developer' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/software-developer-jobs' },
        { name: 'Indeed', url: 'https://in.indeed.com/q-software-developer-jobs.html' }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Use analytical, statistical, and programming skills to collect, analyze, and interpret large data sets.',
    averageSalary: '₹15,00,000',
    demand: 'High',
    requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
    image: '3',
    learningResources: [
      { title: 'Coursera - IBM Data Science Professional Certificate', url: 'https://www.coursera.org/professional-certificates/ibm-data-science' },
      { title: 'Kaggle Courses', url: 'https://www.kaggle.com/learn' },
      { title: 'Dataquest - Data Scientist Path', url: 'https://www.dataquest.io/path/data-scientist/' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=Data%20Scientist' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/data-scientist-jobs' },
        { name: 'Indeed', url: 'https://in.indeed.com/q-data-scientist-jobs.html' }
    ]
  },
  {
    id: 'ux-designer',
    title: 'UX/UI Designer',
    description: 'Create user-centered designs by understanding business requirements and user feedback.',
    averageSalary: '₹9,00,000',
    demand: 'Medium',
    requiredSkills: ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Wireframing', 'Visual Design'],
    image: '2',
    learningResources: [
      { title: 'Coursera - Google UX Design Professional Certificate', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
      { title: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/' },
      { title: 'Udemy - User Experience Design Essentials', url: 'https://www.udemy.com/course/ux-design-essentials/' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=UX%20Designer' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/ux-designer-jobs' },
        { name: 'Indeed', url: 'https://in.indeed.com/q-ux-designer-jobs.html' }
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Oversee the development of a product from concept to launch, bridging business and technical teams.',
    averageSalary: '₹18,00,000',
    demand: 'High',
    requiredSkills: ['Product Strategy', 'Roadmapping', 'Agile Methodologies', 'Market Research', 'User Feedback Analysis'],
    image: '4',
    learningResources: [
        { title: 'Coursera - Google Project Management Professional Certificate', url: 'https://www.coursera.org/professional-certificates/google-project-management' },
        { title: 'Product School', url: 'https://productschool.com/' },
        { title: 'Udemy - Become a Product Manager', url: 'https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-a-job/' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=Product%20Manager' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/product-manager-jobs' },
        { name: 'Indeed', url: 'https://in.indeed.com/q-product-manager-jobs.html' }
    ]
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Work with developers and IT staff to oversee code releases, combining understanding of both engineering and coding.',
    averageSalary: '₹14,00,000',
    demand: 'High',
    requiredSkills: ['CI/CD', 'Docker', 'Kubernetes', 'AWS/Azure/GCP', 'Scripting (Python/Bash)'],
    image: '11',
    learningResources: [
        { title: 'Coursera - AWS Cloud Practitioner Essentials', url: 'https://www.coursera.org/learn/aws-cloud-practitioner-essentials' },
        { title: 'KodeKloud - DevOps Training', url: 'https://kodekloud.com/' },
        { title: 'Udemy - Docker and Kubernetes: The Complete Guide', url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=DevOps%20Engineer' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/devops-engineer-jobs' },
        { name: 'Indeed', url: 'https://in.indeed.com/q-devops-engineer-jobs.html' }
    ]
  },
   {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    description: 'Plan and execute marketing campaigns to promote brands, products, and services.',
    averageSalary: '₹10,00,000',
    demand: 'Medium',
    requiredSkills: ['SEO/SEM', 'Content Marketing', 'Social Media Strategy', 'Data Analysis', 'Email Marketing'],
    image: '12',
    learningResources: [
        { title: 'Coursera - Google Digital Marketing & E-commerce', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
        { title: 'HubSpot Academy', url: 'https://academy.hubspot.com/' },
        { title: 'Udemy - The Complete Digital Marketing Course', url: 'https://www.udemy.com/course/learn-digital-marketing-course/' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=Marketing%20Manager' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/marketing-manager-jobs' },
        { name: 'Indeed', url: 'https://in.indeed.com/q-marketing-manager-jobs.html' }
    ]
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect computer networks and systems from security breaches and cyber threats.',
    averageSalary: '₹11,00,000',
    demand: 'High',
    requiredSkills: ['Network Security', 'Penetration Testing', 'SIEM Tools', 'Cryptography', 'Incident Response'],
    image: '7',
    learningResources: [
        { title: 'Coursera - Google Cybersecurity Professional Certificate', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
        { title: 'Cybrary', url: 'https://www.cybrary.it/' },
        { title: 'TryHackMe', url: 'https://tryhackme.com/' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=Cybersecurity%20Analyst' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/cybersecurity-analyst-jobs' },
        { name: 'Indeed', url: 'https://in.indeed.com/q-cybersecurity-analyst-jobs.html' }
    ]
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    description: 'Design and develop machine learning and deep learning systems to solve complex problems.',
    averageSalary: '₹16,00,000',
    demand: 'High',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Natural Language Processing', 'Computer Vision'],
    image: '8',
    learningResources: [
        { title: 'Coursera - Machine Learning by Andrew Ng', url: 'https://www.coursera.org/learn/machine-learning' },
        { title: 'fast.ai', url: 'https://www.fast.ai/' },
        { title: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=AI%2FML%20Engineer' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/ai-ml-engineer-jobs' },
        { name: 'Indeed', url: 'https://in.indeed.com/q-ai-ml-engineer-jobs.html' }
    ]
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    description: 'Manage online marketing strategies including social media, SEO, and content creation.',
    averageSalary: '₹7,00,000',
    demand: 'Medium',
    requiredSkills: ['Google Analytics', 'SEO/SEM', 'Content Creation', 'Social Media Advertising', 'PPC Campaigns'],
    image: '9',
    learningResources: [
        { title: 'HubSpot Academy', url: 'https://academy.hubspot.com/' },
        { title: 'Google Skillshop', url: 'https://skillshop.withgoogle.com/' },
        { title: 'SEMRush Academy', url: 'https://www.semrush.com/academy/' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=Digital%20Marketing%20Specialist' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/digital-marketing-specialist-jobs' },
        { name: 'Indeed', url: 'https://in.indeed.com/q-digital-marketing-specialist-jobs.html' }
    ]
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    description: 'Create visual concepts to communicate ideas that inspire, inform, or captivate consumers.',
    averageSalary: '₹6,00,000',
    demand: 'Medium',
    requiredSkills: ['Adobe Creative Suite', 'Typography', 'Color Theory', 'Branding', 'Illustration'],
    image: '10',
    learningResources: [
        { title: 'Adobe Learn', url: 'https://helpx.adobe.com/creative-cloud/learn-discover.html' },
        { title: 'Canva Design School', url: 'https://www.canva.com/designschool/' },
        { title: '99designs Learn', url: 'https://99designs.com/blog/category/learn/' }
    ],
    jobPlatforms: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/search/?keywords=Graphic%20Designer' },
        { name: 'Naukri.com', url: 'https://www.naukri.com/graphic-designer-jobs' },
        { name: 'Behance', url: 'https://www.behance.net/joblist' }
    ]
  }
];

export type allSkills = {
  id: string;
  name: string;
  category: string;
};

export const allSkills: allSkills[] = [
  { id: 'javascript', name: 'JavaScript', category: 'Programming Languages' },
  { id: 'python', name: 'Python', category: 'Programming Languages' },
  { id: 'java', name: 'Java', category: 'Programming Languages' },
  { id: 'csharp', name: 'C#', category: 'Programming Languages' },
  { id: 'cpp', name: 'C++', category: 'Programming Languages' },
  { id: 'php', name: 'PHP', category: 'Programming Languages' },
  { id: 'swift', name: 'Swift', category: 'Programming Languages' },
  { id: 'kotlin', name: 'Kotlin', category: 'Programming Languages' },
  { id: 'go', name: 'Go', category: 'Programming Languages' },
  { id: 'rust', name: 'Rust', category: 'Programming Languages' },
  { id: 'typescript', name: 'TypeScript', category: 'Programming Languages' },
  { id: 'sql', name: 'SQL', category: 'Programming Languages' },
  { id: 'react', name: 'React', category: 'Frontend Development' },
  { id: 'angular', name: 'Angular', category: 'Frontend Development' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend Development' },
  { id: 'html-css', name: 'HTML & CSS', category: 'Frontend Development' },
  { id: 'sass', name: 'Sass/SCSS', category: 'Frontend Development' },
  { id: 'tailwind-css', name: 'Tailwind CSS', category: 'Frontend Development' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend Development' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend Development' },
  { id: 'django', name: 'Django', category: 'Backend Development' },
  { id: 'ruby-on-rails', name: 'Ruby on Rails', category: 'Backend Development' },
  { id: 'api-design', name: 'API Design', category: 'Backend Development' },
  { id: 'spring', name: 'Spring Boot', category: 'Backend Development' },
  { id: 'express', name: 'Express.js', category: 'Backend Development' },
  { id: 'graphql', name: 'GraphQL', category: 'Backend Development' },
  { id: 'docker', name: 'Docker', category: 'DevOps' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps' },
  { id: 'ci-cd', name: 'CI/CD', category: 'DevOps' },
  { id: 'jenkins', name: 'Jenkins', category: 'DevOps' },
  { id: 'ansible', name: 'Ansible', category: 'DevOps' },
  { id: 'terraform', name: 'Terraform', category: 'DevOps' },
  { id: 'aws', name: 'AWS', category: 'Cloud Computing' },
  { id: 'azure', name: 'Microsoft Azure', category: 'Cloud Computing' },
  { id: 'gcp', name: 'Google Cloud Platform', category: 'Cloud Computing' },
  { id: 'machine-learning', name: 'Machine Learning', category: 'Data Science' },
  { id: 'data-analysis', name: 'Data Analysis', category: 'Data Science' },
  { id: 'statistics', name: 'Statistics', category: 'Data Science' },
  { id: 'data-visualization', name: 'Data Visualization', category: 'Data Science' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'Data Science' },
  { id: 'pytorch', name: 'PyTorch', category: 'Data Science' },
  { id: 'pandas', name: 'Pandas', category: 'Data Science' },
  { id: 'numpy', name: 'NumPy', category: 'Data Science' },
  { id: 'figma', name: 'Figma', category: 'Design' },
  { id: 'sketch', name: 'Sketch', category: 'Design' },
  { id: 'adobe-xd', name: 'Adobe XD', category: 'Design' },
  { id: 'user-research', name: 'User Research', category: 'Design' },
  { id: 'prototyping', name: 'Prototyping', category: 'Design' },
  { id: 'wireframing', name: 'Wireframing', category: 'Design' },
  { id: 'agile', name: 'Agile Methodologies', category: 'Project Management' },
  { id: 'scrum', name: 'Scrum', category: 'Project Management' },
  { id: 'jira', name: 'Jira', category: 'Project Management' },
  { id: 'product-strategy', name: 'Product Strategy', category: 'Product Management' },
  { id: 'market-research', name: 'Market Research', category: 'Product Management' },
  { id: 'roadmapping', name: 'Roadmapping', category: 'Product Management' },
  { id: 'network-security', name: 'Network Security', category: 'Cybersecurity' },
  { id: 'penetration-testing', name: 'Penetration Testing', category: 'Cybersecurity' },
  { id: 'incident-response', name: 'Incident Response', category: 'Cybersecurity' },
  { id: 'cryptography', name: 'Cryptography', category: 'Cybersecurity' },
];
