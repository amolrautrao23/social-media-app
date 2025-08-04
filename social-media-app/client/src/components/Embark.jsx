import SectionHeading from './controls/SectionHeading'
import Charecter from '../assets/images/icons/embark-charecter.webp'
import QR from '../assets/images/embark/qr.webp'
import Appstore from '../assets/images/embark/app-store.webp'
import Playstore from '../assets/images/embark/play-store.webp'
import Windows from '../assets/images/embark/windows.webp'

const Embark = () => {
    return (
        <section className='embark-section side-space section-top-space'>
            <div className="embark-container">
                <img src={Charecter} className="embark-charecter" height={30} width={30} alt={"embark charecter"} loading="lazy" />
                <div className="embark-contents">
                    <SectionHeading className={'!mb-[10px]'}>Embark on an Exciting Journey Today!</SectionHeading>
                    <p>Get ready to transform the way your child learns! TurboKids offers a one-of-a-kind digital school experience through fun avatars, gamified lessons, and a world-class curriculum. Whether you&apos;re on Android or iOS, just scan the QR code or click the download link to begin. With every tap, your child steps into a world of excitement, exploration, and rewarding learning — right from your mobile device.</p>
                    <h3 className='!my-[10px] text-[var(--bg-primary)] capitalize'>Scan or click to Download App on your mobile</h3>
                    <div className="download-options">
                        <div className="qr-img"><img src={QR} height={145} width={145} alt="qr code" loading="lazy"/></div>
                        <div className="apps-opt">
                        <a href="https://apps.apple.com/in/app/turbokids-learning-redefined/id6737956435?platform=ipad" target="_blank" rel="noopener noreferrer"><img src={Appstore} height={40} width={135} alt="App store" loading="lazy" /></a>
                        <a href="https://play.google.com/store/apps/details?id=com.kitmek.TurboKID" target="_blank" rel="noopener noreferrer"><img src={Playstore} height={40} width={135} alt="Play store" loading="lazy" /></a>
                        </div>
                        <div className='windows-icon'>
                        <img src={Windows} height={40} width={135} alt="windows" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Embark