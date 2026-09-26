// import { Link } from "react-router";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
function Home() {
  // const searchCountry = country.filter((item) =>
  //   item.names.common.toLowerCase().includes(searchInput.toLowerCase()),
  // );
  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Navbar />
      <Hero />
      {/* <Footer/> */}
    </div>
  );
}
export default Home;
