import { useState } from "react";
import PlayButton from '../assets/images/icons/youtube-play-icon.webp';
import FrameKids from '../assets/images/frame-kids.webp';
import SectionHeading from "./controls/SectionHeading";
// import VideoFile from '../assets/video/video.mp4';

const LearnMoreVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="learn-more-section side-space section-space section-top-space">
            <div className="video-frame">
                <SectionHeading className={'learn-more-heading'}>
                    Learn More <br /> About Turbokids!
                </SectionHeading>
                <img src={FrameKids} alt="frame kids" className="frame-kids" loading="lazy" />
                {!isPlaying ? (
                    <div className="video-thumbnail">
                        <button
                            className="custom-play-btn"
                            aria-label="Play Video"
                            onClick={() => setIsPlaying(true)}
                        >
                            {/* <PlayButton /> */}
                            <img src={PlayButton} height={40} width={135} alt="play video" loading="lazy" />
                        </button>
                    </div>
                ) : (
                    // <Suspense fallback={<div>Loading video...</div>}>
                    //     <LazyVideo />
                    // </Suspense>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/tguAnw_8x_Q?autoplay=1&mute=0&playsinline=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
        </section>
    );
};

// const LazyVideo = () => {
//     return (
//         <video
//             controls
//             playsInline
//             loop
//             autoPlay
//             preload="none"
//         >
//             <source src={VideoFile} type="video/mp4" />
//             Your browser does not support the video tag.
//         </video>
//     );
// };

export default LearnMoreVideo;
