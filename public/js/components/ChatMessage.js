export default {
    name: 'TheChatMesssageComponent',

    props: ['msg'],

    data() {
        return {
            // check to see if the message's ID is the same as ours
            // if it is, float to the right
            // else float to the left
            matchedID: this.$parent.socketID == this.msg.id
        }
    },

    template: `
    <article class= "chat-messages" :class="{ 'other-messages' : matchedID }">
        <h2>{{ msg.message.name }} says:</h2>
        <p>{{ msg.message.content }}</p>
    </article>
    `,


}

