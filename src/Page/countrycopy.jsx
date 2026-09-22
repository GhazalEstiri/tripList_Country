import { useEffect, useState } from "react";
import { getCountry } from "../Services/Api";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

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
    item.names.common
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F9F8]">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-10 pb-8">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-[28px] bg-[#EAF5FA] px-8 py-10 md:px-12 relative overflow-hidden">

            {/* Decorative circle */}
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
                Explore countries, discover new cultures and save the
                places you want to visit.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Search + Header */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-[#17324A]">
                Countries
              </h2>

              <p className="mt-1 text-sm text-[#718396]">
                {searchCountry.length} destinations available
              </p>
            </div>

            {/* Search */}
            <label className="input flex w-full items-center gap-3 rounded-2xl border-[#E3EAF0] bg-white shadow-sm md:w-80">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5 text-[#718396]"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>

              <input
                type="text"
                placeholder="Search country..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="grow"
              />

              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="text-[#718396] hover:text-[#17324A]"
                >
                  ✕
                </button>
              )}

            </label>

          </div>

        </div>
      </section>

      {/* Countries */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl">

          {searchCountry.length > 0 ? (

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {searchCountry.map((item) => (

                <button
                  key={item.names.common}
                  onClick={() => handleClick(item)}
                  className="group overflow-hidden rounded-3xl bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">

                    <img
                      src={
                        item.flags?.png ||
                        item.flags?.svg
                      }
                      alt={item.names.common}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Favorite */}
                    <div className="absolute right-3 top-3">

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm backdrop-blur">
                        ♡
                      </span>

                    </div>

                  </div>

                  {/* Content */}
                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h3 className="text-lg font-bold text-[#17324A]">
                          {item.names.common}
                        </h3>

                        <p className="mt-1 text-sm text-[#718396]">
                          {item.capital?.[0] || "No capital"}
                        </p>
                      </div>

                      <span className="rounded-full bg-[#EAF5FA] px-3 py-1 text-xs font-medium text-[#2E6F9E]">
                        Explore
                      </span>

                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#E3EAF0] pt-4">

                      <span className="text-xs text-[#718396]">
                        Population
                      </span>

                      <span className="text-sm font-semibold text-[#17324A]">
                        {item.population
                          ? item.population.toLocaleString()
                          : "—"}
                      </span>

                    </div>

                  </div>

                </button>

              ))}

            </div>

          ) : (

            /* Nothing found */
            <div className="flex min-h-[350px] items-center justify-center rounded-3xl bg-white shadow-sm">

              <div className="text-center">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF5FA] text-2xl">
                  🌍
                </div>

                <h3 className="text-xl font-bold text-[#17324A]">
                  Nothing found
                </h3>

                <p className="mt-2 text-sm text-[#718396]">
                  Try searching for another country.
                </p>

                <button
                  onClick={() => setSearchInput("")}
                  className="btn btn-primary mt-5 rounded-xl"
                >
                  Show all countries
                </button>

              </div>

            </div>

          )}

        </div>
      </section>
    </div>
  );
}

export default Countries;