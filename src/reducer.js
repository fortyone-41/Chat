export default (state, action) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                auth: true,
                userName: action.payload.userName,
                roomId: action.payload.roomId,
            }
        case 'SET_DATA':
            return { 
                ...state,
                users: action.payload.users,
                messages: action.payload.messages,
            };

        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
            };

        case 'NEW_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };

        case 'GET_ROOMS':
            return {
                ...state,
                rooms: action.payload.data,
            }
        default:
            return state;
    }
}