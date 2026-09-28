import { useParams } from "react-router";
import { useState } from "react";
function TripDetail({ state }) {
  const { id } = useParams();
  const [amount, setAmount] = useState("");

  const trip = state.trip.find((item) => item.id === Number(id));
  if (!trip) {
    return <p>Trip not found</p>;
  }

  function addExpense() {
    dispatch({
      type: "ADD_EXPENSE",
      payload: {
        tripId: trip.id,
        category: trip.category,
        amount: Number(amount),
      },
    });

    setAmount("");
  }

  return (
    <section>
      <h1>{trip.country}</h1>

      <p>Trip Category: {trip.category}</p>

      <p>Companion: {trip.companion.join(", ")}</p>

      <h2>Remaining Budget: {trip.budget}</h2>

      <div>
       
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addExpense}>Add</button>
      </div>

      <div>
        {trip.expenses.map((expense) => (
          <div key={expense.id}>
            <p>{expense.category}</p>
            <p>{expense.amount}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default TripDetail;
