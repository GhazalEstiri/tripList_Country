import { createContext, useState,useContext } from "react";
// import { useParams } from "react-router";
// import { getWeather } from "../Services/Api";
import { loginContext } from "../Context/AuthContext";

const FavoriteContext = createContext();

function Favorite({ children }) {
  const { user } = useContext(loginContext);
  const [favorite, setFavorite] = useState(() => {
    return JSON.parse(localStorage.getItem("favorite")) || [];
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  function addFavorite(country) {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    const isFavorite = favorite.some((item) => {
      return (
        item.latlng &&
        country.latlng &&
        item.latlng[0] === country.latlng[0] &&
        item.latlng[1] === country.latlng[1]
      );
    });
    if (isFavorite) {
      const newFavorite = favorite.filter((item) => {
        return (
          item.latlng &&
          country.latlng &&
          (item.latlng[0] !== country.latlng[0] ||
            item.latlng[1] !== country.latlng[1])
        );
      });
      setFavorite(newFavorite);
      localStorage.setItem("favorite", JSON.stringify(newFavorite));
    } else {
      const newFavorite = [...favorite, country];
      setFavorite(newFavorite);
      localStorage.setItem("favorite", JSON.stringify(newFavorite));
    }
  }

  return (
    <div>
      <FavoriteContext.Provider
        value={{ favorite, addFavorite, showLoginModal,setShowLoginModal }}
      >
        {children}
      </FavoriteContext.Provider>
    </div>
  );
}
export { FavoriteContext };
export default Favorite;
