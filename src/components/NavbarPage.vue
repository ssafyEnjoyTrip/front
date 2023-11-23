<template>
  <nav class="site-nav">
    <div class="container">
      <div class="menu-bg-wrap">
        <div class="site-navigation">
          <div class="row g-0 align-items-center">
            <div class="col-2">
              <router-link to="/" class="logo m-0 float-start">Tripy .</router-link>
            </div>
            <div class="col-6 text-center">
              <ul class="js-clone-nav d-none d-lg-inline-block text-start site-menu mx-auto">
                <li class="active">
                  <router-link to="/">home</router-link>
                </li>
                <li><router-link to="/articleList">게시글</router-link></li>
                <li><router-link to="/attractionPage">관광지</router-link></li>
              </ul>
            </div>
            <div class="col-4">
              <ul>
                <tr v-show="!authStore.isLogin">
                  <router-link to="/login" class="btn btn-primary me-md-2" role="button">로그인</router-link>
                  <router-link to="/join" class="btn btn-primary" role="button">회원가입</router-link>
                </tr>
                <tr v-show="authStore.isLogin" style="color: aliceblue">
                  {{
                    authStore.userName
                  }}님 안녕하세요!
                  <router-link to="/myPage" class="btn btn-primary me-md-2" href="#" role="button">마이 페이지</router-link>
                  <button class="btn btn-primary" href="#" role="button" @click="logout">로그아웃</button>
                </tr>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
const router = useRouter();
const { authStore, setLogin, clearStore } = useUserStore();
const { checkLogin } = useAuthStore();
const { isLogin } = storeToRefs(useAuthStore());

checkLogin(sessionStorage.isLogin);

const check =  async () => {
  try{
    let {data} = await axios.get("http://localhost:8080/users/user");
    console.log("로그인한 유저의 userId는 ", data , "입니다");
  } catch(error){
    console.log("로그인하지 않았습니다.");
  }
}


const logout = async () => {
  try {
    let { data } = await axios.post("api/logout");
    if (data == "success") {
      sessionStorage.clear();
    }

    // store clear
    clearStore();
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};
check();
</script>
