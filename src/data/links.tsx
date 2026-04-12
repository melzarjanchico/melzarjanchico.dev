
import { RiLinkedinBoxFill, RiGithubFill, RiFacebookCircleFill, RiMailFill, RiFileTextFill, RiYoutubeFill, RiInstagramFill, RiSpotifyFill } from "react-icons/ri";
import { FaHackerrank } from "react-icons/fa";
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
        main: true,
    },
    {
        name: "Github",
        link: "https://github.com/melzarjanchico",
        icon: <RiGithubFill/>,
        main: true,
    },
    {
        name: "Hackerrank",
        link: "https://www.hackerrank.com/profile/melzarjanchico",
        icon: <FaHackerrank/>,
        main: false,
    },
    {
        name: "Facebook",
        link: "https://www.facebook.com/melzarjanchico",
        icon: <RiFacebookCircleFill/>,
        main: false,
    },
    {
        name: "Instagram",
        link: "https://www.instagram.com/melzarr",
        icon: <RiInstagramFill/>,
        main: false,
    },
    {
        name: "Youtube",
        link: "https://www.youtube.com/@melzarjanchico",
        icon: <RiYoutubeFill/>,
        main: false,
    },
    {
        name: "Spotify",
        link: "https://open.spotify.com/user/31y6gjfzto7nejgno7oyasmfl5yy?si=f0f192cecc9e4a55",
        icon: <RiSpotifyFill/>,
        main: false,
    },
    {
        name: "Mail",
        link: "mailto:melzarjanchico@gmail.com",
        icon: <RiMailFill/>,
        main: true,
    },
    {
        name: "Resume",
        link: Resume,
        icon: <RiFileTextFill/>,
        main: true
    },
]
