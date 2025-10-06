// backend/seed.js
require('dotenv').config();
const connectDB = require('./config/db');
const Job = require('./models/Job');

const MONGO_URI = process.env.MONGO_URI;

const sampleJobs=[
  {
    "title": "Full Stack Developer",
    "company": "Amazon",
    "location": "Chennai",
    "jobType": "FullTime",
    "minSalary": 600000,
    "maxSalary": 1200000,
    "experienceRange": "1-3 yr",
    "companyImage": "[Image URL for Amazon Logo - e.g., https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_logo.svg]",
    "description": {
      "summary": "Develop and maintain robust, scalable full-stack applications within a fast-paced agile environment. You will be responsible for both front-end user interface development and back-end service integration.",
      "responsibilities": [
        "Design, develop, and deploy full-stack applications with high availability and performance.",
        "Work with modern JavaScript frameworks (like React or Angular) for the frontend.",
        "Implement and manage scalable backend services and APIs (e.g., Node.js, Java, Python).",
        "Collaborate with product managers and designers to translate requirements into technical specifications.",
        "Ensure code quality through unit and integration testing."
      ]
    },
    "status": "published"
  },
  {
    "title": "Node Js Developer",
    "company": "Tesla",
    "location": "Bangalore",
    "jobType": "FullTime",
    "minSalary": 500000,
    "maxSalary": 1000000,
    "experienceRange": "2-4 yr",
    "companyImage": "[Image URL for Tesla Logo]",
    "description": {
      "summary": "Join the team to architect and build high-performance, scalable backend services using Node.js. This role focuses on developing core infrastructure for critical systems.",
      "responsibilities": [
        "Develop robust and high-speed RESTful APIs using Node.js.",
        "Implement and manage efficient database schemas and queries (e.g., MongoDB, PostgreSQL).",
        "Collaborate on system architecture design and performance optimization.",
        "Integrate with external services and third-party APIs.",
        "Participate in code reviews and maintain documentation for backend services."
      ]
    },
    "status": "published"
  },
  {
    "title": "UX/UI Designer",
    "company": "Mitsogo",
    "location": "Kochi",
    "jobType": "Contract",
    "minSalary": 400000,
    "maxSalary": 700000,
    "experienceRange": "1-2 yr",
    "companyImage": "[Image URL for Mitsogo Logo]",
    "description": {
      "summary": "A creative role focused on designing highly engaging and intuitive user interfaces and experiences for our suite of web and mobile applications.",
      "responsibilities": [
        "Conduct user research and translate insights into design solutions.",
        "Create wireframes, prototypes, and high-fidelity mockups for web and mobile platforms.",
        "Define and maintain design systems and style guides.",
        "Collaborate closely with development teams to ensure design implementation accuracy.",
        "Iterate on designs based on user feedback and analytical data."
      ]
    },
    "status": "published"
  },
  {
    "title": "Frontend Developer",
    "company": "Google",
    "location": "Remote",
    "jobType": "FullTime",
    "minSalary": 700000,
    "maxSalary": 1300000,
    "experienceRange": "3-5 yr",
    "companyImage": "[Image URL for Google Logo]",
    "description": {
      "summary": "Be part of a world-class team creating the next generation of interactive frontend applications. The role requires deep expertise in modern frontend frameworks, particularly React.",
      "responsibilities": [
        "Develop scalable, high-performance web applications using React and its ecosystem.",
        "Write clean, well-documented, and efficient JavaScript/TypeScript code.",
        "Optimize applications for maximum speed and scalability.",
        "Work with designers to implement pixel-perfect, responsive user interfaces.",
        "Implement and maintain comprehensive unit and end-to-end tests."
      ]
    },
    "status": "published"
  },
  {
    "title": "Backend Developer",
    "company": "Facebook",
    "location": "Hyderabad",
    "jobType": "FullTime",
    "minSalary": 600000,
    "maxSalary": 1100000,
    "experienceRange": "2-4 yr",
    "companyImage": "[Image URL for Facebook Logo / Meta Logo]",
    "description": {
      "summary": "Focus on the core server-side logic and services that power our global platforms. You will be instrumental in maintaining performance and reliability.",
      "responsibilities": [
        "Design, build, and maintain efficient, reusable, and reliable backend code.",
        "Implement data storage solutions and database integrations (SQL/NoSQL).",
        "Develop and consume high-volume, low-latency APIs.",
        "Troubleshoot, debug, and upgrade existing systems.",
        "Ensure security and data protection best practices are followed."
      ]
    },
    "status": "published"
  },
  {
    "title": "Data Analyst",
    "company": "Microsoft",
    "location": "Pune",
    "jobType": "PartTime",
    "minSalary": 300000,
    "maxSalary": 600000,
    "experienceRange": "1-2 yr",
    "companyImage": "[Image URL for Microsoft Logo]",
    "description": {
      "summary": "Join our analytics team to transform complex data into clear, actionable insights that drive business decisions and strategy across various product lines.",
      "responsibilities": [
        "Collect, clean, and interpret large datasets to identify trends and patterns.",
        "Develop and maintain dashboards, reports, and data visualizations.",
        "Present findings and recommendations to stakeholders in a clear and concise manner.",
        "Utilize statistical methods to analyze product performance and user behavior.",
        "Collaborate with engineering teams to improve data collection and quality."
      ]
    },
    "status": "published"
  },
  {
    "title": "Machine Learning Engineer",
    "company": "Amazon",
    "location": "Bangalore",
    "jobType": "FullTime",
    "minSalary": 900000,
    "maxSalary": 1500000,
    "experienceRange": "3-5 yr",
    "companyImage": "[Image URL for Amazon Logo - e.g., https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_logo.svg]",
    "description": {
      "summary": "Design, build, and deploy cutting-edge machine learning models and pipelines to solve complex business problems across Amazon's vast ecosystem.",
      "responsibilities": [
        "Research, design, and implement scalable ML models for production.",
        "Develop and maintain robust data pipelines for training and inference.",
        "Evaluate and optimize model performance against business metrics.",
        "Work with large-scale datasets and distributed computing frameworks.",
        "Stay up-to-date with the latest advancements in AI and machine learning."
      ]
    },
    "status": "published"
  },
  {
    "title": "Project Manager",
    "company": "Tesla",
    "location": "Remote",
    "jobType": "Contract",
    "minSalary": 800000,
    "maxSalary": 1200000,
    "experienceRange": "4-6 yr",
    "companyImage": "[Image URL for Tesla Logo]",
    "description": {
      "summary": "Lead and manage complex software development projects, ensuring they are delivered on time, within budget, and to the highest quality standards.",
      "responsibilities": [
        "Define project scope, goals, and deliverables in collaboration with stakeholders.",
        "Develop and track detailed project plans, schedules, and resource allocation.",
        "Lead and motivate cross-functional teams using Agile or Waterfall methodologies.",
        "Identify and manage project risks, proactively developing mitigation strategies.",
        "Communicate project status, issues, and successes clearly to all stakeholders."
      ]
    },
    "status": "published"
  },
  {
    "title": "DevOps Engineer",
    "company": "Mitsogo",
    "location": "Chennai",
    "jobType": "FullTime",
    "minSalary": 700000,
    "maxSalary": 1300000,
    "experienceRange": "2-4 yr",
    "companyImage": "[Image URL for Mitsogo Logo]",
    "description": {
      "summary": "Automate and maintain our continuous integration and continuous deployment (CI/CD) pipelines and manage our cloud infrastructure for high availability and performance.",
      "responsibilities": [
        "Design, implement, and manage CI/CD pipelines using tools like Jenkins, GitLab CI, or similar.",
        "Manage and provision cloud infrastructure using Infrastructure as Code (IaC) tools (e.g., Terraform, Ansible).",
        "Monitor system performance and troubleshoot production issues.",
        "Ensure system security, reliability, and compliance.",
        "Promote a DevOps culture of automation and collaboration."
      ]
    },
    "status": "published"
  },
  {
    "title": "QA Engineer",
    "company": "Google",
    "location": "Kochi",
    "jobType": "Internship",
    "minSalary": 200000,
    "maxSalary": 400000,
    "experienceRange": "0-1 yr",
    "companyImage": "[Image URL for Google Logo]",
    "description": {
      "summary": "A foundational role focused on ensuring the quality and reliability of Google's web and mobile applications through rigorous testing and quality assurance procedures.",
      "responsibilities": [
        "Develop, maintain, and execute comprehensive test plans and test cases.",
        "Identify, document, and track software defects and inconsistencies.",
        "Perform various types of testing, including functional, regression, and performance testing.",
        "Work closely with developers to reproduce and resolve bugs.",
        "Contribute to the automation of testing processes."
      ]
    },
    "status": "published"
  },
  {
    "title": "Business Analyst",
    "company": "Facebook",
    "location": "Onsite",
    "jobType": "FullTime",
    "minSalary": 500000,
    "maxSalary": 900000,
    "experienceRange": "2-3 yr",
    "companyImage": "[Image URL for Facebook Logo / Meta Logo]",
    "description": {
      "summary": "Bridge the gap between business objectives and technical solutions by analyzing processes, gathering requirements, and recommending improvements to enhance efficiency.",
      "responsibilities": [
        "Gather, document, and analyze business requirements from various stakeholders.",
        "Create detailed process flows, wireframes, and user stories.",
        "Evaluate business processes and suggest technology-driven solutions for optimization.",
        "Act as a liaison between the business teams and the development team.",
        "Assist in the testing and implementation of new features and systems."
      ]
    },
    "status": "published"
  },
  {
    "title": "Frontend Developer",
    "company": "Microsoft",
    "location": "Remote",
    "jobType": "PartTime",
    "minSalary": 400000,
    "maxSalary": 800000,
    "experienceRange": "1-3 yr",
    "companyImage": "[Image URL for Microsoft Logo]",
    "description": {
      "summary": "Join a team dedicated to building intuitive and visually appealing user interfaces. This part-time role focuses on creating responsive and accessible web experiences.",
      "responsibilities": [
        "Develop responsive user interfaces using modern HTML, CSS, and JavaScript frameworks.",
        "Ensure high-quality graphic standards and brand consistency.",
        "Optimize frontend code for performance across various devices and browsers.",
        "Collaborate with backend developers to integrate UI components with API services.",
        "Participate in design and code reviews to maintain a high bar for quality."
      ]
    },
    "status": "published"
  },
  {
    "title": "Full Stack Developer",
    "company": "Amazon",
    "location": "Pune",
    "jobType": "Contract",
    "minSalary": 500000,
    "maxSalary": 1000000,
    "experienceRange": "2-4 yr",
    "companyImage": "[Image URL for Amazon Logo - e.g., https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_logo.svg]",
    "description": {
      "summary": "A contract opportunity to work on end-to-end web application development, contributing expertise across the entire technology stack to deliver robust features.",
      "responsibilities": [
        "Responsible for end-to-end feature development, from database to user interface.",
        "Write, test, and deploy code for both the client and server sides.",
        "Manage relational and non-relational databases.",
        "Perform cross-browser and cross-device compatibility testing.",
        "Participate actively in sprint planning and daily stand-ups."
      ]
    },
    "status": "published"
  },
  {
    "title": "UI Designer",
    "company": "Tesla",
    "location": "Onsite",
    "jobType": "FullTime",
    "minSalary": 450000,
    "maxSalary": 800000,
    "experienceRange": "1-2 yr",
    "companyImage": "[Image URL for Tesla Logo]",
    "description": {
      "summary": "Craft elegant and user-friendly interfaces for Tesla's internal and external applications. Focus on visual design consistency and user flow optimization.",
      "responsibilities": [
        "Design compelling visual interfaces that adhere to brand guidelines.",
        "Create detailed specifications for visual designs and user interaction.",
        "Work with UX designers to translate wireframes into high-fidelity UI designs.",
        "Maintain and evolve a comprehensive UI component library.",
        "Collaborate with engineers to ensure flawless execution of the final design."
      ]
    },
    "status": "published"
  },
  {
    "title": "Backend Developer",
    "company": "Mitsogo",
    "location": "Hyderabad",
    "jobType": "FullTime",
    "minSalary": 600000,
    "maxSalary": 1200000,
    "experienceRange": "2-4 yr",
    "companyImage": "[Image URL for Mitsogo Logo]",
    "description": {
      "summary": "Develop robust and high-performing server-side logic and integrate cutting-edge solutions with various databases to support our core enterprise products.",
      "responsibilities": [
        "Implement complex server-side application logic using appropriate programming languages.",
        "Design and optimize data models for scalability and performance.",
        "Develop secure and efficient API endpoints for frontend consumption.",
        "Conduct performance tuning, and load testing.",
        "Ensure application stability and maintainability through strong coding practices."
      ]
    },
    "status": "published"
  }
]

async function seed() {
  try {
    await connectDB(MONGO_URI);
    console.log('MongoDB connected for seeding');

    // Delete existing jobs
    await Job.deleteMany({});

    // Insert sample jobs
    await Job.insertMany(sampleJobs);

    console.log('Seeded DB successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
