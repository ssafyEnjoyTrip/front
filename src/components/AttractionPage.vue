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
        <div class="col-lg-4 mb-4" v-for="item in attractionList.content" :key="item.id">
          <div class="post-entry-alt" @click="goToAttraction(item.attractionId)">
            <img :src="item.firstImage" alt="Image" class="img-fluid" style="width: 400px; height: 300px" />
            <div class="excerpt">
              <h2>{{ item.title }}</h2>
              <div class="post-meta align-items-center text-left clearfix">
                <figure class="author-figure mb-0 me-3 float-start">
                  <img src="images/person_1.jpg" alt="Image" class="img-fluid" />
                </figure>
                <span class="d-inline-block mt-1">By <a href="#">David Anderson</a></span>
                <span>&nbsp;-&nbsp; July 19, 2019</span>
              </div>

              <p>{{ item.addr1 }}</p>
              <p>
                <router-link to="/single" class="read-more">{{ item.readCount }}</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useAttractionStore } from "@/stores/attractionStore";
const store = useAttractionStore();
const { getAttractionList, detailAttraction, goToAttraction } = store;
const { attractionList } = storeToRefs(store);
getAttractionList();
</script>
