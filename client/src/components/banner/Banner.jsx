import { Helmet } from 'react-helmet';
import BannerImage from '../../assets/images/banner-image.webp';

const Banner = () => {
  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={BannerImage} type="image/webp" />
      </Helmet>
      <img
        src={BannerImage}
        height={1300}
        width={600}
        className="w-full h-auto"
        alt="app banner"
        fetchpriority="high"
      />
    </>
  );
};

export default Banner;
