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
                                <li class="has-children">
                                    <router-link to="/category">pages</router-link>

                                    <ul class="dropdown">
                                        <li><router-link to="/searchResult">Search Result</router-link></li>
                                        <li><router-link to="/blog">Blog</router-link></li>
                                        <li><router-link to="/single">Blog Single</router-link></li>
                                        <li><router-link to="/category">Category</router-link></li>
                                        <li><router-link to="/about">About</router-link></li>
                                        <!-- <li><router-link to="/contact">Cantact Us</router-link></li> -->
                                        <li><a href="#">Menu One</a></li>
                                        <li><a href="#">Menu Two</a></li>
                                        <li class="has-children">
                                            <a href="#">Dropdown</a>
                                            <ul class="dropdown">
                                                <li><a href="#">Sub Menu One</a></li>
                                                <li><a href="#">Sub Menu Two</a></li>
                                                <li><a href="#">Sub Menu Three</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><router-link to="/category">Culture</router-link></li>
                                <li><router-link to="/category">Business</router-link></li>
                                <li><router-link to="/category">Politics</router-link></li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <ul>
                                <tr v-show="!isLogin">
                                    <router-link to="/login" class="btn btn-primary me-md-2" v-show="!isLogin" role="button">로그인</router-link>
                                    <router-link to="/join" class="btn btn-primary" v-show="!isLogin" role="button">회원가입</router-link>
                                </tr>
                                <tr v-show="isLogin">
                                    <router-link to="/" class="btn btn-primary me-md-2" href="#" v-show="isLogin" role="button"
                                        >마이 페이지</router-link
                                    >
                                    <router-link to="/" class="btn btn-primary" href="#" v-show="isLogin" role="button">로그아웃</router-link>
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
import { storeToRefs } from "pinia";

const store = useUserStore();
const { isLogin } = storeToRefs(store);
</script>
