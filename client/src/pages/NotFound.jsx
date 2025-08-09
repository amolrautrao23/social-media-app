import NotFoundImage from "../assets/images/icons/404.webp";
import buttonBorder from "../assets/images/icons/button-border.svg";
import { navigate } from "../helper/Navigate"
const NotFound = () => {
  return (
    <div className="bg-yellow-50 flex flex-col items-center justify-center text-center side-space section-space not-found-page">
      <img
        src={NotFoundImage}
        alt="Page Not Found"
        className="w-[120px] lg:w-[180px] h-auto mb-6"
      />
      <h1 className="font-bold text-pink-500">Oops!</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
        We couldn’t find that page.
      </h2>
      <p className="text-lg text-gray-600 max-w-md mb-6 text-center">
        It looks like the page you&rsquo;re looking for went on an adventure!
      </p>
        <a href="/" className={"button-primary w-fit align-middle mx-auto"}
              style={{
                backgroundImage: `url(${buttonBorder})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }} onClick={e => {e.preventDefault();navigate("/");}}> Go Back Home</a>
    </div>
  );
};

export default NotFound;
