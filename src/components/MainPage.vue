<template>
  <!-- Start posts-entry -->
  <section class="section posts-entry retro-layout-alt">
    <div class="container">
      <div class="row g-3 carousel slide" data-bs-ride="carousel" id="carouselExampleInterval">
        <div class="col-md-6">
          <div class="row">
            <div class="blog-entry carousel-inner">
              <div class="carousel-item active" style="background-size: cover; background-position: 50% 50%;"
                data-bs-interval="5000">
                <img :src="welcome" class="img-thumbnail" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="5000" v-for="(item, index) in mainPageAttractions"
                :key="index">
                <img :src="item.firstImage" class="img-thumbnail" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>{{ item.title }}</h5>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="col-md-6">
          <ul class="list-unstyled blog-entry-sm">
            <li v-for="item in mainPageAttractions" :key="item.attractionId">
              <h3 style="cursor: pointer;" @click="useAttractionStore().goToAttraction(item.attractionId)">{{ item.title
              }} 놀러가기</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- End posts-entry -->
  <random-attraction></random-attraction>
  <!-- Start posts-entry -->


  <!-- Start posts-entry -->
</template>

<script setup>
import RandomAttraction from "@/components/RandomAttraction.vue";
import welcome from "../assets/welcome.jpg";
import axios from "axios";
import { ref } from "vue";
import { useAttractionStore } from "@/stores/AttractionStore"
const mainPageAttractions = ref([]);
const store = useAttractionStore();
// const { goToAttraction } = store;
const getMainAttraction = async () => {
  try {
    let { data } = await axios.get("http://localhost:8080/attractions/randomAttraction");
    mainPageAttractions.value = data;
    console.log(mainPageAttractions.value);
  } catch (error) {
    console.error(error);
  }
}

getMainAttraction();
</script>
