import { useContext } from "react";
import { FavoriteContext } from "../Context/Favorite";
import { Link } from "react-router";
function FavePage(country) {
  const { favorite, addFavorite } = useContext(FavoriteContext);
console.log("first item:", favorite[0]);
console.log("country name:", favorite[0].name);  return (
    <div>
      {favorite.length > 0 ? (
        favorite.map((item) => {
          return (
            <div key={item.names.common}>
              <Link to="/CountryDetail" key={item.names.common} state={item}>
                {item.names.common}
              </Link>
              <button onClick={() => addFavorite(item)}></button>
            </div>
          );
        })
      ) : (
        <div>nothing found</div>
      )}
    </div>
  );
}
export default FavePage;
