import { faFacebook, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFile } from "@fortawesome/free-solid-svg-icons";
import Resume from '../assets/docs/Resume (Melzar Jan Chico, 2026).pdf'

// Titles from the header
export const MY_TITLES = [
    '🚀 Software Engineer',
    '🎨 Frontend Developer',
    '⚙️ Backend Developer',
    '🎮 Game Developer',
    '🔎 Data Analyst',
    '🤖 AI Enthusiast',
];

// Links for redirection
export const MY_LINKS = [
    {
        name: "Linkedin",
        link: "https://www.linkedin.com/in/melzarjanchico",
        icon: faLinkedin,
    },
    {
        name: "Github",
        link: "https://github.com/melzarjanchico",
        icon: faGithub,
    },
    {
        name: "Facebook",
        link: "https://www.facebook.com/melzarjanchico",
        icon: faFacebook,
    },
    {
        name: "Mail",
        link: "mailto:melzarjanchico@gmail.com",
        icon: faEnvelope,
    },
    {
        name: "Resume",
        link: Resume,
        icon: faFile,
    },
]
