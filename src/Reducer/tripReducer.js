const initialState = {
  trip: [],
  deletedExpense: null,
  deletedCard: null,
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
                  companion: action.payload.companion,
                },
              ],
            };
          }

          return trip;
        }),
      };
    }
    case "DELETE_CARD": {
      const deletedCard = state.trip.find((trip) => {
        return trip.id === action.payload
      });

      return {
        ...state,
        trip: state.trip.filter((trip) => {
          return trip.id !== action.payload
        }),
        deletedCard: deletedCard,
      };
    }
    case "DELETE_ITEM": {
      const tripToDelete = state.trip.find((trip) => {
        return trip.id === action.payload.tripId;
      });
      const deletedExpense = tripToDelete.expenses.find((expense) => {
        return expense.id === action.payload.expenseId;
      });
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id === action.payload.tripId) {
            return {
              ...trip,
              budget: trip.budget + action.payload.amount,
              expenses: trip.expenses.filter((expense) => {
                return expense.id !== action.payload.expenseId;
              }),
            };
          }

          return trip;
        }),
        deletedExpense: {
          tripId: tripToDelete.id,
          expense: deletedExpense,
        },
      };
    }
    case "EDIT_TRIP": {
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id === action.payload.tripId) {
            return {
              ...trip,
              category: action.payload.category,
              country: action.payload.country,
              companion: action.payload.companion,
              budget: action.payload.budget,
            };
          }
          return trip;
        }),
      };
    }

    case "EDIT_ITEM": {
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id == action.payload.tripId) {
            return {
              ...trip,
              expenses: trip.expenses.map((expense) => {
                if (expense.id === action.payload.expenseId) {
                  return {
                    ...expense,
                    category: action.payload.category,
                    companion: action.payload.companion,
                    amount: action.payload.amount,
                    reason: action.payload.reason,
                  };
                }
                return expense;
              }),
            };
          }
          return trip;
        }),
      };
    }
    case "UNDO_ITEM": {
      return {
        ...state,
        trip: state.trip.map((trip) => {
          if (trip.id == state.deletedExpense.tripId) {
            return {
              ...trip,
              budget: trip.budget - state.deletedExpense.expense.amount,
              expenses: [...trip.expenses, state.deletedExpense.expense],
            };
          }
          return trip;
        }),
        deletedExpense: null,
      };
    }
    case "UNDO_CARD": {
      return {
        ...state,
        trip: [...state.trip, state.deletedCard],
        deletedCard: null,
      };
    }
    default:
      return state;
  }
}
export { initialState, tripReducer };
