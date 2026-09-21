import { useContext } from "react";
import { FavoriteContext } from "../Context/Favorite";
import { Link } from "react-router";
function FavePage(country) {
  const { favorites,addFavorite } = useContext(FavoriteContext);

  return (
    <div>
      {favorites.length > 0 ? (
        favorites.map((item) => {
          return (
            <div  key={item.names.common}> 
              <Link to="/CountryDetail" key={item.names.common} state={item}>
                {item.names.common}
              </Link>
              <button onClick={()=>addFavorite(item)}></button>
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
