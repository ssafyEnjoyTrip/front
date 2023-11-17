<!-- EditProfile.vue -->
<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <!-- Edit Profile Form -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">회원 정보 수정</h5>
              <form @submit.prevent="updateProfile">
                <div class="mb-3">
                  <label for="name" class="form-label">이름</label>
                  <input type="name" class="form-control" id="name" v-model="editedUser.name" required>
                </div>

                <div class="mb-3">
                  <label for="phoneNum" class="form-label">전화번호</label>
                  <input type="tel" class="form-control" id="phoneNum" v-model="editedUser.phoneNum" required>
                </div>
                <!-- Add more fields as needed -->
                <div class="mb-3">
                  <button type="submit" class="btn btn-primary">저장</button>
                  <!-- <router-link :to="{ name: 'userProfile', params: { userId: editedUser.id } }" class="btn btn-secondary">취소</router-link> -->
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {reactive } from 'vue';
  import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router';
  import { useUserStore } from "@/stores/userStore";

  const { authStore, update } = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const userId = route.query.userId;
  
  const editedUser = reactive({
    id: authStore.userId,
    name:authStore.userName,
    phoneNum: authStore.userPhoneNum,
  });
  
  const updateProfile = async () => {
    try {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        let { data } = await axios.put(`/api/users/${userId}`, editedUser, axiosConfig);
        if (data == 'success') {

            // 현재 세션에 저장되어있는 name, 핸드폰 번호 업데이트.
            sessionStorage.setItem("userName", data.userName);
            sessionStorage.setItem("phoneNum", data.phoneNum);

          // sessionStorage.setItem("userProfileImageUrl", data.userProfileImageUrl);
            // 로그인 성공시 isLogin을 true로 바꿔주기
            update({
                userName: editedUser.name,
                phoneNum: editedUser.phoneNum,
                // userProfileImageUrl: data.userProfileImageUrl,
            })
            alert("회원 정보 수정 완료!!")
            router.push(`/myPage`)
          } else {
            alert("수정에 실패하였습니다.")
        }
        
      
    } catch (error) {
      console.error('Error updating user profile', error);
    }
  };
  </script>
  