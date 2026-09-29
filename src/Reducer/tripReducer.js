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
                  reason: action.payload.reason,
                },
              ],
            };
          }

          return trip;
        }),
      };
    }
    case "DELETE_CARD": {
      return {
        ...state,
        trip: state.trip.filter((trip) => {
          return trip.id !== action.payload;
        }),
      };
    }
    case "DELETE_ITEM": {
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id === action.payload.tripId) {
            return {
              ...trip,
              budget:trip.budget + action.payload.amount ,
                expenses: trip.expenses.filter((expense) => {
              return expense.id !== action.payload.expenseId;
            }),
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
