import Vue from 'vue'
import * as types from './mutation-types'

export default {
  

  FILTER_USER: (state, nickname) => {
    state.filterUser = nickname;
  },

  CHANGE_SESSION: (state, userId) => {
    for (var i = state.users.length - 1; i >= 0; i--) {
        if (state.users[i].id != userId) {
            continue;
        }
        state.currentSession = state.users[i];
        break;
    }
  },

SET_USER: (state, user) => {
  console.log('user')
  console.log(user)
    state.currentUser = user;
},

[types.ADD_USER] (state, user) {
  if (user instanceof Array) {

    for (var i = user.length - 1; i >= 0; i--) {
        if (user[i].id != state.currentUser.id) {
            user[i].has_message = false;
            state.users.push(user[i]);
        }
        
    }
  }else{
      user.has_message = false;
      state.users.push(user);
  }
},


REMOVE_USER: (state, userId) => {
    state.users.forEach((item,index) => {
        if (item.id == userId) {
            var index = state.users.indexOf(item);
            state.users.splice(index, 1)
        }
    });
},

SET_CONN: (state, conn) => {

    if (conn != null && state.connection == null) {

        state.connection = conn;
    }

},

CHANGE_STATUS: (state, status) => {
    state.online = status;
},

ADD_MESSAGE: (state, message) => {
    let msg = {
        user : {
            id : message.from,
            avatar : '',
            nickname : ''
        },
        msg : message.msg,
        time : message.date
    };
    if (message.from == state.currentUser.id) {
        msg.user = state.currentUser;
    }else{
        for (var i = state.users.length - 1; i >= 0; i--) {
            if (state.users[i].id == message.from) {
                msg.user = state.users[i];
                break;
            }
        }
    }

    if (message.to == 0) {
        if (state.broadcast[ 0 ] == undefined) {
            state.broadcast[ 0 ] = new Array;
        }

        state.broadcast[ 0 ].push(msg);

        
        Vue.set(state.broadcast, 0, state.broadcast[0])
    }else{
        if (message.is_self == 1) {
            message.from = message.to;
        }


        if (state.broadcast[ message.from ] == undefined) {
            state.broadcast[ message.from ] = new Array;
        }

        state.broadcast[ message.from ].push(msg);

      
        Vue.set(state.broadcast, message.from, state.broadcast[ message.from ])
    }

},

SET_HAS_MESSAGE : (state, userId, status) => {

    for (var i = state.users.length - 1; i >= 0; i--) {
        if (status == false && state.users[i].id == userId || state.users[i].id == userId && state.currentSession.id != userId ) {
            state.users[i].has_message = status;
        }
    }
},

  SET_COUNT : (state, count) => {
      state.currentCount = count;
  },

  SHOW_NOTICE : (state, msg, type) => {
      state.notice = {
          show : true, msg, type
      }

      setTimeout(function(){
          state.notice.show = false;
      },1000);
  }
}

function createThread (state, id, name) {
  Vue.set(state.threads, id, {
    id,
    name,
    messages: [],
    lastMessage: null
  })
}

function addMessage (state, message) {
  // add a `isRead` field before adding the message
  message.isRead = message.threadID === state.currentThreadID
  // add it to the thread it belongs to
  const thread = state.threads[message.threadID]
  if (!thread.messages.some(id => id === message.id)) {
    thread.messages.push(message.id)
    thread.lastMessage = message
  }
  // add it to the messages map
  Vue.set(state.messages, message.id, message)
}

function setCurrentThread (state, id) {
  state.currentThreadID = id
  if (!state.threads[id]) {
    debugger
  }
  // mark thread as read
  state.threads[id].lastMessage.isRead = true
}
