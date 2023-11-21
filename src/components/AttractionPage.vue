<template>
  <section class="section">
    <div class="container">
      <div class="row mb-4">
        <div class="col-sm-6">
          <h2 class="posts-entry-title">관광지</h2>
        </div>
        <div class="col-sm-6 text-sm-end"><router-link to="/category" class="read-more">View All</router-link></div>
      </div>

      <div class="row">
        
        <div class="col-lg-4 mb-4" v-for="(item, index) in attractionList" :key="index" style="cursor: pointer;">
          <div class="post-entry-alt" @click="goToAttraction(item.attractionId)">
            <img :src="item.firstImage" alt="Image" class="img-fluid" style="width: 400px; height: 300px" />
            <div class="excerpt">
              <h2>{{ item.title }}</h2>
              <div class="post-meta align-items-center text-left clearfix">
                <figure class="author-figure mb-0 me-3 float-start">
                </figure>
                <span class="d-inline-block mt-1">{{ item.addr1 }}</span>
                <br>
                <span> 방문 수 &nbsp;-&nbsp; {{ item.readcount }}</span>
              </div>

              <p>
                <router-link to="/single" class="read-more">{{ item.readCount }}</router-link>
              </p>
            </div>
          </div>
        </div>
        <AttractionPaginationUI v-on:call-parent="movePage">asdasdasd</AttractionPaginationUI>
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
const { getAttractionList, detailAttraction, goToAttraction, attractionStore, setAttractionMovePage } = store;
const { attractionList } = storeToRefs(store);
getAttractionList();
console.log(attractionList);
// pagination
const movePage= (pageIndex) => {
  setAttractionMovePage(pageIndex);
  getAttractionList();
}

</script>
