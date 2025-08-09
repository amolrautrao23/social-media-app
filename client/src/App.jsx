import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor"
import Footer from "./components/Footer"
import Header from "./components/header/header"
import Home from "./pages/Home";
import TermsAndCondition from "./pages/TermsAndCondition";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const App = () => {
const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);
   const renderPage = () => {
    switch (path) {
      case "/":
        return <Home />;
      case "/terms-and-conditions/":
        return <TermsAndCondition />;
      case "/privacy-policy/":
        return <Privacy />;
      default:
        return <NotFound />;
    }
  };
  return (
   <>
    <Header/>
    {renderPage()}    
    <CustomCursor/>
    <Footer />
   </>
  )
}

export default App