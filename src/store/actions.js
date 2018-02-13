
import * as types from './mutation-types'


export const searchUser = ({ commit } , filterUser) => {
  commit(types.FILTER_USER, filterUser);
}

export const selectSession =({ commit }, userId) => {
  commit(types.CHANGE_SESSION, userId);
}

export const setUser =({ commit }, user) => {
  if (user.id && user.avatar && user.nickname) {
      commit(types.SET_USER, user);
  }
}

export const addUser =({ commit }, user) => {
  if (user instanceof Array || user.id && user.avatar && user.nickname) {
      commit(types.ADD_USER, user);
  }
}

export const removeUser =({ commit }, userId) => {
  commit(types.REMOVE_USER, userId);
}

export const setConn =({ commit }, conn) => {
  commit(types.SET_CONN, conn);
}

export const changeStatus =({ commit }, status) => {
  commit(types.CHANGE_STATUS, status);
}

export const addMessage =({ commit }, message) => {
  if (message.is_self != 1) {
      let userId = message.to == 0 ? 0 : message.from;
  
      commit(types.SET_HAS_MESSAGE,userId,true);
  }
  
  
  commit(types.ADD_MESSAGE,message);
}

export const setHasMessageStatus =({ commit }, userId, status) => {
  commit(types.SET_HAS_MESSAGE, userId, status);
}

export const setCount =({ commit }, count) => {
  commit(types.SET_COUNT, count);
}

export const showNotice = ({ commit }, msg, type) => {
  commit(types.SHOW_NOTICE, msg, type)
}

