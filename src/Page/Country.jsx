import { useEffect, useState } from "react";
import { getCountry } from "../Services/Api";
import { useNavigate } from "react-router";

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
    <div>
      <input
        type="text"
        placeholder="Search country..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <div>
        {searchCountry.length > 0 ? (
          searchCountry.map((item) => (
            <button
              key={item.names.common}
              onClick={() => handleClick(item)}
            >
              {item.names.common}
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