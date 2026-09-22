import { useEffect, useState } from "react";
import { getCountry } from "../Services/Api";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import { ChevronRight, Search } from "lucide-react";
function Countries() {
  const [country, setCountry] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  async function getApi() {
    const countryData = await getCountry();
    setCountry(countryData);
  }

  function handleClick(item) {
    navigate("/CountryDetail", {
      state: item,
    });
  }

  useEffect(() => {
    getApi();
  }, []);

  const searchCountry = country.filter((item) =>
    item.names.common.toLowerCase().includes(searchInput.toLowerCase()),
  );

  return (
    <div className="flex  flex-col">
      <Navbar />
      <section className="px-6 pt-10 pb-8">
        <div className="mx-auto max-w-345">
          <div className="rounded-2xl bg-[#EAF5FA] px-8 py-10 md:px-12 relative overflow-hidden">

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#B9DDF2]/60" />

            <div className="relative z-10 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2E6F9E]">
                Explore the world
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-[#17324A] md:text-5xl">
                Discover your next
                <span className="text-[#2E6F9E]"> destination.</span>
              </h1>

              <p className="mt-4 max-w-xl text-[#718396]">
                Explore countries, discover new cultures and save the places you
                want to visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center px-15 py-5 rounded-2xl mx-auto mt-5 items-center gap-40 bg-base-100 w-[90%]">
        <div className="aura aura-dual flex justify-center">
          <div className="card bg-base-100 flex justify-center">
            <div className="card-body flex justify-center">
              <div className="card bg-base-100 rounded-box grid h-20 grow place-items-center justify-center">
                <h1 className="font-bold text-[#1d4362] text-2xl">countries</h1>
                <p className="text-[#1d4362ad] tracking-[0.25em]">
                  100 Destination available
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="card bg-base-100 rounded-box grid h-20 place-items-center">
          <div className="w-100 border-2 border-[#1d436286] rounded-2xl py-2 px-5 flex flex-row gap-6  bg-white">
            <Search className="text-[#1d436286]" />

            <input
              type="text"
              placeholder="Search country..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex outline-none placeholder:text-[#1d4362ad]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-7 p-18 ">
        {searchCountry.length > 0 ? (
          searchCountry.map((item) => (
            <button
              key={item.names.common}
              onClick={() => handleClick(item)}
              className="bg-[#F7F9F8] shadow-xl flex p-10 font-bold text-[#1d4362] text-sm cursor-pointer rounded-2xl"
            >
              <div className="flex w-200 flex-col gap-8 justify-between">
                <div key={item.flag.url_png}>
                  <img src={item.flag.url_png} alt={item.names.common} />
                </div>
                <div className="flex flex-row justify-between items-baseline w-full">
                  <p>{item.names.common}</p>
                  <div className=" flex justify-center items-center bg-[#E8F4FD] rounded-2xl p-2 text-sm text-[#1d4362] w-40">
                    More details <ChevronRight />
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p>Nothing found</p>
        )}
      </div>
    </div>
  );
}

export default Countries;
