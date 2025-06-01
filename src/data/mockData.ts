import { 
  Job, 
  User, 
  JobApplication, 
  JobSeekerProfile, 
  EmployerProfile 
} from '../types';

// Mock Users
export const users: User[] = [
  {
    id: 'user1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'jobseeker',
    profileComplete: true,
    createdAt: '2023-10-15'
  },
  {
    id: 'user2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'jobseeker',
    profileComplete: true,
    createdAt: '2023-11-02'
  },
  {
    id: 'employer1',
    email: 'hr@techcorp.com',
    name: 'TechCorp Solutions',
    role: 'employer',
    profileComplete: true,
    createdAt: '2023-09-20'
  },
  {
    id: 'employer2',
    email: 'careers@innovateinc.com',
    name: 'Innovate Inc',
    role: 'employer',
    profileComplete: true,
    createdAt: '2023-10-05'
  }
];

// Job Seeker Profiles
export const jobSeekerProfiles: JobSeekerProfile[] = [
  {
    userId: 'user1',
    name: 'John Doe',
    headline: 'Senior Software Engineer with 5+ years of experience',
    phone: '+91-9876543210',
    location: 'Bangalore, Karnataka',
    experience: 5,
    currentSalary: 1200000,
    expectedSalary: 1500000,
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
    summary: 'Experienced software engineer with a passion for building scalable web applications.',
    education: [
      {
        id: 'edu1',
        institution: 'Indian Institute of Technology, Delhi',
        degree: 'B.Tech',
        fieldOfStudy: 'Computer Science',
        startDate: '2014-08-01',
        endDate: '2018-05-30',
        grade: '8.5 CGPA'
      }
    ],
    workExperience: [
      {
        id: 'exp1',
        company: 'WebTech Solutions',
        title: 'Software Engineer',
        location: 'Bangalore',
        startDate: '2018-06-15',
        endDate: '2021-05-30',
        current: false,
        description: 'Developed and maintained web applications using React and Node.js.'
      },
      {
        id: 'exp2',
        company: 'TechCorp Solutions',
        title: 'Senior Software Engineer',
        location: 'Bangalore',
        startDate: '2021-06-15',
        current: true,
        description: 'Leading a team of developers to build scalable cloud solutions.'
      }
    ],
    profileImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    userId: 'user2',
    name: 'Jane Smith',
    headline: 'UX/UI Designer with expertise in user-centered design',
    phone: '+91-9876543211',
    location: 'Mumbai, Maharashtra',
    experience: 3,
    currentSalary: 900000,
    expectedSalary: 1200000,
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'HTML/CSS', 'Prototyping'],
    summary: 'Creative designer focused on creating beautiful and functional user experiences.',
    education: [
      {
        id: 'edu2',
        institution: 'National Institute of Design',
        degree: 'Bachelor of Design',
        fieldOfStudy: 'Interaction Design',
        startDate: '2016-08-01',
        endDate: '2020-05-30'
      }
    ],
    workExperience: [
      {
        id: 'exp3',
        company: 'Creative Solutions',
        title: 'UI Designer',
        location: 'Mumbai',
        startDate: '2020-07-15',
        endDate: '2022-04-30',
        current: false,
        description: 'Created user interfaces for web and mobile applications.'
      },
      {
        id: 'exp4',
        company: 'Innovate Inc',
        title: 'UX/UI Designer',
        location: 'Mumbai',
        startDate: '2022-05-15',
        current: true,
        description: 'Leading design initiatives for product teams.'
      }
    ],
    profileImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
];

// Employer Profiles
export const employerProfiles: EmployerProfile[] = [
  {
    userId: 'employer1',
    companyName: 'TechCorp Solutions',
    industry: 'Information Technology',
    companySize: '201-500 employees',
    foundedYear: 2010,
    website: 'https://techcorp.example.com',
    about: 'TechCorp Solutions is a leading IT services company specializing in cloud solutions and digital transformation.',
    headquarters: 'Bangalore, India',
    logoUrl: 'https://via.placeholder.com/150?text=TechCorp'
  },
  {
    userId: 'employer2',
    companyName: 'Innovate Inc',
    industry: 'Software Development',
    companySize: '51-200 employees',
    foundedYear: 2015,
    website: 'https://innovate.example.com',
    about: 'Innovate Inc is a product-based company focused on creating cutting-edge software solutions.',
    headquarters: 'Mumbai, India',
    logoUrl: 'https://via.placeholder.com/150?text=Innovate'
  }
];

