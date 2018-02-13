<template>
    <div>
        <div class="user-text">
            <textarea name="" id="" placeholder="Press enter to send" v-model="content" v-on:keyup.enter="send"></textarea>
        </div>
        <div class="text-footer">
            <button v-on:click="send">发送</button>
        </div>
    </div>
</template>


<script>

    import { mapGetters, mapState, mapActions } from 'vuex'

    export default {
        name: 'user-text',
        computed: {
            ...mapGetters({
            thread: 'currentThread',
            currentUser: 'currentUser',
            currentSession: 'currentSession',
            conn: 'conn',
            messages: 'currentMessages'
            }),
            ...mapState([
                'broadcast'
            ]),
        },
        methods : {
            ...mapActions([
                'showNotice',
                'changeStatus',
                'setUser',
                'addUser',
                'setUser',
                'setCount',
                'setConn',
                'addMessage',
                'decrement',
                'incrementIfOdd',
                'incrementAsync'
            ]),
            send(e){
                let date = new Date().toLocaleString();
                let _this = this;
                let msg = {
                        from : _this.currentUser.id,
                        to : _this.currentSession.id,
                        msg : _this.content,
                        date : date
                    };

                if (_this.content !== '' ) {
                    _this.conn.send(JSON.stringify(msg));
                    _this.content = '';
                    msg.is_self = 1;
                    _this.addMessage(msg);
                }else{
                    _this.showNotice(' 消息不能为空!','warning');
                }
                
            }
        },

        data () {
            return{
                content : ''
            }
        }
        
    }
</script>


<style lang="less">
    .user-text{
        height: 120px;
        border-top: 1px solid #ddd;

        textarea{
            padding: 10px;
            resize: none;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
        }
    }
    .text-footer{
        display: flex;
        padding: 10px 20px;
        background: #fff;
        justify-content: flex-end;
        align-items: flex-end;
        button{
            background: #fff;
            padding: 3px 20px;
            color: #222;
            border: 1px solid #c1c1c1;
            border-radius: 3px;
        }
        span{
            font-size: 14px;
            color: #999;
            margin-right: 10px;
        }
    }
</style>