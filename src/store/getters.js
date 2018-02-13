
export const filterUser = state => state.filterUser
export const currentUser = state => state.currentUser
export const users = state => state.users
export const currentSession = state => state.currentSession
export const broadcast = state => state.broadcast

export const conn = state => {

  if (state.connection != null) {
      return state.connection;
  }
}
export const online = state => state.online
export const currentCount = state => state.currentCount
export const notice = state => state.notice
