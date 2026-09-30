import { useParams } from "react-router";
import { useState } from "react";
import Navbar from "./Navbar";
import { UserRoundGroup, Wallet, MapPin } from "lucide-react";
function TripDetail({ state, dispatch }) {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [companion, setCompanion] = useState([""]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  const trip = state.trip.find((item) => item.id === Number(id));
  if (!trip) {
    return <p>Trip not found</p>;
  }

  function addExpense() {
    if (editingExpense) {
      dispatch({
        type: "EDIT_ITEM",
        payload: {
          tripId: trip.id,
          expenseId: editingExpense.id,
          category: selectedCategory,
          amount: Number(amount),
          reason: reason,
          companion: companion,
        },
      });
      setEditingExpense(null);
    } else {
      dispatch({
        type: "ADD_EXPENSE",
        payload: {
          tripId: trip.id,
          category: selectedCategory,
          amount: Number(amount),
          reason: reason,
          companion: companion,
        },
      });
    }
    setReason("");
    setAmount("");
    setCompanion("");
    setSelectedCategory("");
  }
  function deleteItem(tripId, expenseId, amount) {
    dispatch({
      type: "DELETE_ITEM",

      payload: {
        tripId: tripId,
        expenseId: expenseId,
        amount: amount,
        budget: trip.budget,
      },
    });
  }
  function editeItem(expense) {
    setEditingExpense(expense);
    setAmount(expense.amount);
    setCompanion(expense.companion);
    setReason(expense.reason);
    setSelectedCategory(expense.category);
  }

  return (
    <section className="flex flex-col">
      <div>
        <Navbar />
      </div>
      <div>
        <div className="card w-[90%] flex justify-center items-center mx-auto shadow-sm mt-10 bg-[#FBFCFD]">
          <div className="card-body w-full flex justify-around">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold text-[#1D4362] line-clamp-1 flex flex-row items-center gap-3">
                <span>
                  <MapPin />
                </span>
                {trip.country}
              </h2>
              {/* <span className="badge badge-lg  bg-[#EAF3F8] text-[#1D4362] rounded-2xl p-4">
                {trip.category}
              </span> */}
              {/* <span className="text-xl">{trip.budget}</span> */}
            </div>
            <div className="flex flex-row justify-between">
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li className=" flex flex-row items-center gap-5 text-[#668096]">
                  <span>
                    <UserRoundGroup />
                  </span>
                  <span>{trip.companion.join(", ")}</span>
                </li>
              </ul>
              <div className=" flex flex-row items-center gap-5 text-[#668096]">
                <span>
                  <Wallet />
                </span>
                <span className="flex flex-col gap-2">
                  <span className="font-bold">Remaining Budget:</span>{" "}
                  <span>{trip.budget}</span>
                  <progress
                    className="progress w-56"
                    value={trip.budget}
                    max={trip.totalBudget}
                  ></progress>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-[90%] justify-center items-center mx-auto mt-20 gap-5">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
          />
          <input
            type="text"
            placeholder="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
          />
          <input
            type="text"
            placeholder="companion"
            value={companion}
            onChange={(e) => setCompanion(e.target.value)}
            className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
          />
          <div>
            <select
              name="category"
              id="category"
              value={selectedCategory}
              className="select [&::picker(select)]:max-h-30 w-50 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
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
          <button
            onClick={addExpense}
            className="w-70 h-12  p-2 rounded-xl bg-[#093775] text-white font-medium hover:bg-[#001f49] transition"
          >
            {editingExpense ? "Save" : "Add"}
          </button>
        </div>

        <div className="flex gap-5 flex-col w-[91%] mx-auto mt-20">
          {trip.expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex flex-row justify-between w-full gap-5"
            >
              <p className="w-60 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] text-sm flex justify-center items-center mx-auto">
                {expense.category}
              </p>
              <p className="w-92 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd]  text-sm flex justify-center items-center mx-auto">
                {expense.amount}
              </p>
              <p className="w-92 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd]  text-sm flex justify-center items-center mx-auto">
                {expense.reason}
              </p>
              <p className="w-92 h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd]  text-sm flex justify-center items-center mx-auto">
                {expense.companion}
              </p>
              <button
                onClick={() => deleteItem(trip.id, expense.id, expense.amount)}
                className="w-50 h-12  p-2 rounded-xl bg-[#093775] text-white font-medium hover:bg-[#001f49] transition ml-10"
              >
                delete
              </button>
              <button
                className="w-50 h-12  p-2 rounded-xl bg-[#093775] text-white font-medium hover:bg-[#001f49] transition"
                onClick={() => editeItem(expense)}
              >
                edite
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TripDetail;
