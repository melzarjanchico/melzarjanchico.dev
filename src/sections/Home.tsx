import TiltedCard from "@/components/TiltedCard";
import { Card } from "@/components/ui/card";
import { LayoutGroup, motion } from "motion/react";
import RotatingText from "@/components/RotatingText";
import Chico from '../assets/header/ChicoProfile.jpg'
import { Badge } from "@/components/ui/badge";
import { MY_TITLES as titles, MY_LINKS as links } from "@/data/links";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import { SpotifyMainPublicService } from "@/api/spotify/spotify-main-public";
import type { CurrentTrackSuccessResponse, SpotityMainPublicServiceResponse } from "@/api/spotify/spotify-models";
import MarqueeText from "@/sections/section-components/Marquee";
import AudioWave from "@/sections/section-components/AudioWave";
import { Button } from "@/components/ui/button";
import { commonButtonProperties } from "@/data/themes";
import { FaCircle } from "react-icons/fa6";
import type { ThemeItem } from "@/data/models";
import ModeToggler from "./section-components/ModeToggler";
import ThemeToggler from "./section-components/ThemeToggler";

type HomeProps = {
    className: string;
    isVisible: boolean;   
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    themeColor: ThemeItem;
    setThemeColor: (colorTheme: ThemeItem) => void;
    themeMode: string;
    toggleMode: () => void;
    togglePage: (page: string) => void;
};

