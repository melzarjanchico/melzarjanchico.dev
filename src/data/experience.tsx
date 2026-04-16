import work_kn from '../assets/history/work-kn.jpg';
import work_myt from '../assets/history/work-myt.jpg';
import work_pj from '../assets/history/work-pj.jpg';
import work_talino from '../assets/history/work-talino.jpg';
import school_up from '../assets/history/school-up.jpg';
import school_stec from '../assets/history/school-stec.jpg'
import school_sdlc from '../assets/history/school-sdlc.jpg'

export const MY_EMPLOYMENT = [
    {
        id: "exp_001",
        name: "Kuehne+Nagel",
        position: "Student Intern",
        type: "internship",
        startDate: new Date('2018-11'),
        endDate: new Date('2018-11'),
        location: "Cebu City, Philippines",
        setup: "onsite",
        image: work_kn,
        description: [
            <>Immersed with the IT support roles and functions: handling computer hardware, managing inventory, and associated technical operations.</>,
        ],
        skills: ['ms-office']
    },
    {
        id: "exp_002",
        name: "MYT SoftDev Solutions, Inc.",
        position: "Software Developer Intern ",
        type: "internship",
        startDate: new Date('2021-11'),
        endDate: new Date('2022-04'),
        location: "Cebu City, Philippines",
        setup: "remote",
        image: work_myt,
        description: [
            <>Developed initial frontend ERP web application for a local health and beauty client using HTML, Bootstrap CSS, and ReactJS.</>,
            <>Honed with data modelling and schema creation using UML diagrams and basic graphic design using Figma.</>,
            <>Cooperated with project managers, backend developers, and designers to come up with efficient & effective solutions.</>,
        ],
        skills: [
            'html', 'css', 'javascript', 'typescript', 'react-js', 'bootstrap-css', 'figma', 'rest-api', 'git', 'github', 'vs-code',
        ],
    },
    {
        id: "exp_003",
        name: "Networld Capital Ventures Inc. (PJ Lhuillier Group of Companies)",
        position: "Data Analyst Intern",
        type: "internship",
        startDate: new Date('2022-06'),
        endDate: new Date('2022-07'),
        location: "Makati City, Philippines",
        setup: "remote",
        image: work_pj,
        description: [
            <>Visualized data and made interactive dashboards using Microsoft Power BI and related technologies.</>,
            <>Implemented SQL commands and queries utilizing MySQL and SQL Server Management Studio.</>,
        ],
        skills: [
            'sql', 't-sql', 'ms-power-bi',
        ],
    },
    {
        id: "exp_004",
        name: "Networld Capital Ventures Inc. (PJ Lhuillier Group of Companies)",
        position: "Project-based Data Analyst",
        type: "project-based",
        startDate: new Date('2023-09'),
        endDate: new Date('2024-03'),
        location: "Makati City, Philippines",
        image: work_pj,
        setup: "hybrid",
        description: [
            <>Developed and assisted on several dashboards using MS Power BI, including monitoring and customer extraction dashboards on various core products for blasts and campaigns.</>,
            <>Designed various automation flows that catered to daily requests using MS Power Automate and Python, which made the process much faster, reduced the constant emails and risks of human error.</>,
            <>Made T-SQL scripts, made reports using MS Office tools, and communicated with various key personnel to serve data requests from different groups and departments.</>,
        ],
        skills: [
            'python', 'sql', 't-sql', 'ms-office', 'ms-power-bi', 'ms-power-automate',
        ],
    },
    {
        id: "exp_005",
        name: "Talino Fintech Foundry",
        position: "Software Engineer",
        type: "full-time",
        startDate: new Date('2024-04'),
        endDate: new Date(),
        location: "Pasig City, Philippines",
        setup: "hybrid",
        image: work_talino,
        description: [
            <>Currently serving as a full stack developer for digital financial solutions provider for rural banks.</>,
            <>Helped develop and maintain several core platform banking microservices with ExpressJS. Also supported development for a web-based teller application with ReactJS.</>,
            <>Contributed to the front-end development across three e-commerce platforms for an international supermarket chain's digital marketplace ecosystem using ReactJS with Tailwind.</>,
            <>Worked closely and cross-functionally with designers, engineers, and product leads in delivering high-quality, user-focused features within project timelines.</>,
        ],
        skills: [
            'html', 'css', 'javascript', 'typescript', 'react-js', 'tailwind-css', 'vite', 'auth-jwt',
            'node-js', 'express-js', 'typeorm', 'python', 'odoo', 'rest-api', 'sql', 'postgresql', 'figma',
            'git', 'github', 'agile-scrum', 'clickup', 'postman', 'open-api', 'vs-code', 'google-workspace',
        ],
    },
];

export const MY_EDUCATION = [
    {
        id: "edu_001",
        name: "Saint Dominic Savio Internation School",
        degree: "Junior High School Diploma",
        major: undefined,
        startDate: new Date('2013-06'),
        endDate: new Date('2017-03'),
        location: "Lapu-Lapu City, Philippines",
        image: school_sdlc,
        description: [
            <>Completed <span className='italic'>With Honors</span>.</>
        ],
        skills: [
            'ms-office',
        ]
    },
    {
        id: "edu_002",
        name: "Science and Technology Education Center",
        degree: "Senior High School Diploma",
        major: "STEM",
        startDate: new Date('2017-06'),
        endDate: new Date('2019-03'),
        location: "Lapu-Lapu City, Philippines",
        image: school_stec,
        description: [
            <>Graduated <span className='italic'>With Honors</span>.</>,
            <><span className='font-semibold'>Research Awards:</span> Regional Science and Technology Fair 2018 1st Place Winner, National Science and Technology Fair 2019 Finalist, Biosymposium Interschool Research Poster Presentation 3rd Place Winner</>,
        ],
        skills: [
            'html', 'css', 'ms-office', 'google-workspace', 'canva',
        ]
    },
    {
        id: "edu_003",
        name: "University of the Philippines - Cebu",
        degree: "Bachelor of Science",
        major: "Computer Science",
        startDate: new Date('2019-08'),
        endDate: new Date('2023-07'),   
        location: "Cebu City, Philippines",
        image: school_up,
        description: [
            <>Graduated <span className='italic'>magna cum laude</span> (GWA: 1.271). Consistent University Scholar (President's Lister). UPCAT Passer.</>,
            <><span className='font-semibold'>Relevant Coursework:</span> Software Engineering, Database Systems, Machine Learning, Data Structures and Algorithms, Natural Language Processing, Object-Oriented Programming</>,
            <><span className='font-semibold'>Key Projects:</span> COVID case detection through symptom checking using Naïve Bayes classifier; Simple IoT design for a weather-based food recommendation system; Prototype design for a Philippine-oriented rental service platform; CRM mobile application for a local Lechonan client.</>,
            <><span className='font-semibold'>Research Study:</span> Multi-Label Video Game Genre Text Classification Using DistilBERT with Focal Loss Function (using Python libraries pandas, numpy, sklearn, pytorch, etc.)</>,
            <>CHED TES-TDP Scholar. UP Computer Science Guild Member. UP Cebu Google Developer Students Club Builder</>,
        ],
        skills: [
            'c', 'c-plus-plus', 'python', 'markdown', 'latex', 'notion', 'canva', 'agile-scrum', 'ms-office', 'google-workspace', 'vs-code'
        ]
    },
]