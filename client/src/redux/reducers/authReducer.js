const initialState = {
    userInfo: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload
            };
        default:
            return state;
    }
};

