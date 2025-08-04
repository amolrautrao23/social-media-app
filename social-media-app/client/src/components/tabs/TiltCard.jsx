import { useRef, useEffect, useState } from 'react';

const TiltCard = ({ icon, title, desc = "" }) => {
    const cardRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const SCALE_X = 4;
    const SCALE_Y = 8;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMouseMove = (e) => {
        if (isMobile) return;

        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const width = card.offsetWidth;
        const height = card.offsetHeight;

        const rotateX = (y / height) * -(SCALE_Y * 2) + SCALE_Y;
        const rotateY = (x / width) * (SCALE_X * 2) - SCALE_X;

        card.style.transform = `perspective(300px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    };

    const handleMouseLeave = () => {
        if (isMobile) return;

        const card = cardRef.current;
        if (!card) return;

        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="edu-tab-card transition-transform duration-300 ease-in-out"
        >
            <div className="edu-tab-icon">
                <img src={icon} alt={title} height={80} width={80} loading="lazy" />
            </div>
            <div className="mt-4">
                <h3 className="text-2xl font-bold mb-5">{title}</h3>
                
                {desc && <p className="text-sm text-gray-600 mt-2">{desc}</p>}
            </div>
        </div>
    );
};

export default TiltCard;
