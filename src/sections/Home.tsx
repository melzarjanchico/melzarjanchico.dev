import TiltedCard from "@/components/TiltedCard";
import { Card } from "@/components/ui/card";
import { LayoutGroup, motion } from "motion/react";
import RotatingText from "@/components/RotatingText";
import Chico from '../assets/header/ChicoProfile.jpg'
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { MY_TITLES as titles, MY_LINKS as links } from "@/data/const";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import { SpotifyMainPublicService } from "@/api/spotify/spotify-main-public";
import type { CurrentTrackSuccessResponse, SpotityMainPublicServiceResponse } from "@/api/spotify/spotify-models";
import MarqueeText from "@/components/personal/Marquee";
import AudioWave from "@/components/personal/AudioWave";
import { Button } from "@/components/ui/button";
import { MY_THEMES, THEMES_LIST, type ThemeItem } from "@/data/themes";

type HomeProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  themeColor: ThemeItem;
  setThemeColor: (colorTheme: ThemeItem) => void;
};

const Home: React.FC<HomeProps> = ({ 
  isVisible = true,
  setIsVisible,
  themeColor,
  setThemeColor,
}: HomeProps) => {
    const [caption, setCaption] = useState<React.ReactNode>("Melzar Jan Chico");
    const [showCaption, setShowCaption] = useState(false);
    const [showPlaying, setShowPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<CurrentTrackSuccessResponse | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    const badgeDefaultStyle = "bg-black/60 font-light cursor-pointer";
    const headerClickablesStyle = "bg-theme-primary shadow-md hover:bg-theme-primary-variant border border-theme-primary-variant transition-all duration-500 cursor-pointer";

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
        <div 
            className={`@container h-dvh flex items-center justify-center transition-all duration-700 ease-in-out ${
                isVisible ? 'w-full' : 'w-full lg:w-[30%]'
            }`}
        >
            <div className="flex flex-col p-6 select-none w-full max-w-lg h-full max-h-screen justify-center items-center min-h-0">

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
                        <div className="flex flex-wrap gap-1 m-6">
                            <Badge 
                                className={badgeDefaultStyle}
                                onMouseEnter={() => handleOnMouseEnter("Open for Work")}
                                onMouseLeave={() => handleOnMouseLeave()}
                            >
                                <FontAwesomeIcon icon={faCircle} className="text-green-500 text-[8px] mr-1"/>
                                <span className="text-xs">Open To Work</span>
                            </Badge>

                            <Badge 
                                className={badgeDefaultStyle} 
                                onMouseEnter={() => handleOnMouseEnter("Based on Cebu City, Philippines")}
                                onMouseLeave={() => handleOnMouseLeave()}
                            >
                                <ReactCountryFlag svg countryCode={"PH"} style={{width: '1em', height: '1em', marginRight: '4px'}}/>
                                <span className="text-xs">Cebu</span>
                            </Badge>

                            <Badge 
                                className={`${badgeDefaultStyle} transition-all duration-700 ease-in-out ${
                                    showPlaying && currentTrack 
                                    ? "opacity-100" 
                                    : "opacity-0 pointer-events-none"
                                }`} 
                                onMouseEnter={() => handleOnMouseEnter(nowPlayingCaption())} 
                                onMouseLeave={() => handleOnMouseLeave()}
                            >
                            <AudioWave animate={currentTrack?.is_playing}/>
                            <span className="text-xs ml-1">On Spotify</span>
                            </Badge>
                        </div>
                    }
                    themeContent={
                        <div className="relative flex flex-col items-center mr-3 mb-2">
                            <div className="relative flex flex-col items-center mb-1">
                                {THEMES_LIST
                                    .filter((color) => color.name !== themeColor.name)
                                    .map((color, index) => (
                                        <button
                                            key={color.name}
                                            onClick={(e) => {
                                                // 1. Prevent the click from "activating" parent containers
                                                e.stopPropagation();

                                                setThemeColor(color);
                                                setIsOpen(!isOpen);
                                                handleOnMouseLeave();

                                                // 2. Force the browser to lose focus on the button 
                                                // This often clears the "sticky hover" on mobile
                                                (e.currentTarget as HTMLButtonElement).blur();
                                            }}
                                            style={{ 
                                                backgroundColor: color.primaryColorVariant,
                                                transform: isOpen ? `translateY(-${(index) * 20}px)` : `translateY(0px)`,
                                                zIndex: MY_THEMES.length - index,
                                                transitionDelay: isOpen ? `${index * 30}ms` : `${(MY_THEMES.length - index) * 30}ms`
                                            }}
                                            className={`
                                                absolute bottom-0 size-4.5 rounded-full border transition-all duration-300 ease-out cursor-pointer 
                                                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                                                ${themeColor.name === color.name ? 'border-zinc-800' : 'border-transparent'}
                                            `}
                                            onMouseEnter={() => handleOnMouseEnter(color.name)} 
                                            onMouseLeave={() => handleOnMouseLeave()}
                                        />
                                    ))
                                }
                            </div>
                            <div 
                                className="relative flex items-center group"
                                onMouseEnter={() => handleOnMouseEnter("Change Themes")} 
                                onMouseLeave={() => handleOnMouseLeave()}
                            >
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(!isOpen)
                                    }}
                                    className="size-4.5 bg-theme-primary-variant rounded-full transition-all duration-300 ease-out border border-zinc-900 cursor-pointer drop-shadow-[0_4px_10px_var(--color-theme-primary)]"
                                />
                            </div>
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
                            className="flex flex-col justify-center text-center items-center text-zinc-800 @sm:flex-row min-h-0" 
                            layout
                        >
                            <motion.span
                                layout
                                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
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
                                    rotationInterval={2000}
                                />
                            </div>
                        </motion.div>
                    </LayoutGroup>

                    <div className="flex gap-2 mt-4 shrink-0">
                        {links.map((item) => (
                            <a
                                key={item.name}
                                title={item.name}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${headerClickablesStyle} flex size-8 items-center justify-center rounded-full text-zinc-800 text-sm hover:scale-110`}
                            >
                                <FontAwesomeIcon icon={item.icon} />
                            </a>
                        ))}
                    </div>

                    <Button 
                        onClick={() => setIsVisible(!isVisible)} 
                        variant="outline"
                        className="mt-4 w-full border-zinc-200 cursor-pointer hover:border-theme-primary-variant hover:bg-theme-primary/20 shrink-0"
                    >
                        {isVisible ? "More About Me" : "Back to Home"}
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Home;