// Jobs
export const jobs: Job[] = [
  {
    id: 'job1',
    title: 'Senior Software Engineer',
    company: {
      id: 'employer1',
      name: 'TechCorp Solutions',
      logo: 'https://via.placeholder.com/150?text=TechCorp',
      size: '201-500 employees',
      industry: 'Information Technology'
    },
    location: 'Bangalore, Karnataka',
    salary: {
      min: 1200000,
      max: 1800000,
      currency: 'INR'
    },
    experience: '3-6 years',
    jobType: 'full-time',
    workMode: 'hybrid',
    skills: ['React.js', 'Node.js', 'MongoDB', 'AWS'],
    description: 'We are looking for a Senior Software Engineer to join our growing team. The ideal candidate will have strong experience in full-stack development and cloud technologies.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience in web development',
      'Strong proficiency in React.js and Node.js',
      'Experience with cloud platforms like AWS',
      'Good communication and teamwork skills'
    ],
    responsibilities: [
      'Develop and maintain web applications using React and Node.js',
      'Design and implement database schemas and APIs',
      'Collaborate with cross-functional teams to define and implement new features',
      'Mentor junior developers and review code',
      'Participate in agile development processes'
    ],
    benefits: [
      'Health insurance',
      'Flexible working hours',
      'Remote work options',
      'Professional development budget',
      'Annual bonus'
    ],
    postedDate: '2024-01-15',
    deadline: '2024-02-15',
    applicationsCount: 45,
    isActive: true
  },
  {
    id: 'job2',
    title: 'UX/UI Designer',
    company: {
      id: 'employer2',
      name: 'Innovate Inc',
      logo: 'https://via.placeholder.com/150?text=Innovate',
      size: '51-200 employees',
      industry: 'Software Development'
    },
    location: 'Mumbai, Maharashtra',
    salary: {
      min: 800000,
      max: 1200000,
      currency: 'INR'
    },
    experience: '2-4 years',
    jobType: 'full-time',
    workMode: 'onsite',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping'],
    description: 'Innovate Inc is looking for a talented UX/UI Designer to create engaging and intuitive user experiences for our products.',
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field',
      '2+ years of experience in UX/UI design',
      'Proficiency in design tools like Figma and Adobe XD',
      'Strong portfolio showcasing user-centered design work',
      'Understanding of design systems and component libraries'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with product managers and developers',
      'Create and maintain design systems',
      'Stay updated with the latest design trends and best practices'
    ],
    benefits: [
      'Competitive salary',
      'Health and dental insurance',
      'Creative work environment',
      'Learning and development opportunities',
      'Regular team outings'
    ],
    postedDate: '2024-01-20',
    deadline: '2024-02-20',
    applicationsCount: 27,
    isActive: true
  },
  {
    id: 'job3',
    title: 'Data Scientist',
    company: {
      id: 'employer1',
      name: 'TechCorp Solutions',
      logo: 'https://via.placeholder.com/150?text=TechCorp',
      size: '201-500 employees',
      industry: 'Information Technology'
    },
    location: 'Hyderabad, Telangana',
    salary: {
      min: 1500000,
      max: 2200000,
      currency: 'INR'
    },
    experience: '4-7 years',
    jobType: 'full-time',
    workMode: 'remote',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'TensorFlow'],
    description: 'TechCorp Solutions is seeking an experienced Data Scientist to join our analytics team. The role involves developing machine learning models and extracting insights from large datasets.',
    requirements: [
      'Master\'s or PhD in Computer Science, Statistics, or related field',
      '4+ years of experience in data science or machine learning',
      'Strong programming skills in Python',
      'Experience with ML frameworks like TensorFlow or PyTorch',
      'Strong analytical and problem-solving skills'
    ],
    responsibilities: [
      'Develop and implement machine learning models',
      'Extract insights from large and complex datasets',
      'Create data visualizations and reports',
      'Collaborate with engineering teams to implement ML solutions',
      'Stay updated with the latest advancements in AI/ML'
    ],
    benefits: [
      'Competitive salary package',
      'Remote work flexibility',
      'Health insurance',
      'Learning budget',
      'Performance bonuses'
    ],
    postedDate: '2024-01-10',
    deadline: '2024-02-10',
    applicationsCount: 32,
    isActive: true
  },
  {
    id: 'job4',
    title: 'Product Manager',
    company: {
      id: 'employer2',
      name: 'Innovate Inc',
      logo: 'https://via.placeholder.com/150?text=Innovate',
      size: '51-200 employees',
      industry: 'Software Development'
    },
    location: 'Pune, Maharashtra',
    salary: {
      min: 1800000,
      max: 2500000,
      currency: 'INR'
    },
    experience: '5-8 years',
    jobType: 'full-time',
    workMode: 'hybrid',
    skills: ['Product Management', 'Agile', 'Market Research', 'User Stories', 'Roadmapping'],
    description: 'Innovate Inc is looking for an experienced Product Manager to lead our product development initiatives and drive our product strategy.',
    requirements: [
      'Bachelor\'s degree in Business, Computer Science, or related field',
      '5+ years of experience in product management',
      'Experience with agile development methodologies',
      'Strong analytical and communication skills',
      'Understanding of software development lifecycle'
    ],
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize product requirements',
      'Work closely with engineering, design, and marketing teams',
      'Analyze market trends and competitive landscape',
      'Define success metrics and monitor product performance'
    ],
    benefits: [
      'Competitive compensation package',
      'Flexible work arrangements',
      'Health and wellness benefits',
      'Professional development opportunities',
      'Stock options'
    ],
    postedDate: '2024-01-05',
    deadline: '2024-02-05',
    applicationsCount: 18,
    isActive: true
  }
];

// Job Applications
export const jobApplications: JobApplication[] = [
  {
    id: 'app1',
    jobId: 'job1',
    userId: 'user1',
    appliedDate: '2024-01-20',
    status: 'shortlisted',
    coverLetter: 'I am excited to apply for the Senior Software Engineer position at TechCorp Solutions...',
    resumeUrl: '/resumes/john-doe-resume.pdf',
    notes: 'Candidate has relevant experience in React and Node.js.'
  },
  {
    id: 'app2',
    jobId: 'job2',
    userId: 'user2',
    appliedDate: '2024-01-22',
    status: 'applied',
    coverLetter: 'With my background in UI/UX design, I believe I would be a great fit for the UX/UI Designer role...',
    resumeUrl: '/resumes/jane-smith-resume.pdf'
  }
];