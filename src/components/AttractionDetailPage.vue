<template>
  <section class="section posts-entry">
    <div class="container">
      <div class="row mb-4">
        <div class="col-sm-6">
          <h2 class="posts-entry-title">관광지</h2>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-md-9">
          <div class="row g-3">
            <div class="col-md-12">
              <div class="blog-entry" style="text-align: center">
                <img alt="Image" :src="detailObject.firstImage" class="img-fluid" />

                <h2>{{ detailObject.title }}</h2>
                <p>{{ detailObject.attractionDescription.overview }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <side-bar-page></side-bar-page>
        </div>
      </div>
    </div>
  </section>
  <kakao-map></kakao-map>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import KakaoMap from "./KakaoMap.vue";
import { useAttractionStore } from "@/stores/attractionStore";
import { storeToRefs } from "pinia";
import SideBarPage from "@/components/SidebarPage.vue";

// 라우트에서 쿼리 추출
const route = useRoute();
const store = useAttractionStore();
const { detailAttraction } = store;
const { detailObject } = storeToRefs(store);

const attractionId = route.query.attractionId;

detailAttraction(attractionId);
</script>
