import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  const pos = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // Outer cursor
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(${isHovered.current ? 1.2 : 1})`;
      }

      // Hover detection
      const hoveredEl = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredEl) {
        const computed = window.getComputedStyle(hoveredEl);
        const isPointer =
          computed.cursor === "pointer" ||
          hoveredEl.closest("a, button, [role='button'], .cursor-pointer");

        isHovered.current = !!isPointer;
      }
    };

    const animateDot = () => {
      dot.current.x += (pos.current.x - dot.current.x) * 0.12;
      dot.current.y += (pos.current.y - dot.current.y) * 0.12;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) scale(${isHovered.current ? 1.8 : 1})`;
      }

      requestAnimationFrame(animateDot);
    };

    document.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animateDot);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDesktop]);

  // 🛑 Don't render on smaller screens
  if (!isDesktop) return null;

  return (
    <>
      {/* Outer circle */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          border: "2px solid #38bdf8",
          borderRadius: "50%",
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference bg-[var(--bg-primary)] rounded-full"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          transition: "transform 0.2s ease-out",
        }}
      />
    </>
  );
};

export default CustomCursor;
