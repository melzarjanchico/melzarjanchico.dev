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
import { MarqueeText } from "@/components/personal/Marquee";
import AudioWave from "@/components/personal/AudioWave";

const Header = () => {
    const [caption, setCaption] = useState<React.ReactNode>("Melzar Jan Chico");
    const [showPlaying, setShowPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<CurrentTrackSuccessResponse | null>(null);

    const badgeDefaultStyle = "bg-black/60 font-light cursor-pointer";
    const headerClickablesStyle = "bg-orange-200 shadow-md hover:bg-orange-300/80 transition-colors duration-200 cursor-pointer";

    const nowPlayingCaption = () => {
        return (
            currentTrack?.item ?
                <div className="flex items-center gap-2 my-[4px]">
                    {/* Album cover */}
                    <img
                        src={currentTrack.item.album.images[2].url}
                        alt={currentTrack.item.name}
                        loading="lazy"
                        className="size-10 rounded-xs object-cover shadow-md"
                    />

                    {/* Song info */}
                    <div className="flex flex-col min-w-0 leading-snug">
                        <MarqueeText className="text-[10px] font-bold">
                            {currentTrack.item.name}
                        </MarqueeText >
                        <MarqueeText className="text-[10px] font-normal text-gray-500">
                            {
                                currentTrack.item.artists.map((artist, index) => (
                                    <span key={artist.id || index}>
                                        <span key={artist.id}>{artist.name}</span>
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
                    // If success, set current track
                    setCurrentTrack(currentTrack.data);
                    setShowPlaying(true);
                }
        };

        void getCurrentTrack();
    }, [])

    return (
        <div className="flex flex-col lg:min-w-4xl lg:flex-row select-none">

            {/* Tilted Profile Pic */}
            <TiltedCard
                imageSrc={Chico}
                altText="Melzar Jan Chico"
                caption={caption}
                containerHeight={{ sm: '336px', lg: '280px' }}
                containerWidth={{ sm: '448px', lg: '336px' }}
                imageHeight={{ sm: '336px', lg: '280px'}}
                imageWidth={{ sm: '448px', lg: '336px'}}
                rotateAmplitude={3}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent={true}
                overlayContent={
                    <div className="flex gap-1 m-8 lg:m-5">

                        {/* Work Availability */}
                        <Badge className={badgeDefaultStyle} onMouseEnter={() => setCaption("Open for Work")} onMouseLeave={() => setCaption("Melzar Jan Chico")}>
                            <FontAwesomeIcon icon={faCircle} data-icon="inline-start" className="text-green-500 text-[8px]"/>
                            <span className="text-xs lg:text-[11px]">Open To Work</span>
                        </Badge>

                        {/* Country */}
                        <Badge className={badgeDefaultStyle} onMouseEnter={() => setCaption("Based on Cebu City, Philippines")} onMouseLeave={() => setCaption("Melzar Jan Chico")}>
                            <ReactCountryFlag svg countryCode={"PH"} style={{width: '1em', height: '1em',}}/>
                            <span className="text-xs lg:text-[11px]">Cebu</span>
                        </Badge>

                        { /* Currently Playing */}
                        {showPlaying &&
                            <Badge className={badgeDefaultStyle} onMouseEnter={() => setCaption(nowPlayingCaption())} onMouseLeave={() => setCaption("Melzar Jan Chico")}>
                                <AudioWave/>
                                <span className="text-xs lg:text-[11px]">On Spotify</span>
                            </Badge>
                        }
                    </div>
                }      
            />

            <Card className="flex-1 p-10 rounded-none rounded-b-lg gap-2 justify-center items-center min-w-md lg:items-start lg:gap-3 lg:rounded-b-none lg:rounded-br-lg lg:rounded-tr-lg">

                {/* Intro */}
                <h3 className="font-light">HI, I AM</h3>

                {/* Name */}
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tighter lg:text-5xl">
                    Melzar Jan Chico
                </h1>

                {/* Rotating Text of Titles */}
                <LayoutGroup>
                    <motion.p className="flex font-weight-900 items-center gap-2 text-zinc-800" layout>
                        <motion.span
                            layout
                            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                            >
                            Passionate{' '}
                        </motion.span>
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
                    </motion.p>
                </LayoutGroup>

                {/* Links */}
                <div className="flex gap-2 mt-4">
                    {links.map((item) => (
                        <a
                            key={item.name}
                            title={item.name}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${headerClickablesStyle} flex size-8 items-center justify-center rounded-full text-zinc-800 text-sm hover:scale-105 transition-transform`}
                            
                        >
                            <FontAwesomeIcon icon={item.icon} />
                        </a>
                    ))}
                </div>

            </Card>
        </div>
    );
};

export default Header;