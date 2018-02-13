<template>
  
  <div id="app" class="chatapp">
    <div class="slide-bar">
      <user></user>
      <list></list>
    </div>
    <div class="main">
      <notice></notice>
      <message></message>
      <user-text></user-text>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
import User from './components/User.vue';
import List from './components/List.vue';
import Message from './components/Message.vue';
import UserText from './components/Text.vue';
import Notice from './components/Notice.vue';

export default {
  name: 'App',
  components: {
    User,
    List,
    Message,
    Notice,
    UserText,
  },
  created() {
    let _this = this;
      let conn = new WebSocket('ws://10.5.10.59:9501');

      conn.onopen = function(evt){
          _this.showNotice(' 连接成功！','success');
          _this.changeStatus(true);
      }
      conn.onclose = function(evt){
          _this.showNotice(' 已断开连接！','error');
          _this.changeStatus(false);
      }
      conn.onmessage = function(evt){
          let msg = JSON.parse(evt.data);

          switch(msg.type){
              case 'connect':
                  _this.addUser(msg.data);
                  _this.setCount(msg.data.count);
                  break;
              case 'disconnect':
                  _this.removeUser(msg.data.id);
                  _this.setCount(msg.data.count);
                  break;
              case 'self_init':
                  _this.setUser(msg.data);
                  _this.setCount(msg.data.count);
                  break;
              case 'other_init':
                  _this.addUser(msg.data);
                  break;
              case 'message':   
                  _this.addMessage(msg.data);

                  break;
          }
 
          _this.setConn(conn);
        }
  },
  methods: {
    ...mapActions([
        'showNotice',
        'changeStatus',
        'setUser',
        'addUser',
        'removeUser',
        'setUser',
        'setCount',
        'setConn',
        'addMessage',
        'decrement',
        'incrementIfOdd',
        'incrementAsync'
    ]),
  }
}
</script>

<style lang="less">
   *{
            box-sizing: border-box;
        }
        body{
            background: url('./assets/bg.jpg');
            background-size: 100%;
            font-family: Helvetica, sans-serif;
            color: #4d4d4d;
            margin: 0;
            padding: 0;
        }
        ul,li,p{
            padding: 0;
            margin: 0;
        }
    #app{
        width: 800px;
        height: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -400px;
        margin-top: -300px;

        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        border-radius: 3px;
        
        .slide-bar,.main{
          height:100%;
        }

        .slide-bar{
          width: 200px;
          background:#2e3238;
          color: #f4f4f4;
        }
        .main{
          width: 600px;
          background: #eee;
          display: flex;
          flex-direction: column;
        }


    }
</style>