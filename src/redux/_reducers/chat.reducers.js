import { chatConstants, commonConstants } from '../_constants'

const initialState = {
    status: null,
    chatData: [],
    getChatData:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case chatConstants.GET_CHAT_ROOM_REQUEST:
            return { ...state, status: commonConstants.REQUESTED };

        case chatConstants.GET_CHAT_ROOM_SUCCESS:

            return { ...state,getChatData:payload, status: commonConstants.SUCCESS };

        case chatConstants.GET_CHAT_ROOM_ERROR:
            return { ...state, status: commonConstants.ERROR };

        case chatConstants.ADD_CHAT_ROOM_REQUEST:
            return { ...state, status: commonConstants.REQUESTED };

        case chatConstants.ADD_CHAT_ROOM_SUCCESS:
            const chatData = [...state.chatData];
            chatData.push(payload);
            return { ...state, chatData, status: commonConstants.SUCCESS };

        case chatConstants.ADD_CHAT_ROOM_ERROR:
            return { ...state, status: commonConstants.ERROR };

        case chatConstants.UPDATE_CHAT_ROOM_REQUEST:
            return { ...state, ...payload };

        case chatConstants.UPDATE_CHAT_ROOM_SUCCESS:
            return { ...state, ...payload };

        case chatConstants.UPDATE_CHAT_ROOM_ERROR:
            return { ...state, ...payload };

        case chatConstants.REMOVE_CHAT_ROOM_REQUEST:
            return { ...state, ...payload };

        case chatConstants.REMOVE_CHAT_ROOM_SUCCESS:
            return { ...state, ...payload };

        case chatConstants.REMOVE_CHAT_ROOM_ERROR:
            return { ...state, ...payload };

        default:
            return state;
    };
}
