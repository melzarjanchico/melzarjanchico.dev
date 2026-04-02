
import { RiLinkedinBoxFill, RiGithubFill, RiFacebookCircleFill, RiMailFill, RiFileTextFill } from "react-icons/ri";
import Resume from '../assets/docs/Resume (Melzar Jan Chico, 2026).pdf'

// Titles from the header
export const MY_TITLES = [
    '🚀 Software Engineer',
    '🛠️ Full Stack Developer',
    '🔎 Data Analyst',
    '🤖 AI/ML Engineer'
];

// Links for redirection
export const MY_LINKS = [
    {
        name: "Linkedin",
        link: "https://www.linkedin.com/in/melzarjanchico",
        icon: <RiLinkedinBoxFill/>,
    },
    {
        name: "Facebook",
        link: "https://www.facebook.com/melzarjanchico",
        icon: <RiFacebookCircleFill/>,
    },
    {
        name: "Github",
        link: "https://github.com/melzarjanchico",
        icon: <RiGithubFill/>,
    },
    {
        name: "Mail",
        link: "mailto:melzarjanchico@gmail.com",
        icon: <RiMailFill/>,
    },
    {
        name: "Resume",
        link: Resume,
        icon: <RiFileTextFill/>,
    },
]
