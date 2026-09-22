import { Link } from "react-router";
import { MapPinned,CircleUserRound } from "lucide-react";
function Navbar() {
  return (
    <div className="navbar bg-base-100 h-1 w-[90%] flex mx-auto border-b-2 border-[#1d4362]">
      <div className="navbar-start">
        <Link
          to="/"
          className="text-xl font-bold text-[#1d4362] flex justify-center gap-3"
        >
          <MapPinned className="text-[#1d4362]" /> Wanderly
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-2">
          <li>
            <Link to="/Countries">Countries</Link>
          </li>

          <li>
            <Link to="/Favorite">Favorite</Link>
          </li>

          <li>
            <a>About</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <Link
          to="/Login"
          className="btn btn-sm bg-[#1d4362] text-white hover:bg-[#6084a1] rounded-full  w-10 h-10 min-h-10 p-0 flex justify-center place-items-center"
        >
          <CircleUserRound />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
