import Navbar from "./Navbar";
import { getCountry } from "../Services/Api";
import { initialState, tripReducer } from "../Reducer/tripReducer";
import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router";
import { UserRoundGroup, Wallet } from "lucide-react";
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
    try {
      const limit = 250;
      const offset = 0;
      const countryData = await getCountry(limit, offset);
      console.log(countryData);
      setCountry(countryData);
    } catch (error) {
      console.log("API ERROR:", error);
    }
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
        totalBudget: Number(budget),

    };
    dispatch({
      type: "ADD_TRIP",
      payload: newTrip,
    });

    setSelectedcountry("");
    setSelectedCategory("");
    setCompanion([""]);
    setBudget("");
    console.log("category:", selectedCategory);
  }

  function deleteCard(tripId) {
    dispatch({
      type: "DELETE_CARD",
      payload: tripId,
    });
  }

  console.log(state);
  return (
    <section className="w-full flex flex-col">
      <Navbar />

      <section className="flex flex-col gap-10 md:flex-row  justify-between mt-10 w-[90%] mx-auto items-center lg:items-start">
        <div className=" flex gap-3 flex-col">
          <p className="text-[#9EB3C6] font-bold tracking-[3px]">MY TRIPS</p>
          <p className="text-[#112C43] text-4xl font-bold">Your Travel Plans</p>
          <p className="text-[#6486AA] font-bold text-4xl tracking-[3px] font-['Caveat']">
            Big dreams, more trips.
          </p>
          <p className="text-[#4b6581] text-lg font-medium">
            Keep track of your trips, manage your budget <br />
            and collect unforgettable moments.
          </p>
        </div>

        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn bg-[#144970] text-white text-lg rounded-xl p-5"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <p
              className="
            flex flex-row items-center place-items-center justify-center mx-auto gap-2 "
            >
              <span className=" ">+</span> Add Trip
            </p>
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
                          value={item.name}
                          key={item.name}
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
                  <option value="">Select category</option>
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
      <div className="flex flex-row  ">
        <section className="bg-white w-[95%] grid  grid-cols-1 md:grid-cols-2  xl:grid-cols-3 p-15 gap-10 ">
          {/* {state.trip.length > 0 ? (
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
        )} */}
          {/* flex flex-row w-105 gap-5 justify-center mt-20 */}
          {state.trip.length > 0 ? (
            state.trip.map((trip) => {
              return (
                <div className="flex flex-col">
                  <Link
                    className="card p-4 mt-4 w-full"
                    key={trip.id}
                    to={`/TripDetail/${trip.id}`}
                  >
                    <div className="card w-65 md:w-80 lg:w-96 bg-base-100 shadow-sm">
                      <div className="card-body">
                        <span className="badge badge-lg  bg-[#EAF3F8] text-[#1D4362] rounded-2xl p-4">
                          {trip.category}
                        </span>
                        <div className="flex justify-between">
                          <h2 className="text-3xl font-bold text-[#1D4362] line-clamp-1">
                            {trip.country}
                          </h2>
                          {/* <span className="text-xl">{trip.budget}</span> */}
                        </div>
                        <ul className="mt-6 flex flex-col gap-2 text-xs">
                          <li className=" flex flex-row items-center gap-5 text-[#668096]">
                            <span>
                              <UserRoundGroup />
                            </span>
                            <span>{trip.companion.join(", ")}</span>
                          </li>
                          <li className=" flex flex-row items-center gap-5 text-[#668096]">
                            <span>
                              <Wallet />
                            </span>
                            <span>{trip.budget}</span>
                          </li>
                        </ul>
                        <div className="mt-6">
                          <button className="btn btn-primary bg-[#144970] btn-block shadow-[#144970] shadow-sm">
                            More Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button
                    className="btn btn-primary bg-[#144970] btn-block shadow-[#144970] shadow-sm w-20 mx-auto"
                    onClick={() => deleteCard(trip.id)}
                  >
                    delete
                  </button>
                </div>
              );
            })
          ) : (
            <p>nothing here</p>
          )}
        </section>
      </div>
    </section>
  );
}
export default MyTrip;
