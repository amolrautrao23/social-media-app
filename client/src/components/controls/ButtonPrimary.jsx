import { useEffect, useState } from "react";
import buttonBorder from "../../assets/images/icons/button-border.svg";
import ArrowDown from "../../assets/images/icons/arrow-down.svg";

const ButtonPrimary = ({ isCenter = false,title="DOWNLOAD APP", className = "",arrow=true, ...props }) => {
  const [downloadLink, setDownloadLink] = useState("https://play.google.com/store/apps/details?id=com.kitmek.TurboKID");

  useEffect(() => {
    const getMobileOSLink = () => {
      const userAgent = navigator.userAgent || window.opera;

      // Check for iOS or macOS
      if (/iPad|iPhone|iPod|Macintosh/.test(userAgent) && !window.MSStream) {
        return "https://apps.apple.com/in/app/turbokids-learning-redefined/id6737956435?platform=ipad";
      }

      // Default: Android/others
      return "https://play.google.com/store/apps/details?id=com.kitmek.TurboKID";
    };

    setDownloadLink(getMobileOSLink());
  }, []);

  return (
    <a
      href={downloadLink}
      className={`button-primary w-fit align-middle ${isCenter ? "mx-auto" : ""} ${className}`}
      style={{
        backgroundImage: `url(${buttonBorder})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      target="_blank" rel="noopener noreferrer"
      {...props}
    >
      {title} {arrow && <ArrowDown />}
    </a>
  );
};

export default ButtonPrimary;
