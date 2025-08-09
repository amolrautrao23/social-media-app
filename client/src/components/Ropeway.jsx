import Marquee from "react-fast-marquee";
import Ropeway1 from "../assets/images/icons/ropeway-1.webp";
// import Ropeway2 from "../assets/images/icons/gif1.gif";
import Ropeway3 from "../assets/images/ropeway/gif.mp4"
import SectionHeading from "./controls/SectionHeading";

const items = [
  { type: "img", img: Ropeway1, label: "Farm" },
  { type: "img", img: Ropeway1, label: "Shopping Mall" },
  { type: "video", img: Ropeway3, label: "Safari" },
  { type: "img", img: Ropeway1, label: "Amusement Park" },
  { type: "img", img: Ropeway1, label: "Arcade Games" },
  { type: "img", img: Ropeway1, label: "Hide and Seek" },
  { type: "img", img: Ropeway1, label: "Rally Car" },
  { type: "img", img: Ropeway1, label: "Snakes and Ladders" },
  { type: "img", img: Ropeway1, label: "Bomber Guys" },
];

const RopewaySlider = () => {
  return (
    <section className="section-space ropeway-section">
      <SectionHeading className="text-center px-[15px]">
        Entertainment Features
      </SectionHeading>

      <div className="bg-white py-[20px] md:py-[40px]  overflow-hidden">
        <div className="rotate-[5deg] -mx-5">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            direction="left"

          >
            {items.map((item, index) => (
              <div
                key={index}
                className="mx-[50px] inline-block ropeway-wrapper relative"
              >
                <div className="ropeway-img">
                  {/* <img src={item.img} alt={item.label} height={80} width={100} loading="lazy" /> */}
                  {item.type === "video" ? (
                    <video
                      src={item.img}
                      autoPlay
                      loop
                      muted
                      playsInline
                      height={80}
                      width={100}
                      className="object-contain"
                    />
                  ) : (
                    <img
                      src={item.img}
                      alt={item.label}
                      height={80}
                      width={100}
                      loading="lazy"
                      className="object-contain"
                    />
                  )}

                </div>
                <p className="ropeway-title text-center w-full text-white stroke-text ">
                  {item.label}
                </p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default RopewaySlider;
