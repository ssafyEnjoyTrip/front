<template>
    <div class="hero overlay inner-page site-nav py-3">
        <div class="container">
            <div class="row align-items-center justify-content-center text-center pt-5">
                <div class="col-lg-6">
                    <h1 class="heading text-white mb-3">로그인</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-6 mb-3">
                            <input v-model="email" type="text" class="form-control" name="email" placeholder="Your Email"/>
                        </div>
                        <div class="col-12 mb-3">
                            <input v-model="password" type="text" class="form-control" name = "password" placeholder="password"/>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" @click="login">로그인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.untree_co-section -->
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from 'pinia'

const store = useUserStore();
const { authStore, setLogin } = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
    try {
        const axiosConfig = {
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }
        
        let response = await axios.post("api/login", {
            email: email.value,
            password: password.value
        }, axiosConfig);
        
        const { data } = response;
        console.log(data)
        if (data.success) {

            sessionStorage.setItem("isLogin", true);
            sessionStorage.setItem("userName", data.userName);
            sessionStorage.setItem("userId", data.userId);
            sessionStorage.setItem("role", data.role);
            // sessionStorage.setItem("userProfileImageUrl", data.userProfileImageUrl);

            // 로그인 성공시 isLogin을 true로 바꿔주기
            setLogin({
                isLogin: true,
                userName: data.userName,
                userId : data.userId,
                role : data.role,
                // userProfileImageUrl: data.userProfileImageUrl,
            })

            router.push(`/`)
        }
    } catch (error) {
        console.error(error);
    }
};
</script>