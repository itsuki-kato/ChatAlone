<template>
    <div class="home">
        <ChatForm></ChatForm>
    </div>
</template>

<script>
    import ChatForm from '../components/ChatForm.vue'
    export default {
        name: "ChatPage",
        components: {
            ChatForm
        }
    };
</script>

<style scoped>
    .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    }
</style>