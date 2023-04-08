<template>
    <div class="home">
        <h1>ChatAlone</h1>
        <p>独り言へようこそ</p>
        <router-link to="/login">Login!</router-link>
    </div>
</template>

<script>
    export default {
        name: "HomePage"
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