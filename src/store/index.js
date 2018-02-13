import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  currentThreadID: null,
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  },
  messages: {
    /*
    id: {
      id,
      threadId,
      threadName,
      authorName,
      text,
      timestamp,
      isRead
    }
    */
  },
  count: 0,
  history: [],
  //the user of current
  currentUser : {
    id : 13,
    avatar : 'http://tva3.sinaimg.cn/crop.0.0.200.200.50/701cac0cjw8ez3nd2wa7rj205k05kt8v.jpg',
    nickname : 'jack'
  },
  //all users
  users : [
      {
          id : 0,
          nickname : '群聊',
          avatar : 'http://58pic.ooopic.com/58pic/12/25/04/02k58PICVwf.jpg',
          has_message : false
      }
  ],
  filterUser: '',

  currentSession : {
      id : 0,
      nickname : '群聊',
      avatar : 'http://b.hiphotos.baidu.com/exp/w=480/sign=d86a96f25766d0167e199f20a72ad498/b8014a90f603738d48c6191db61bb051f819ec05.jpg',
      chat : null
  },

  currentCount : 0,

  online : false,

  broadcast : [],

  connection : null,

  notice : {
      show : false,
      type : '',
      msg : ''
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
