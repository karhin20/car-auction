const initialState = {
    users: [],
    loading: false,
    error: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'GET_ALL_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export { usersReducer };