import { createContext, useState } from "react";
// import { useParams } from "react-router";
// import { getWeather } from "../Services/Api";
const FavoriteContext = createContext();

function Favorite({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  function addFavorite(country) {
    const isFavorite = favorites.some((item) => {
      return (
        item.coordinates &&
        country.coordinates &&(
        item.coordinates.lat === country.coordinates.lat &&
        item.coordinates.lng === country.coordinates.lng)
      );
    });
    if (isFavorite) {
      const newFavorite = favorites.filter((item) => {
        return (
          item.coordinates &&
            country.coordinates &&(
            item.coordinates.lat !== country.coordinates.lat ||
          item.coordinates.lng !== country.coordinates.lng)
        );
      });
      setFavorites(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(newFavorite));
    } else {
      const newFavorite = [...favorites, country];
      setFavorites(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(newFavorite));
    }
  }

  return (
    <div>
      <FavoriteContext.Provider value={{ favorites, addFavorite }}>
        {children}
      </FavoriteContext.Provider>
    </div>
  );
}
export { FavoriteContext };
export default Favorite;
