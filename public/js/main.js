// imports go at the top
import ChatMessage from "./components/ChatMessage.js";

var socket = io();

// utility function for socket
function addNewMessage(message) {

    vm.messages.push(message);

}

const { createApp } = Vue

const vm = createApp({
    data() {
        return {
            message: '', 
            messages: []
        }
    },

        methods: {
            dispatchMessage(){
                console.log ('send a message to the chat servise');

                socket.emit('chat_message', { content: this.message, user: this.username || 'anonymous'});

                this.message= '';

            }
            
        },

        components: {
            newmsg: ChatMessage
        }

    }).mount('#app')

    socket.addEventListener('new_message', addNewMessage);
