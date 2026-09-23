import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { getWeather } from "../Services/Api";
import { FavoriteContext } from "../Context/Favorite";
function CountryDetail() {
  const [weather, setWeather] = useState(null);
  const location = useLocation();

  const selectedCountry = location.state;

  const { favorite, addFavorite, showLoginModal, setShowLoginModal } =
    useContext(FavoriteContext);

  const isFavorite = favorite.some((item) => {
    return (
      item.coordinates &&
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

  function handleFavoriteClick() {
    if (!showLoginModal) {
      addFavorite(selectedCountry);
    }
    if (!isFavorite && showLoginModal) {
      document.getElementById("my_modal_1").showModal();
    }
  }
  return (
    <div className=" text-black h-full overflow-y-hidden">
      <div className="flex w-full h-screen items-center justify-center overflow-hidden relative flex-col">
        <img
          src="Whole_world_-_land_and_oceans.jpg"
          className="
             absolute 
             w-full 
             h-120
              top-0
             object-cover
            object-center
              [clip-path:polygon(100%_0%,0%_0%,0.00%_37.13%,1.00%_36.92%,2.00%_37.05%,3.00%_37.53%,4.00%_38.33%,5.00%_39.44%,6.00%_40.83%,7.00%_42.47%,8.00%_44.32%,9.00%_46.33%,10.00%_48.45%,11.00%_50.63%,12.00%_52.81%,13.00%_54.95%,14.00%_56.99%,15.00%_58.88%,16.00%_60.57%,17.00%_62.02%,18.00%_63.19%,19.00%_64.07%,20.00%_64.61%,21.00%_64.82%,22.00%_64.69%,23.00%_64.22%,24.00%_63.41%,25.00%_62.30%,26.00%_60.91%,27.00%_59.27%,28.00%_57.42%,29.00%_55.41%,30.00%_53.30%,31.00%_51.12%,32.00%_48.93%,33.00%_46.79%,34.00%_44.76%,35.00%_42.87%,36.00%_41.18%,37.00%_39.73%,38.00%_38.55%,39.00%_37.68%,40.00%_37.13%,41.00%_36.92%,42.00%_37.05%,43.00%_37.53%,44.00%_38.33%,45.00%_39.44%,46.00%_40.83%,47.00%_42.47%,48.00%_44.32%,49.00%_46.33%,50.00%_48.45%,51.00%_50.63%,52.00%_52.81%,53.00%_54.95%,54.00%_56.99%,55.00%_58.88%,56.00%_60.57%,57.00%_62.02%,58.00%_63.19%,59.00%_64.07%,60.00%_64.61%,61.00%_64.82%,62.00%_64.69%,63.00%_64.22%,64.00%_63.41%,65.00%_62.30%,66.00%_60.91%,67.00%_59.27%,68.00%_57.42%,69.00%_55.41%,70.00%_53.30%,71.00%_51.12%,72.00%_48.93%,73.00%_46.79%,74.00%_44.76%,75.00%_42.87%,76.00%_41.18%,77.00%_39.73%,78.00%_38.55%,79.00%_37.68%,80.00%_37.13%,81.00%_36.92%,82.00%_37.05%,83.00%_37.53%,84.00%_38.33%,85.00%_39.44%,86.00%_40.83%,87.00%_42.47%,88.00%_44.32%,89.00%_46.33%,90.00%_48.45%,91.00%_50.63%,92.00%_52.81%,93.00%_54.95%,94.00%_56.99%,95.00%_58.88%,96.00%_60.57%,97.00%_62.02%,98.00%_63.19%,99.00%_64.07%,100.00%_64.61%)]      "
        />
        <div>
          <h1>{selectedCountry.names.common}</h1>
          <p>{selectedCountry.subregion}</p>
          {/* <p>{selectedCountry.capitals.name}</p> */}
        </div>
        {weather && (
          <div>
            <p>Temperature: {weather.current.temperature_2m}</p>
            <p>Wind: {weather.current.wind_speed_10m}</p>
            <p>Weather Code: {weather.current.weather_code}</p>
          </div>
        )}
        <button onClick={() => handleFavoriteClick()}>
          {isFavorite ? <p>like</p> : <p>dont like</p>}

          <div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Login Required</h3>
                <p className="py-4">login please</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn"
                      onClick={() => setShowLoginModal(false)}
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </button>
      </div>
    </div>
  );
}
export default CountryDetail;
