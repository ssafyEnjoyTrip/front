<template>
    <navbar-page></navbar-page>
    <router-view></router-view>
    <footer-page></footer-page>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavbarPage from "./components/NavbarPage.vue";
import FooterPage from "./components/FooterPage.vue";
import { useUserStore } from "@/stores/userStore";

const { setLogin } = useUserStore();
// sessionStorage에 login 된 상태를 확인하면 sessionStorage에 있는 값을 이용해서 authStore 를 갱신
let isLogin = sessionStorage.getItem("isLogin");
if (isLogin == "true") {
    let userName = sessionStorage.getItem("userName");
    let userProfileImageUrl = sessionStorage.getItem("userProfileImageUrl")
    setLogin({
        isLogin: true,
        userName: userName,
        userProfileImageUrl: userProfileImageUrl
    });
}

</script>

<style scoped></style>
