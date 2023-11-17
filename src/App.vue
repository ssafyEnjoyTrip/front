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
    let userId = sessionStorage.getItem("userId");
    let role = sessionStorage.getItem("role");
    let email = sessionStorage.getItem("email");
    let phoneNum = sessionStorage.getItem("phoneNum");
    let registerTime = sessionStorage.getItem("registerTime");
    setLogin({
        isLogin: true,
        userId: userId,
        userName: userName,
        userProfileImageUrl: userProfileImageUrl,
        role: role,
        email: email,
        phoneNum: phoneNum,
        registerTime: registerTime,
    });
}

</script>

<style scoped></style>
