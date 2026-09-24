import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { getWeather } from "../Services/Api";
import { FavoriteContext } from "../Context/Favorite";
import {
  Heart,
  MapPin,
  Landmark,
  UserGroup,
  Scan,
  Languages,
  BadgeDollarSign,
} from "lucide-react";
function CountryDetail() {
  const [weather, setWeather] = useState(null);
  const location = useLocation();

  const selectedCountry = location.state;

  const { favorite, addFavorite, showLoginModal, setShowLoginModal } =
    useContext(FavoriteContext);

  const isFavorite = favorite.some((item) => {
    return (
      item.latlng &&
      item.latlng[0] === selectedCountry.latlng[0] &&
      item.latlng[1] === selectedCountry.latlng[1]
    );
  });

  async function handleClickCountry(selectedCountry) {
    console.log(selectedCountry);

    const latitude = selectedCountry.latlng[0];
    const longitude = selectedCountry.latlng[1];
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
             h-95
             top-0
             object-cover
             object-center
             [clip-path:polygon(100%_0%,0%_0%,0.00%_37.13%,1.00%_36.92%,2.00%_37.05%,3.00%_37.53%,4.00%_38.33%,5.00%_39.44%,6.00%_40.83%,7.00%_42.47%,8.00%_44.32%,9.00%_46.33%,10.00%_48.45%,11.00%_50.63%,12.00%_52.81%,13.00%_54.95%,14.00%_56.99%,15.00%_58.88%,16.00%_60.57%,17.00%_62.02%,18.00%_63.19%,19.00%_64.07%,20.00%_64.61%,21.00%_64.82%,22.00%_64.69%,23.00%_64.22%,24.00%_63.41%,25.00%_62.30%,26.00%_60.91%,27.00%_59.27%,28.00%_57.42%,29.00%_55.41%,30.00%_53.30%,31.00%_51.12%,32.00%_48.93%,33.00%_46.79%,34.00%_44.76%,35.00%_42.87%,36.00%_41.18%,37.00%_39.73%,38.00%_38.55%,39.00%_37.68%,40.00%_37.13%,41.00%_36.92%,42.00%_37.05%,43.00%_37.53%,44.00%_38.33%,45.00%_39.44%,46.00%_40.83%,47.00%_42.47%,48.00%_44.32%,49.00%_46.33%,50.00%_48.45%,51.00%_50.63%,52.00%_52.81%,53.00%_54.95%,54.00%_56.99%,55.00%_58.88%,56.00%_60.57%,57.00%_62.02%,58.00%_63.19%,59.00%_64.07%,60.00%_64.61%,61.00%_64.82%,62.00%_64.69%,63.00%_64.22%,64.00%_63.41%,65.00%_62.30%,66.00%_60.91%,67.00%_59.27%,68.00%_57.42%,69.00%_55.41%,70.00%_53.30%,71.00%_51.12%,72.00%_48.93%,73.00%_46.79%,74.00%_44.76%,75.00%_42.87%,76.00%_41.18%,77.00%_39.73%,78.00%_38.55%,79.00%_37.68%,80.00%_37.13%,81.00%_36.92%,82.00%_37.05%,83.00%_37.53%,84.00%_38.33%,85.00%_39.44%,86.00%_40.83%,87.00%_42.47%,88.00%_44.32%,89.00%_46.33%,90.00%_48.45%,91.00%_50.63%,92.00%_52.81%,93.00%_54.95%,94.00%_56.99%,95.00%_58.88%,96.00%_60.57%,97.00%_62.02%,98.00%_63.19%,99.00%_64.07%,100.00%_64.61%)]      "
        />
        <div className="flex w-full flex-row justify-around items-center  mt-60 gap-50">
          <section className="flex flex-col justify-center items-center gap-10  bg-[#f8fafb]  p-10 rounded-2xl">
            <div className="flex flex-row justify-center items-center gap-10">
              <img src={selectedCountry.flags.png} alt="" className="w-30" />
              <h1 className="font-bold text-3xl text-[#1D4362]">
                {selectedCountry.name}
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-10 ">
              <div className="flex flex-row justify-center items-center gap-5">
                <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                  <MapPin className="text-[#084484]" />
                </p>
                <div className="flex flex-col justify-center gap-1 text-[#084484] ">
                  <p className="flex flex-row font-bold">region</p>
                  <p className="font-medium">{selectedCountry.region}</p>
                </div>
              </div>

              <div className="flex flex-row justify-center items-center gap-5">
                <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                  <Landmark className="text-[#084484]" />
                </p>
                <div className="flex flex-col justify-center gap-1  text-[#084484]">
                  <p className="flex flex-row font-bold">capital</p>
                  <p className="font-medium">{selectedCountry.capital}</p>
                </div>
              </div>

              <div className="flex flex-row justify-center items-center gap-5">
                <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                  <UserGroup className="text-[#084484]" />
                </p>
                <div className="flex flex-col justify-center gap-1   text-[#084484]">
                  <p className="flex flex-row font-bold">population</p>
                  <p className="font-medium">{selectedCountry.population}</p>
                </div>
              </div>

              <div className="flex flex-row justify-center items-center gap-5">
                <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                  <Scan className="text-[#084484]" />
                </p>
                <div className="flex flex-col justify-center gap-1  text-[#084484]">
                  <p className="flex flex-row  font-bold">area</p>
                  <p className="font-medium">{selectedCountry.area} km</p>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-5">
                <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                  <Languages className="text-[#084484]" />
                </p>
                <div className="flex flex-col justify-center gap-1  text-[#084484]">
                  <p className="flex flex-row  font-bold">languages</p>
                  <p className="font-medium">{selectedCountry.languages[0].name}</p>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-5">
                <p className="bg-[#e4f0f7] rounded-full w-10 h-10 flex justify-center items-center">
                  <BadgeDollarSign className="text-[#084484]" />
                </p>
                <div className="flex flex-col justify-center gap-1  text-[#084484]">
                  <p className="flex flex-row  font-bold">currencies</p>
                  <p className="font-medium"> {selectedCountry.currencies[0].name}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            {weather && (
              <div className="flex mt-5 flex-col items-start gap-2">
                <p className="font-bold text-xl">
                  <span className="text-[#1d4362] font-bold text-2xl">
                    Temperature:
                  </span>
                  {weather.current.temperature_2m}
                </p>
                <p className="font-bold text-xl">
                  <span className="text-[#1d4362] font-bold text-2xl">
                    Wind:{" "}
                  </span>
                  {weather.current.wind_speed_10m}
                </p>
                <p className="font-bold text-xl">
                  <span className="text-[#1d4362] font-bold text-2xl">
                    Weather Code:
                  </span>
                  {weather.current.weather_code}
                </p>
              </div>
            )}
          </section>
        </div>
        <button onClick={() => handleFavoriteClick()} className="flex mt-10">
          {isFavorite ? <Heart fill /> : <Heart />}

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
