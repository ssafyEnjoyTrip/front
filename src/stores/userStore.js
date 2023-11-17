import { reactive, watch } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  // 로그인 여부, 사용자 이름, 프로필 이미지, 로그인 항목
  const authStore = reactive({
    isLogin: false,
    userName: "",
    userId: 0,
    userRole: "",
    userEmail: "",
    userPhoneNum: "",
    userRegisterTime: "",
    // userProfileImageUrl: notLoginUserProfileImageUrl,

    userPassword: "",
  });
  // login 후 변경
  const setLogin = (payload) => {
    authStore.isLogin = payload.isLogin;
    authStore.userName = payload.userName;
    authStore.userId = payload.userId;
    authStore.userRole = payload.role;
    authStore.userEmail = payload.email;
    authStore.userPhoneNum = payload.phoneNum;
    authStore.userRegisterTime = payload.registerTime;
    // authStore.userProfileImageUrl = payload.userProfileImageUrl;
  };
  // update 후 변경
  const update = (payload) => {
    authStore.userName = payload.userName;
    authStore.userPhoneNum = payload.phoneNum;
  };
  const clearStore = () => {
    authStore.isLogin = false;
    authStore.userName = "";
    authStore.userId = 0;
    authStore.userRole = "";
    authStore.userEmail = "";
    authStore.userPhoneNum = "";
    authStore.userRegisterTime = "";
  };

  return { authStore, setLogin, update, clearStore };
});
