import Navbar from "./Navbar";
import { getCountry } from "../Services/Api";
import { initialState, tripReducer } from "../Reducer/tripReducer";
import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router";
// import { useNavigate, useParams, Link } from "react-router";
function MyTrip({ state, dispatch }) {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedcountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [companion, setCompanion] = useState([""]);
  const [budget, setBudget] = useState("");

  // const navigate = useNavigate();
  // const { id } = useParams();

  async function getApi() {
    const limit = 250;
    const offset = 0;
    const countryData = await getCountry(limit, offset);
    setCountry(countryData);
  }
  useEffect(() => {
    getApi();
  }, []);

  function addTrip() {
    const newTrip = {
      id: Date.now(),
      country: selectedCountry,
      category: selectedCategory,
      companion: companion,
      budget: Number(budget),
      expenses: [],
    };
    dispatch({
      type: "ADD_TRIP",
      payload: newTrip,
    });

    setSelectedcountry("");
    setSelectedCategory("");
    setCompanion([""]);
    setBudget("");
  }

  console.log(state);
  return (
    <section>
      <Navbar />
      <section>
        {state.trip.length > 0 ? (
          state.trip.map((trip) => {
            return (
              <Link
                className="card bg-base-200 p-4 mt-4"
                key={trip.id}
                to={`/TripDetail/${trip.id}`}
              >
                <p>{trip.country}</p>
                <p>{trip.category}</p>
                <p>{trip.companion.join(", ")}</p>
                <p>{trip.budget}</p>
              </Link>
            );
          })
        ) : (
          <p>nothing here</p>
        )}
      </section>
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Trip
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div>
              <select
                name="country"
                id="country"
                className="w-50"
                value={selectedCountry}
                onChange={(e) => setSelectedcountry(e.target.value)}
              >
                <option value="">defult</option>
                {country.length > 0 ? (
                  country.map((item) => {
                    return (
                      <option
                        value={item.index}
                        key={item.index}
                        className="w-50 h-30"
                      >
                        {item.name}
                      </option>
                    );
                  })
                ) : (
                  <option value="empty">empty</option>
                )}
              </select>
            </div>
            <div>
              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Tickets">Tickets</option>
                <option value="Hotel">Hotel</option>
                <option value="Food">Food</option>
                <option value="Leisure">Leisure</option>
                <option value="Transportation">Transportation</option>
              </select>
            </div>
            <div className="join">
              {companion.length > 0 &&
                companion.map((person, index) => {
                  return (
                    <input
                      className="input join-item"
                      placeholder="Companion"
                      value={person}
                      key={index}
                      onChange={(e) => {
                        const newCompanion = companion.map((item, i) => {
                          if (i === index) {
                            return e.target.value;
                          }
                          return item;
                        });
                        setCompanion(newCompanion);
                      }}
                    />
                  );
                })}

              <button
                className="btn join-item rounded-r-full"
                onClick={() => setCompanion([...companion, ""])}
              >
                +
              </button>
            </div>
            <div className="join">
              <input
                className="input join-item"
                placeholder="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <button className="btn join-item rounded-r-full">+</button>
            </div>

            <div className="modal-action">
              <form
                method="dialog"
                onSubmit={(e) => {
                  e.preventDefault();
                  addTrip();
                  document.getElementById("my_modal_1").close();
                }}
              >
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Add Trip</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </section>
  );
}
export default MyTrip;
