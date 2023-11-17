<template>
    attractionDetail
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// 라우트에서 쿼리 추출
const route = useRoute();
const attractionId = route.query.attractionId;
console.log(attractionId);
</script>