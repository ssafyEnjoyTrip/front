<template>
    <navbar-page></navbar-page>
    <router-view></router-view>
    <footer-page></footer-page>
</template>

<script setup>
import { RouterView } from "vue-router";
import axios from "axios";
import NavbarPage from "./components/NavbarPage.vue";
import FooterPage from "./components/FooterPage.vue";

</script>

<style scoped></style>
