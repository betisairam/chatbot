import { chatConstants } from '../_constants'
const type = chatConstants;

export const getChatRoomData = (chatData) => (dispatch) => {
    dispatch({ type: type.GET_CHAT_ROOM_REQUEST })
    if (chatData) {
        dispatch({ type: type.GET_CHAT_ROOM_SUCCESS, payload: chatData })
    }
    else {
        dispatch({ type: type.GET_CHAT_ROOM_ERROR })
    }
}


export const addChatRoomData = (chatData) => (dispatch) => {
    dispatch({ type: type.ADD_CHAT_ROOM_REQUEST })
    if (chatData) {
        dispatch({ type: type.ADD_CHAT_ROOM_SUCCESS, payload: chatData })
    }
    else {

        dispatch({ type: type.ADD_CHAT_ROOM_ERROR })
    }
}

