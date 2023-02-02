// imports go at the top
import ChatMessage from "./components/ChatMessage.js";

var socket = io();


function setUserID({ sID }) {
    vm.socketID = sID;
}
// utility function for socket
function addNewMessage(message) {

    vm.messages.push(message);

}

function handleTypingEvent(user) {
    console.log('someone is typing');
}



const { createApp } = Vue

const vm = createApp({
    data() {
        return {
            socketID:'',
            message: '', 
            messages: [],
            nickname:''
        }
    },

        methods: {
            dispatchMessage(){
                console.log ('send a message to the chat servise');

                socket.emit('chat_message', { content: this.message, name: this.nickname || 'anonymous', 
                id: this.socketID
            });

                this.message= '';

            },

            dispatchTypingEvent(){
                // send the typing notification to the server
                socket.emit('typing_event', {user: this.nickname || 'anonymous'})
            }
            
        },

        components: {
            newmsg: ChatMessage
        }

    }).mount('#app')
    
    socket.addEventListener('connected', setUserID);
    socket.addEventListener('new_message', addNewMessage);
    socket.addEventListener('typing',handleTypingEvent);

