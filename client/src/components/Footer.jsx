import { navigate } from "../helper/Navigate";

const Footer = () => {
  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer>
      <div className="footer-inner side-space">
        <p>Copyright © 2025. TurboKIDS All Rights Reserved, Powered by <a href="https://www.hatsoffdigital.com/" className="hover:underline" target="_blank"> Hats-Off</a></p>
        <div className="foot-contact-icon">
           <a href="tel:+917888001062" className="hover:underline">
            +(91) 78880 01062
          </a>
          {" | "}
          <a href="mailto:contact@kitmek.com" className="hover:underline">
            contact@kitmek.com
          </a>
        </div>
        <p className="terms">
          <a href="/terms-and-conditions/" onClick={(e) => handleClick(e, "/terms-and-conditions/")} className="hover:underline">
            Terms & Conditions
          </a>
          {" | "}
          <a href="/privacy-policy/" onClick={(e) => handleClick(e, "/privacy-policy/")} className="hover:underline">
            Privacy Policy
          </a>
        </p>

      </div>
    </footer>
  )
}

export default Footer