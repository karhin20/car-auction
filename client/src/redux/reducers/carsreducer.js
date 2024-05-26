const initialState = {
    cars: [],
    loading: false,
    error: null
};

const carsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'GET_ALL_CARS':
            return {
                ...state,
                cars: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export { carsReducer };