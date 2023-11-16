import { reactive, watch} from 'vue'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('userStore', () => {
    // 로그인 여부, 사용자 이름, 프로필 이미지, 로그인 항목
    const authStore = reactive({
        isLogin: false,
        userName: '',
        userId: 0,
        role:'',
        // userProfileImageUrl: notLoginUserProfileImageUrl,
        // userEmail: 'ice98@ssafy.com',
        // userPassword: '1234'

    })
    // login 후 변경
    const setLogin = (payload) => {
        authStore.isLogin = payload.isLogin;
        authStore.userName = payload.userName;
        authStore.userId = payload.userId,
        authStore.role = payload.role
        // authStore.userProfileImageUrl = payload.userProfileImageUrl;
    }

    return {authStore, setLogin}
})

