import Logo from "../../assets/images/icons/app-logo.webp"
import IOS from "../../assets/images/icons/ios-icon.webp"
import Android from "../../assets/images/icons/playstore-icon.webp"
import { navigate } from "../../helper/Navigate"
import ButtonPrimary from "../controls/ButtonPrimary"
const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between py-[10px] bg-[var(--bg-primary)] text-white side-space">
        <h1><a href="/" className="appLogo" onClick={(e) => {e.preventDefault();navigate("/");}}>
          <img src={Logo} height={30} width={150} alt={'app logo'} />
        </a>
        </h1>
        <ButtonPrimary className="hidden md:flex" />
        <div className="flex items-center justify-center gap-[20px] md:hidden android-ios">
          <a href="https://apps.apple.com/" target="_blank" rel="noopener noreferrer"><img src={IOS} height={30} width={30} alt={'ios'} /></a>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer"><img src={Android} height={30} width={30} alt={'play-store'} /></a>
        </div>
      </div>
    </header>
  )
}

export default Header