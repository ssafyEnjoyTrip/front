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
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-6 mb-3">
                            <input v-model="email" type="text" class="form-control" name="email" placeholder="이메일을 입력해주세요." />
                        </div>
                        <div class="col-6 mb-3">
                            <input v-model="password" type="text" class="form-control" name="password" placeholder="비밀번호를 입력해주세요." />
                        </div>
                        <div class="col-6 mb-3">
                            <input
                                v-model="passwordCheck"
                                type="text"
                                class="form-control"
                                name="passwordCheck"
                                placeholder="비밀번호를 다시 입력해주세요"
                            />
                        </div>
                        <div class="col-6 mb-3">
                            <input v-model="userName" type="text" class="form-control" name="userName" placeholder="이름을 입력해주세요." />
                        </div>
                        <div class="col-6 mb-3">
                            <input v-model="phoneNum" type="text" class="form-control" name="phoneNum" placeholder="핸드폰 번호를 입력해주세요." />
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
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const passwordCheck = ref("");
const userName = ref("");
const phoneNum = ref("");

const join = async () => {
    try {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        let {data} = await axios.post(
            "api/join",
            {
                email: email.value,
                password: password.value,
                name: userName.value,
                phoneNum: phoneNum.value,
            },
            axiosConfig
        );
        if (data == 'success') {
            alert("회원가입이 완료되었습니다.")
            router.push(`/login`)
        }
        
    } catch (error) {
        console.error(error);
    }
};
</script>
