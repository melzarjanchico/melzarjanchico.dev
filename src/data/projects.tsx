import { RiAwardFill, RiGithubFill, RiWindowFill, RiYoutubeFill } from "react-icons/ri";
import type { ProjectItem } from "./models";
import LechGoAward from '../assets/docs/Award (LechGo CRM, 2022).pdf'
import Project1 from '../assets/projects/Project001.png'
import Project2 from '../assets/projects/Project002.jpg'
import Project3 from '../assets/projects/Project003.jpg'
import Project4 from '../assets/projects/Project004.png'
import Project5 from '../assets/projects/Project005.png'
import Project7 from '../assets/projects/Project007.png'

export const MY_PROJECTS: ProjectItem[] = [
    {
        id: "proj_001",
        name: "SAVER: Scintillating Aider Valiant Explorer Robot",
        description: <>We developed a remote-controlled scout robot prototype designed for high-risk earthquake zones. Using an FPV camera and computer vision, we've enabled the robot to navigate disaster sites in real-time and automatically identify trapped survivors to keep rescue teams safe.</>,
        date: new Date('2018-12'),
        skills: ['python', 'arduino'],
        image: Project1,
        links: [
            {
                icon: <RiYoutubeFill/>,
                link: "https://www.youtube.com/watch?v=6CSFz1sBz_A",
            }
        ],
        status: "done",
    },
    {
        id: "proj_002",
        name: "Project LechGo: CRM Mobile Application",
        description: <>We developed a mobile-first CRM to streamline operations for a local Cebuano <span className="italics">Lechonan</span>. The app features a sales dashboard, booking calendar, and centralized database to manage daily orders with ease. Built with modern cross-platform technologies, this project earned Best Project in our SE course</>,
        date: new Date('2022-06'),
        skills: ['dart', 'flutter', 'firebase', 'cloud-firestore'],
        image: Project2,
        links: [
            {
                icon: <RiGithubFill/>,
                link: "https://github.com/melzarjanchico-up/dennis-lechon-crm",
            },
            {
                icon: <RiAwardFill/>,
                link: LechGoAward
            }
        ],
        status: "done",
    },
    {
        id: "proj_003",
        name: "Multi-Label Video Game Genre Text Classification Using DistilBERT with Focal Loss Function",
        description: <>I developed a multi-label classification model to categorize video games by fine-tuning DistilBERT. To handle genre imbalances, I implemented a Focal Loss function to prioritize difficult-to-classify examples. The final model achieved a 0.69 micro-average F1 score and 0.77 average precision, effectively identifying complex categories within a diverse dataset.</>,
        date: new Date('2023-07'),
        skills: ['python', 'numpy', 'scikit', 'pytorch', 'transformers', 'jupyter', 'colab'],
        image: Project3,
        links: [
            {
                icon: <RiGithubFill/>,
                link: "https://github.com/melzar-jan-chico-UP/sp_multilabel_vggtc.git",
            },
        ],
        status: "done",
    },
    {
        id: "proj_004",
        name: "My Spotify App",
        description: <>I developed a simple web app that displays my general details, my currently playing track, and my top tracks using the Spotify API. The project is still a work in progress because I'm planning to add more features and make the UI look like the <a href="https://www.billboard.com/charts/hot-100">Billboard Top 100</a> just for the lols.</>,
        date: new Date('2024-10'),
        skills: ['html', 'css', 'javascript', 'typescript', 'react-js', 'tailwind-css', 'vite', 'vercel'],
        image: Project4,
        links: [
            {
                icon: <RiGithubFill/>,
                link: "https://github.com/melzarjanchico/my-spotify-stats",
            },
            {
                icon: <RiWindowFill />,
                link: "https://melzarr-spotify-stats.vercel.app/melzarjanchico",
            }
        ],
        status: "pending",
    },
    {
        id: "proj_005",
        name: "Stardew Calendar Planner",
        description: <>I developed a simple calendar app for <span className='italic'>Stardew Valley</span> that tracks in-game festivals and villager birthdays. It also supports user-created events with full CRUD functionality. The project is currently ongoing, as I plan to add features like repeatable events for crop harvests, data import/export, and more.</>,
        date: new Date('2025-03'),
        skills: ['html', 'css', 'javascript', 'typescript', 'react-js', 'tailwind-css', 'vite', 'github-pages'],
        image: Project5,
        links: [
            {
                icon: <RiGithubFill/>,
                link: "https://github.com/melzarjanchico/stardew-calendar-planner",
            },
            {
                icon: <RiWindowFill />,
                link: "https://melzarjanchico.github.io/stardew-calendar-planner",
            }
        ],
        status: "pending",
    },
    {
        id: "proj_006",
        name: "All Purpose ExpressJS Server for Personal Use",
        description: <>I developed a simple backend application that I can reuse across any project. It features integrations for the Spotify and Steam APIs, with Letterboxd RSS feed support coming soon.</>,
        date: new Date('2025-07'),
        skills: ['javascript', 'typescript', 'express-js', 'rest-api', 'vercel', 'render'],
        image: undefined,
        links: [
            {
                icon: <RiGithubFill/>,
                link: "https://github.com/melzarjanchico/ap-express-js-server",
            },
        ],
        status: "pending",
    },
    {
        id: "proj_007",
        name: "This Portfolio Website",
        description: <>I designed and developed the website you're seeing right now. My goal was to blend professionalism with a bit of personal flair. It features my background, projects, skills, and stats — basically everything about me!</>,
        date: new Date('2026-04'),
        skills: ['html', 'css', 'javascript', 'typescript', 'react-js', 'tailwind-css', 'vite', 'vercel'],
        image: Project7,
        links: [
            {
                icon: <RiGithubFill/>,
                link: "https://github.com/melzarjanchico/melzarjanchico.dev",
            },
            {
                icon: <RiWindowFill />,
                link: "https://melzarjanchico-dev.vercel.app",
            }
        ],
        status: "pending",
    },
]