const Home: React.FC<HomeProps> = ({
    className,
    isVisible = true,
    setIsVisible,
    themeColor,
    setThemeColor,
    themeMode,
    toggleMode,
    togglePage,
}: HomeProps) => {
    // Captions
    const [caption, setCaption] = useState<React.ReactNode>("Melzar Jan Chico"); 
    const [showCaption, setShowCaption] = useState(false);

    // Current Track
    const [showPlaying, setShowPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<CurrentTrackSuccessResponse | null>(null);

    // Shared Styles for Home card items
    const badgeDefaultStyle = "bg-black/60 font-light cursor-pointer";
    const headerClickablesStyle = "bg-theme-primary-light shadow-md hover:bg-theme-primary border border-theme-main transition-all duration-500 cursor-pointer";

    const nowPlayingCaption = () => {
        return (
            currentTrack?.item ?
                <div className="flex items-center gap-2.5 my-1.5">
                    <img
                        src={currentTrack.item.album.images[2].url}
                        alt={currentTrack.item.name}
                        loading="lazy"
                        className="size-10 rounded-xs object-cover shadow-md"
                    />
                    <div className="flex flex-col min-w-0 leading-snug">
                        <MarqueeText className="text-[10px] font-bold">
                            {currentTrack.item.name}
                        </MarqueeText >
                        <MarqueeText className="text-[10px] font-normal text-gray-500">
                            {
                                currentTrack.item.artists.map((artist, index) => (
                                    <span key={artist.id || index}>
                                        <span>{artist.name}</span>
                                        {currentTrack.item && index < currentTrack.item.artists.length - 1 && ", "}
                                    </span>
                                ))
                            } 
                        </MarqueeText>
                    </div>
                </div>
            : <></>
        )
    };

    useEffect(() => {
        const getCurrentTrack = async () => {
                const currentTrack = await SpotifyMainPublicService.getUserCurrentTrack() as SpotityMainPublicServiceResponse<CurrentTrackSuccessResponse>;
                if (currentTrack?.data?.item) {
                    setCurrentTrack(currentTrack.data);
                    setShowPlaying(true);
                }
        };
        void getCurrentTrack();
    }, [])

    const handleOnMouseEnter = (caption: React.ReactNode) => {
        setShowCaption(true);
        setCaption(caption);
    }

    const handleOnMouseLeave = () => {
        setShowCaption(false);
    }

    return (
        <div className={`@container ${className}`}>
            <div className="flex flex-col p-6 select-none w-full max-w-lg min-w-75 h-full min-h-0 max-h-screen justify-center items-center">

                {/* Tilted Profile Pic */}
                <TiltedCard
                    imageSrc={Chico}
                    altText="Melzar Jan Chico"
                    caption={caption}
                    rotateAmplitude={3}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={showCaption}
                    displayOverlayContent={true}
                    overlayContent={
                        <div className="flex items-start justify-between m-6">
                            <div className="flex flex-wrap gap-1">
                                <Badge 
                                    className={badgeDefaultStyle}
                                    onMouseEnter={() => handleOnMouseEnter("Open for Work")}
                                    onMouseLeave={() => handleOnMouseLeave()}
                                >
                                    <span><FaCircle className="text-green-500 text-[8px] mr-1"/></span>
                                    <span className="text-xs text-white">Open To Work</span>
                                </Badge>

                                <Badge 
                                    className={badgeDefaultStyle} 
                                    onMouseEnter={() => handleOnMouseEnter("Based on Cebu City, Philippines")}
                                    onMouseLeave={() => handleOnMouseLeave()}
                                >
                                    <ReactCountryFlag svg countryCode={"PH"} style={{width: '1em', height: '1em', marginRight: '4px'}}/>
                                    <span className="text-xs text-white">Cebu</span>
                                </Badge>

                                <Badge 
                                    className={`${badgeDefaultStyle} transition-all duration-500 ease-in-out ${
                                        showPlaying && currentTrack 
                                        ? "opacity-100" 
                                        : "opacity-0 pointer-events-none"
                                    }`} 
                                    onMouseEnter={() => showPlaying && currentTrack && handleOnMouseEnter(nowPlayingCaption())} 
                                    onMouseLeave={() => handleOnMouseLeave()}
                                >
                                    <AudioWave animate={currentTrack?.is_playing}/>
                                    <span className="text-xs ml-1 text-white">On Spotify</span>
                                </Badge>
                            </div>
                        </div>
                    }
                    themeContent={
                        <div className="flex justify-end gap-1 m-6">
                            {/* Light/Dark Mode Toggler */}
                            <ModeToggler 
                                themeMode={themeMode}
                                toggleMode={toggleMode}
                                setCaption={setCaption}
                                handleOnMouseEnter={handleOnMouseEnter}
                                handleOnMouseLeave={handleOnMouseLeave}
                            />
                            {/* Theme Color Toggler */}
                            <ThemeToggler
                                themeColor={themeColor}
                                setThemeColor={setThemeColor}
                                handleOnMouseEnter={handleOnMouseEnter}
                                handleOnMouseLeave={handleOnMouseLeave}
                            />
                        </div>
                    }  
                />

                <Card className="flex-none w-full p-8 rounded-none rounded-b-lg gap-2 justify-center items-center flex flex-col shadow-lg border-t-0 min-h-0 overflow-hidden">
                    <h3 className="font-light tracking-widest text-xs shrink-0">HI, I AM</h3>
                    <h1 className="scroll-m-20 font-extrabold tracking-tighter leading-none text-center text-4xl shrink-0">
                        Melzar Jan Chico
                    </h1>

                    <LayoutGroup>
                        <motion.div
                            className="flex flex-col justify-center text-center items-center text-zinc-800 min-h-0 @sm:flex-row"
                            layout
                        >
                            <motion.span
                                layout
                                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                className="dark:text-white transition-colors duration-500 ease-in-out"
                            >
                                Passionate 
                            </motion.span>
                            
                            <div className="mx-1 shrink-0">
                                <RotatingText
                                    texts={titles}
                                    mainClassName={`${headerClickablesStyle} inline-block px-2 rounded-sm`}
                                    staggerFrom={'last'}
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '-120%' }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden"
                                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                    rotationInterval={3000}
                                />
                            </div>
                        </motion.div>
                    </LayoutGroup>

                    <div className="flex gap-2 mt-4 shrink-0">
                        {links.filter((item) => item.main).map((item) => (
                            <a
                                key={item.name}
                                title={item.name}
                                href={item.link}
                                aria-label={item.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${headerClickablesStyle} flex size-8 items-center justify-center rounded-full text-zinc-800 text-md hover:scale-110`}
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>

                    <Button 
                        onClick={() => {
                            setIsVisible(isVisible);
                            if (isVisible) {
                                const storedPath = localStorage.getItem("page") || '/about';
                                togglePage(storedPath);
                            } else {
                                togglePage('/');
                            }
                        }} 
                        variant="outline"
                        className={`mt-4 w-full ${commonButtonProperties()}`}
                    >
                        <span className="truncate">{isVisible ? "More About Me" : "Back to Home"}</span>
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Home;