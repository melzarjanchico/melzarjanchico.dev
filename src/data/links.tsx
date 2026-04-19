
import { RiLinkedinBoxFill, RiGithubFill, RiFacebookCircleFill, RiMailFill, RiFileTextFill, RiYoutubeFill, RiInstagramFill, RiSpotifyFill, RiHome9Fill, RiUser3Fill, RiToolsFill, RiBarChart2Fill, RiCalendarFill, RiCodeSSlashFill } from "react-icons/ri";
import { FaHackerrank, FaKaggle } from "react-icons/fa";
import Resume from '../assets/docs/Resume (Melzar Jan Chico, 2026).pdf'
import type { SectionItem } from "./models";

// Titles from the header
export const MY_TITLES = [
    '🚀 Software Engineer',
    '🛠️ Full Stack Developer',
    '🔎 Data Analyst',
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
        icon: <FaHackerrank size={15}/>,
        main: false,
    },
    {
        name: "Kaggle",
        link: "https://www.kaggle.com/melzarjanchico",
        icon: <FaKaggle size={14}/>,
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

export const VALID_PATHS = [
    '/',
    '/about',
    '/history',
    '/projects',
    '/skills',
    '/stats',
]

export const SECTIONS: SectionItem[] = [
    {
        link: '/',
        icon: <RiHome9Fill/>,
        name: "Home",
    },
    {
        link: '/about',
        icon: <RiUser3Fill />,
        name: "About",
    },
    {
        link: '/history',
        icon: <RiCalendarFill />,
        name: "History",
    },
    {
        link: '/projects',
        icon: <RiCodeSSlashFill />,
        name: "Projects",
    },
    {
        link: '/skills',
        icon: <RiToolsFill />,
        name: "Skills",
    },
    {
        link: '/stats',
        icon: <RiBarChart2Fill />,
        name: "Stats",
    },
]
