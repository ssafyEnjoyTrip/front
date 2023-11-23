<template>
  <h3 class="heading">역대 최고의 여행지</h3>
  <div class="post-entry-sidebar">
    <ul>
      <li v-for="(item) in popularAttraction" :key="item.id">
        <a style="text-decoration: none; cursor:pointer" @click="goToAttraction(item.attractionId)">
          <img :src="item.firstImage" alt="Image placeholder" class="me-4 rounded" style="width: 100px; height:100px;" />
          <div class="text">
            <h4>{{ item.title }}</h4>
            <div class="post-meta">
              <span class="mr-2">{{ item.addr1 }}</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAttractionStore } from "@/stores/attractionStore"
const store = useAttractionStore();
const { sideBarList, goToAttraction } = store;
const { popularAttraction, detailObject } = storeToRefs(store);
sideBarList();
</script>