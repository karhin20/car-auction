const initialData = {
    bookings: []
};

export const biddingReducer = (state=initialData, action) => {
    switch(action.type)
    {
            case 'GET_ALL_BOOKINGS':{
                return{
                    ...state, 
                    bookings: action.payload
            }
            
        }
        
        default:return state

    }
}