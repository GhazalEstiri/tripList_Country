import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { getWeather } from "../Services/Api";
import { FavoriteContext } from "../Context/Favorite";
function CountryDetail() {
  const [weather, setWeather] = useState(null);
  const location = useLocation();

  const selectedCountry = location.state;

  const { favorites, addFavorite } = useContext(FavoriteContext);
  const isFavorite = favorites.some((item) => {
    return (
      item.coordinates.lat === selectedCountry.coordinates.lat &&
      item.coordinates.lng === selectedCountry.coordinates.lng
    );
  });

  async function handleClickCountry(selectedCountry) {
    console.log(selectedCountry);

    const latitude = selectedCountry.coordinates.lat;
    const longitude = selectedCountry.coordinates.lng;
    console.log(selectedCountry);

    const weatherData = await getWeather(latitude, longitude);
    setWeather(weatherData);
  }
  useEffect(() => {
    handleClickCountry(selectedCountry);
  }, [selectedCountry]);
  return (
    <div>
      <div>
        {weather && (
          <div>
            <p>Temperature: {weather.current.temperature_2m}</p>
            <p>Wind: {weather.current.wind_speed_10m}</p>
            <p>Weather Code: {weather.current.weather_code}</p>
          </div>
        )}
      </div>
      <button onClick={() => addFavorite(selectedCountry)}>
        {isFavorite ? <p>like</p> : <p>dont like</p>}
      </button>
    </div>
  );
}
export default CountryDetail;
