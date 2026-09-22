import { createContext, useState } from "react";
// import { useParams } from "react-router";
// import { getWeather } from "../Services/Api";
const FavoriteContext = createContext();

function Favorite({ children }) {
  const [favorite, setFavorite] = useState(() => {
    return JSON.parse(localStorage.getItem("favorite")) || [];
  });

  function addFavorite(country) {
    const isFavorite = favorite.some((item) => {
      return (
        item.coordinates &&
        country.coordinates &&
        item.coordinates.lat === country.coordinates.lat &&
        item.coordinates.lng === country.coordinates.lng
      );
    });
    if (isFavorite) {
      const newFavorite = favorite.filter((item) => {
        return (
          item.coordinates &&
          country.coordinates &&
          (item.coordinates.lat !== country.coordinates.lat ||
            item.coordinates.lng !== country.coordinates.lng)
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
      <FavoriteContext.Provider value={{ favorite, addFavorite }}>
        {children}
      </FavoriteContext.Provider>
    </div>
  );
}
export { FavoriteContext };
export default Favorite;
