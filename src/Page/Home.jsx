import { useEffect, useState } from "react";
import { getCountry } from "../Services/Api";
import { useNavigate, Link } from "react-router";
function Home() {
  const [country, setCountry] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const Navigate = useNavigate();
  async function getApi() {
    const countryData = await getCountry();
    setCountry(countryData);
  }
  function handleClick(item) {
    Navigate("/CountryDetail", {
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
    <div className="flex flex-col">
      <div className="flex gap-4 flex-col">
        {searchCountry.length > 0 ? (
          searchCountry.map((item) => {
            return (
              <button key={item.names.common} onClick={() => handleClick(item)}>
                {item.names.common}
              </button>
            );
          })
        ) : (
          <p>nothimg found</p>
        )}
      </div>

      <button>
        <Link to="/Favorite">favoriiite</Link>
      </button>
      <input
        type="text"
        placeholder=" search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div></div>
    </div>
  );
}
export default Home;
