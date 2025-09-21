
export const interviewRoles = [
  'Software Developer',
  'Data Scientist',
  'UX/UI Designer',
  'Product Manager',
  'DevOps Engineer',
  'Cybersecurity Analyst',
] as const;

export type InterviewRole = (typeof interviewRoles)[number];

export type InterviewQuestion = {
  id: string;
  text: string;
  modelAnswer: string;
};

export const interviewQuestions: Record<InterviewRole, InterviewQuestion[]> = {
  'Software Developer': [
    {
      id: 'sd-q1',
      text: "Can you walk me through a challenging technical project you've worked on? What was your role, what technologies did you use, and how did you overcome any obstacles?",
      modelAnswer: 'A strong answer should clearly define the project\'s goal, specify the technologies (e.g., React, Node.js, AWS), describe a concrete technical challenge (e.g., optimizing a slow API endpoint), detail the steps taken to solve it (e.g., implementing caching, query optimization), and conclude with the positive outcome or learning.',
    },
    {
      id: 'sd-q2',
      text: 'Describe your process for debugging a complex issue in a large codebase. Can you provide an example?',
      modelAnswer: 'The candidate should describe a systematic process: 1) Reproduce the bug consistently. 2) Use logging, breakpoints, or monitoring tools to isolate the issue. 3) Form a hypothesis. 4) Test the hypothesis. 5) Develop a fix and write a regression test. Mentioning a specific example, like a race condition they solved, would make the answer stronger.',
    },
    {
      id: 'sd-q3',
      text: "How do you approach system design? Let's say we need to design a simple URL shortening service like TinyURL. What would be your approach?",
      modelAnswer: 'A good answer involves clarifying requirements (e.g., scale, custom URLs), defining the API (e.g., POST /shorten, GET /{shortURL}), designing the data model (e.g., a SQL or NoSQL table mapping short codes to long URLs), and discussing the hash generation logic (e.g., Base62 encoding of an auto-incrementing ID). Mentioning scalability concerns like read/write traffic and caching is a plus.',
    },
    {
      id: 'sd-q4',
      text: 'Explain the difference between SQL and NoSQL databases. When would you choose one over the other?',
      modelAnswer: 'The key differences are schema (SQL is rigid, NoSQL is flexible), scaling (SQL scales vertically, NoSQL scales horizontally), and data model (SQL is relational, NoSQL can be document, key-value, etc.). SQL is great for applications requiring transactional integrity (e.g., banking). NoSQL is suited for large-scale, unstructured data or applications with evolving schemas (e.g., social media feeds).',
    },
    {
      id: 'sd-q5',
      text: 'Tell me about a time you had a disagreement with a team member about a technical decision. How did you handle it, and what was the outcome?',
      modelAnswer: 'This assesses collaboration skills. A good answer follows the STAR method (Situation, Task, Action, Result). The action should focus on data-driven discussion, not personal opinion. For example, "We disagreed on a state management library. I proposed we build small proofs-of-concept for both options and compare performance and developer experience." The outcome should be positive, emphasizing the team decision.',
    },
     {
      id: 'sd-q6',
      text: 'What are your thoughts on writing tests? What is your experience with different types of testing?',
      modelAnswer: 'A strong candidate will express a positive view on testing as a way to ensure code quality and maintainability. They should be able to differentiate between unit tests (testing individual functions/components), integration tests (testing how modules work together), and end-to-end tests (testing the full application flow). Mentioning specific libraries like Jest, PyTest, or Cypress demonstrates practical experience.',
    },
  ],
  'Data Scientist': [
    {
      id: 'ds-q1',
      text: 'Describe a data science project you are proud of. What was the business problem, what data did you use, and what was the impact of your solution?',
      modelAnswer: 'The answer should be a compelling story. Start with the business problem (e.g., "reduce customer churn by 10%"). Describe the data sources, the data cleaning/preprocessing steps, the model chosen (e.g., Logistic Regression, Gradient Boosting), and, most importantly, the measurable impact on the business (e.g., "The model identified at-risk customers with 85% accuracy, contributing to a 7% reduction in churn").',
    },
    {
      id: 'ds-q2',
      text: 'Explain the concept of overfitting in a machine learning model. How can you detect it, and what are some techniques to prevent it?',
      modelAnswer: 'Overfitting is when a model learns the training data too well, including its noise, and performs poorly on new, unseen data. It can be detected when the model has high accuracy on the training set but low accuracy on the validation/test set. Prevention techniques include: 1) Cross-validation. 2) Regularization (L1/L2). 3) Pruning (for decision trees). 4) Dropout (for neural networks). 5) Getting more data.',
    },
    {
      id: 'ds-q3',
      text: 'You are given a dataset of customer transactions. How would you approach building a model to predict customer churn?',
      modelAnswer: 'A good approach includes: 1) Define churn clearly (e.g., no purchase in the last 90 days). 2) Feature Engineering: Create features like Recency, Frequency, Monetary (RFM) value, average purchase value, etc. 3) Model Selection: Start with a simple baseline model (like Logistic Regression) and then try more complex ones (like XGBoost or a neural network). 4) Evaluation: Choose the right metric (e.g., AUC-ROC, F1-score, Precision/Recall) based on the business cost of false positives vs. false negatives.',
    },
    {
      id: 'ds-q4',
      text: 'What is the difference between classification and regression? Provide an example of a business problem for each.',
      modelAnswer: 'Classification predicts a discrete category or label (e.g., "spam" or "not spam", "churn" or "not churn"). Regression predicts a continuous numerical value (e.g., predicting the price of a house, forecasting sales for the next quarter). The key difference is the nature of the output variable.',
    },
    {
      id: 'ds-q5',
      text: 'How do you communicate complex data findings to non-technical stakeholders?',
      modelAnswer: 'The focus should be on clarity and impact. Avoid technical jargon. Use clear data visualizations (bar charts, line graphs) to tell a story. Frame the results in terms of the business problem and the recommended actions. For example, instead of "The p-value was less than 0.05," say "The data shows with high confidence that our new marketing campaign led to a 15% increase in sign-ups."',
    },
  ],
  'UX/UI Designer': [
    {
      id: 'ux-q1',
      text: 'Walk me through your design process from initial concept to final handoff to developers. What artifacts do you typically produce?',
      modelAnswer: 'A standard process includes: 1) Empathize/Research (user interviews, surveys). 2) Define (personas, user journey maps). 3) Ideate (brainstorming, sketching). 4) Prototype (wireframes, interactive prototypes in Figma/Sketch). 5) Test (usability testing). 6) Handoff (design specs, style guides). The key is to show a structured, user-centered approach.',
    },
    {
      id: 'ux-q2',
      text: 'Tell me about a time you had to balance user needs with business requirements or technical constraints. How did you advocate for the user?',
      modelAnswer: 'A strong answer demonstrates pragmatism and advocacy. The candidate should describe a situation (e.g., "Business wanted to add a feature that cluttered the UI, but users needed a simple flow"). The action taken should involve using data—like user testing results or analytics—to propose a compromise that meets business goals without sacrificing the core user experience.',
    },
    {
      id: 'ux-q3',
      text: 'What is a design system, and why is it important? Have you ever contributed to or built one?',
      modelAnswer: 'A design system is a single source of truth for design, containing reusable components, patterns, and guidelines. It\'s important because it ensures consistency, speeds up development, and allows designers to focus on complex problems instead of reinventing basic components. Mentioning experience creating components, writing documentation, or evangelizing a design system is a huge plus.',
    },
    {
      id: 'ux-q4',
      text: 'How do you handle negative feedback on your designs from stakeholders or team members?',
      modelAnswer: 'A good designer separates their ego from their work. The answer should show they are open to feedback and see it as a way to improve the product. Key points include: listening actively, asking clarifying questions to understand the root of the concern, not getting defensive, and being willing to iterate on the design based on valid feedback.',
    },
    {
      id: 'ux-q5',
      text: 'Show me a project from your portfolio that you are most proud of and explain why.',
      modelAnswer: 'This is a chance to show passion and impact. The candidate should not just describe the project but explain *why* they are proud of it. Was it a complex problem they solved elegantly? Did it have a significant positive impact on users? Did they learn a new skill? The answer should connect the project back to user-centered design principles and business outcomes.',
    },
  ],
  'Product Manager': [
    {
      id: 'pm-q1',
      text: 'How would you define the role of a Product Manager? What do you think are the most important qualities for success?',
      modelAnswer: 'A Product Manager is responsible for the product\'s success, sitting at the intersection of business, technology, and user experience. Key qualities include: 1) Customer Obsession (deeply understanding user needs). 2) Business Acumen (aligning the product with company goals). 3) Communication Skills (articulating the vision to all stakeholders). 4) Prioritization (making tough decisions about what to build).',
    },
    {
      id: 'pm-q2',
      text: 'Imagine you are the PM for a product with declining user engagement. What steps would you take to diagnose the problem and develop a plan to address it?',
      modelAnswer: 'A structured approach is key. 1) Diagnose: Dig into quantitative data (analytics, funnel analysis) and qualitative data (user surveys, interviews, session replays) to form a hypothesis. Is it a specific feature? A recent change? A new competitor? 2) Ideate: Brainstorm solutions with the team. 3) Prioritize: Use a framework (like RICE or ICE) to decide which solutions to test first. 4) Execute & Measure: Launch experiments (e.g., A/B tests) and measure the impact on the key engagement metric.',
    },
    {
      id: 'pm-q3',
      text: 'How do you prioritize features for a product roadmap? Describe a prioritization framework you have used.',
      modelAnswer: 'The candidate should name and explain a framework. A common one is the RICE framework: Reach (how many users will this impact?), Impact (how much will this impact them?), Confidence (how confident are we in our estimates?), and Effort (how much work is it?). The RICE score helps to objectively compare different initiatives. Other valid frameworks include ICE, Kano Model, or MoSCoW.',
    },
    {
      id: 'pm-q4',
      text: "Tell me about a time a product launch didn't go as planned. What happened, what did you learn, and what would you do differently next time?",
      modelAnswer: 'This question tests accountability and learning. A good answer admits a failure, explains the root cause (e.g., "We misjudged the market need" or "A critical bug slipped through"), describes what was learned (e.g., "The importance of more rigorous user testing before a full launch"), and states a clear action for the future (e.g., "Now, we always run a beta program for major features").',
    },
    {
      id: 'pm-q5',
      text: 'Our competitor just launched a new feature that our customers are asking for. How would you decide whether to build a similar feature?',
      modelAnswer: 'A good PM does not just copy competitors. The answer should involve a thoughtful process: 1) Understand the "why": Why are customers asking for it? What core problem does it solve for them? 2) Align with Strategy: Does this feature align with our product vision and strategy? 3) Assess the Cost: What is the opportunity cost of building this feature instead of something else on our roadmap? 4) Differentiate: Can we solve the user\'s problem in a better, more unique way that aligns with our strengths?',
    },
  ],
  'DevOps Engineer': [
    {
      id: 'devops-q1',
      text: 'What is Infrastructure as Code (IaC) and what tools have you used to implement it?',
      modelAnswer: 'IaC is the practice of managing and provisioning infrastructure through code instead of manual processes, ensuring consistency and scalability. I have experience with Terraform for defining cloud resources declaratively and Ansible for configuration management. For example, I\'ve used Terraform to spin up entire AWS environments, including VPCs, subnets, and EC2 instances, from a single configuration file.',
    },
    {
      id: 'devops-q2',
      text: 'Explain the concept of a CI/CD pipeline. What stages are typically included?',
      modelAnswer: 'A CI/CD pipeline automates the process of software delivery. \'CI\' stands for Continuous Integration, where code changes are frequently merged into a central repository. \'CD\' stands for Continuous Delivery/Deployment, which automates the release to production. A typical pipeline includes: 1) Build (compile code), 2) Test (run unit/integration tests), 3) Release (package the application), and 4) Deploy (push to environments like staging or production).',
    },
    {
      id: 'devops-q3',
      text: 'What is the difference between a container (like Docker) and a virtual machine?',
      modelAnswer: 'A Virtual Machine (VM) virtualizes an entire hardware stack, including the OS, which makes it heavy and slow to boot. A container, on the other hand, virtualizes the operating system, allowing it to run as an isolated process. Containers are lightweight, start quickly, and share the host OS kernel, making them more efficient for running multiple applications on a single server.',
    },
  ],
  'Cybersecurity Analyst': [
    {
      id: 'cyber-q1',
      text: 'What is the difference between a threat, a vulnerability, and a risk?',
      modelAnswer: 'A vulnerability is a weakness in a system that can be exploited (e.g., an unpatched server). A threat is a person or event that could potentially exploit that vulnerability (e.g., a hacker). A risk is the potential for loss or damage when a threat exploits a vulnerability. Risk = Threat x Vulnerability.',
    },
    {
      id: 'cyber-q2',
      text: 'You detect a suspicious login from an unfamiliar location to a critical server. What are your immediate steps?',
      modelAnswer: 'The immediate priority is to contain the potential breach. My steps would be: 1) Isolate the affected server from the network to prevent lateral movement. 2) Invalidate the suspicious user session and force a password reset. 3) Begin investigation by analyzing logs (login times, commands run) to determine the extent of the compromise. 4) Preserve evidence for forensic analysis. 5) Escalate to the incident response team leader.',
    },
    {
      id: 'cyber-q3',
      text: 'What is a phishing attack, and what are some common indicators to look for?',
      modelAnswer: 'Phishing is a social engineering attack where an attacker sends a fraudulent message designed to trick a person into revealing sensitive information. Common indicators include: a sense of urgency or threats, emails from public domains (like @gmail.com instead of a corporate domain), spelling and grammar mistakes, and hyperlinks that don\'t match the legitimate URL when you hover over them.',
    },
  ],
};
