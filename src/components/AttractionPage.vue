<template>
  <div class="site-cover site-cover-sm same-height overlay single-page"
    style="background-image: url('images/img_1_horizontal.jpg');">
    <div class="container">
      <div class="row same-height justify-content-center">
        <div class="col-md-6">
          <div class="post-entry text-center">
            <h1 class="mb-4">여행지 목록</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section">
    <div class="container">
      <div class="row mb-4">
        <div class="col-sm-6">
          <h2 class="posts-entry-title">관광지</h2>
        </div>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="원하는 관광지를 찾아보세요." v-model="attractionStore.searchWord">
          <button type="button" class="btn btn-outline-secondary" @click="search()">검색</button>

        </div>
      </div>

      <div class="row">

        <div class="col-lg-4 mb-4" v-for="(item, index) in attractionList" :key="index" style="cursor: pointer;">
          <div class="post-entry-alt" @click="goToAttraction(item.attractionId)">
            <img v-if="item.firstImage" :src="item.firstImage" alt="Attraction Image"
									class="img-fluid">
						<img v-else src="@/assets/no-image.avif" alt="No Image" class="img-fluid">
            <!-- <img :src="item.firstImage" alt="Image" class="img-fluid" style="width: 400px; height: 300px" /> -->
            <div class="excerpt">
              <h2>{{ item.title }}</h2>
              <div class="post-meta align-items-center text-left clearfix">
                <figure class="author-figure mb-0 me-3 float-start">
                </figure>
                <span class="d-inline-block mt-1">{{ item.addr1 }}</span>
                <br>
                <span> 방문 수 &nbsp;-&nbsp; {{ item.readcount }}</span>
              </div>
              <p class="read-more">{{ item.readCount }} </p>
            </div>
          </div>
        </div>
        <AttractionPaginationUI v-on:call-parent="movePage"></AttractionPaginationUI>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useAttractionStore } from "@/stores/attractionStore";
import AttractionPaginationUI from "@/components/AttractionPaginationUI.vue";
const store = useAttractionStore();

// attractionStore는 나중에 키워드 서치할때 사용하면된다.
const { getAttractionList, detailAttraction, goToAttraction, setAttractionMovePage, search } = store;
const { attractionList, attractionStore } = storeToRefs(store);
getAttractionList();
console.log(attractionList);
// pagination
const movePage = (pageIndex) => {
  setAttractionMovePage(pageIndex);
  getAttractionList();
}

</script>
