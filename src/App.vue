<script setup>
import {RouterView} from "vue-router"
import NavbarPage from "./components/NavbarPage.vue";
import FooterPage from "./components/FooterPage.vue";
</script>

<template>
    <navbar-page></navbar-page>
    <router-view></router-view>
    <footer-page></footer-page>
</template>

<style scoped></style>
