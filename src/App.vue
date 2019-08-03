<template>
    <div id="app">
        <router-link :to="{ name: 'Start' }">Start</router-link>
        <router-link :to="{ name: 'About' }">About</router-link>

        <router-view>
        </router-view>
    </div>
</template>

<style lang="scss">
@import "assets/styles/tailwind.css";
</style>
