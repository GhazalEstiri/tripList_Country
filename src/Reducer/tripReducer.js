const initialState = {
  trip: [],
};
function tripReducer(state , action) {
    switch (action.type) {
        case "ADD_TRIP":{
            return {
                ...state,
                trip:[...state.trip, action.payload]
            }
        }
            
    
        default:return state
    }
}
export {initialState , tripReducer}