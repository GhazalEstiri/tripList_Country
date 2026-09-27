import Navbar from "./Navbar";
import { getCountry } from "../Services/Api";
import { initialState, tripReducer } from "../Reducer/tripReducer";
import { useEffect, useState, useReducer } from "react";
function MyTrip() {
  const [country, setCountry] = useState([]);
  const [selectedCountry,setSelectedcountry]=useState("") 
  const [selectedCategory,setSelectedCategory]=useState("")
  const [companion,setCompanion]=useState([])
  const [budget, setBudget]=useState("")



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
      country: "france",
      category: "Food",
      Companion: ["sara"],
      budget: 2000,
    };
    dispatch({
      type: "ADD_TRIP",
      payload: newTrip,
    });
  }

  const [state, dispatch] = useReducer(tripReducer, initialState);
  console.log(state);
  return (
    <section>
      <Navbar />
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
              <select name="country" id="country" className="w-50">
                <option value="defult">defult</option>
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
              <select name="category" id="category">
                <option value="Tickets">Tickets</option>
                <option value="Hotel">Hotel</option>
                <option value="Food">Food</option>
                <option value="Leisure">Leisure</option>
                <option value="Transportation">Transportation</option>
              </select>
            </div>
            <div className="join">
              <input className="input join-item" placeholder="Companion" />
              <button className="btn join-item rounded-r-full">+</button>
            </div>
            <div className="join">
              <input
                className="input join-item"
                placeholder="budget"
                type="number"
              />
              <button className="btn join-item rounded-r-full">+</button>
            </div>

            <div className="modal-action">
              <form method="dialog" onSubmit={() => addTrip()}>
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
