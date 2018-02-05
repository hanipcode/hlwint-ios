import { Map, List } from 'immutable';

export const LOGIN_CHAT = 'chat/loginChat';
export const ADD_CHAT_LIST = 'chat/addChatList';

export function loginChat(username, fullName, profilePicture) {
  return {
    type: LOGIN_CHAT,
    username,
    fullName,
    profilePicture,
  };
}

export function addChat(chatList) {
  return {
    type: ADD_CHAT_LIST,
    chatList,
  };
}

const initialState = Map({
  chatList: Map({}),
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CHAT_LIST:
      return state.set('chatList', action.chatList);
    default:
      return state;
  }
}
