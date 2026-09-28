const initialState = {
  trip: [],
};
function tripReducer(state, action) {
  switch (action.type) {
    case "ADD_TRIP": {
      return {
        ...state,
        trip: [...state.trip, action.payload],
      };
    }
    case "ADD_EXPENSE": {
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id === action.payload.tripId) {
            return {
              ...trip,
              budget: trip.budget - action.payload.amount,
              expenses: [
                ...trip.expenses,
                {
                  id: Date.now(),
                  category: action.payload.category,
                  amount: action.payload.amount,
                },
              ],
            };
          }

          return trip;
        }),
      };
    }

    default:
      return state;
  }
}
export { initialState, tripReducer };
