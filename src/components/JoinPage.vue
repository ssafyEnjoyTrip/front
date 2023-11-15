<template>
    <div class="hero overlay inner-page site-nav py-3">
        <div class="container">
            <div class="row align-items-center justify-content-center text-center pt-5">
                <div class="col-lg-6">
                    <h1 class="heading text-white mb-3">회원가입</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="container">
            <div class="row">
                <!-- <div class="col-lg-4 mb-5 mb-lg-0">
                    <div class="contact-info">
                        <div class="address mt-2">
                            <i class="icon-room"></i>
                            <h4 class="mb-2">Location:</h4>
                            <p>
                                43 Raymouth Rd. Baltemoer,<br />
                                London 3910
                            </p>
                        </div>

                        <div class="open-hours mt-4">
                            <i class="icon-clock-o"></i>
                            <h4 class="mb-2">Open Hours:</h4>
                            <p>
                                Sunday-Friday:<br />
                                11:00 AM - 2300 PM
                            </p>
                        </div>

                        <div class="email mt-4">
                            <i class="icon-envelope"></i>
                            <h4 class="mb-2">Email:</h4>
                            <p>info@Untree.co</p>
                        </div>

                        <div class="phone mt-4">
                            <i class="icon-phone"></i>
                            <h4 class="mb-2">Call:</h4>
                            <p>+1 1234 55488 55</p>
                        </div>
                    </div>
                </div> -->
                
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-6 mb-3">
                            <input v-model="email" type="text" class="form-control" name="email" placeholder="이메일을 입력해주세요."/>
                        </div>
                        <div class="col-6 mb-3">
                            <input v-model="password" type="text" class="form-control" name = "password" placeholder="비밀번호를 입력해주세요."/>
                        </div>
                        <div class="col-6 mb-3">
                            <input v-model="passwordCheck" type="text" class="form-control" name = "passwordCheck" placeholder="비밀번호를 다시 입력해주세요"/>
                        </div>
                        <div class="col-6 mb-3">
                            <input v-model="userName" type="text" class="form-control" name = "userName" placeholder="이름을 입력해주세요."/>
                        </div>
                        <div class="col-6 mb-3">
                            <input v-model="phoneNum" type="text" class="form-control" name = "phoneNum" placeholder="핸드폰 번호를 입력해주세요."/>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" @click="join">회원가입</button>
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
const email = ref("");
const password = ref("");
const passwordCheck = ref("");
const userName = ref("");
const phoneNum = ref("");

const join = async () => {
    try {
        const axiosConfig = {headers:{"Content-Type": "application/json"}}
         let response = await axios.post("/api/join", {
            email: email.value,
            password: password.value,
            name: userName.value,
            phoneNum: phoneNum.value,
        },axiosConfig);

        console.log(response.data);
       
    } catch (error) {
        console.error(error);
    }
};
</script>