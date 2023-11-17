<template>
    <div>
    <h2>회원 탈퇴</h2>
    <form @submit.prevent="deleteAccount">
      <label for="password">비밀번호:</label>
      <input type="password" v-model="password" required>
      <button type="submit">탈퇴하기</button>
    </form>
  </div>
</template>

<script setup>
    import axios from 'axios';
    import { useUserStore } from "@/stores/userStore";
    import { useRouter } from "vue-router";
    import { ref, reactive } from 'vue';
    const { authStore, clearStore } = useUserStore();
    const router = useRouter();

    let password = ref('');
	const deleteAccount = async () => {
    const shouldDelete = confirm("정말 탈퇴하시겠습니까?");

    if (shouldDelete) {
        try {
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const userId = authStore.userId;
            // 비밀번호 일치 확인 로직
            let { data } = await axios.post('api/users/checkPassword', { id: userId, password: password.value }, axiosConfig);
            if (data === 'valid') {
                // 진짜 삭제로직
                await axios.delete('api/users/' + userId);
                sessionStorage.clear();
                clearStore();
                alert("탈퇴가 성공적으로 완료되었습니다.");
                router.push('/login');
            } else {
                alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        // 사용자가 확인을 누르지 않았을 때의 처리 (optional)
        alert("탈퇴가 취소되었습니다.");
    }
};
    

</script>

<style scoped>

</style>