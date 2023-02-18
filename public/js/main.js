// imports go at the top
import ChatMessage from "./components/ChatMessage.js";

var socket = io();

function setUserID(obj) {
    vm.socketID = obj.sID;
    console.log(obj.connectedUsers);
    vm.connectedUsers = obj.connectedUsers;

}
// utility function for socket
function addNewMessage(message) {
    vm.messages.push(message);
}

function handleTypingEvent(user) {
    console.log(user);
}

function updateUsers(obj){
    vm.connectedUsers = obj.connectedUsers;
    console.log(obj.message);
    console.log(obj.connectedUsers);
}

const { createApp } = Vue

const vm = createApp({
    data() {
        return {
            socketID:'',
            message: '', 
            messages: [],
            nickname:'',
            connectedUsers:[]
        }
    },

        methods: {
            dispatchMessage(){
                console.log ('send a message to the chat service');

                socket.emit('chat_message', { content: this.message, name: this.nickname || 'anonymous', 
                id: this.socketID
            });

                this.message= '';

            },

            dispatchTypingEvent(){
                // send the typing notification to the server
                socket.emit('typing_event', {user: this.nickname || 'anonymous'})
            },
            dispatchNicknameEvent(){
                socket.emit('nickname_event',{id:this.socketID,name:this.nickname});
            }
            
        },

        components: {
            newmsg: ChatMessage
        }
    }).mount('#app')




    
    socket.addEventListener('connected', setUserID);
    socket.addEventListener('new_message', addNewMessage);
    socket.addEventListener('typing',handleTypingEvent);
    socket.addEventListener('update_users',updateUsers);
