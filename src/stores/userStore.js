import { ref, watch} from 'vue'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('userStore', () => {
    const SESSION_STORAGE_KEY = 'userStore';
    // 세션 스토리지에서 값을 불러오고, 없으면 false로 초기화
    const isLogin = ref(JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) || false);

    // isLogin 값이 변경될 때마다 세션 스토리지에 저장
    watch(isLogin, (newVal) => {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newVal));
    });
    return {isLogin}
})

