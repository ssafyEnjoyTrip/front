<template>
  <div class="section bg-light">
    <div class="container">
      <div class="row mb-2">
        <div class="col-sm-auto">
          <h2 class="posts-entry-title">Random Attraction</h2>
        </div>
      </div>

      <div class="row align-items-stretch retro-layout-alt">


        <div class="col-md-6" v-for="(item, index) in loopItems" :key="index">
          <a class="hentry img-2 v-height mb30 gradient" @click="goToAttraction(item.one.attractionId)">
            <img :src="item.one.firstImage" class="featured-img" alt="">
            <div class="text text-sm">
              <h2>{{ item.one.title }} </h2>
            </div>
          </a>

          <div class="two-col d-block d-md-flex justify-content-between">
            <a class="hentry v-height img-2 gradient" @click="goToAttraction(item.one.attractionId)">
              <img :src="item.two.firstImage" class="featured-img" alt="">
              <div class="text text-sm">
                <h2>{{ item.two.title }}</h2>
              </div>
            </a>
            <a class="hentry v-height img-2 ms-auto float-end gradient" @click="goToAttraction(item.one.attractionId)">
              <img :src="item.three.firstImage" class="featured-img" alt="">
              <div class="text text-sm">
                <h2>{{ item.three.title }} </h2>
              </div>
            </a>
          </div>
        </div>



      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref, onMounted, } from "vue";
import { useAttractionStore } from "@/stores/AttractionStore"
const { goToAttraction } = useAttractionStore();
const loopItems = ref([]);
const fetchData = async () => {
  try {
    let { data } = await axios.get("http://localhost:8080/attractions/randomAttraction")
    let obj = {
      one: {},
      two: {},
      three: {}
    }
    data.forEach((el, index) => {
      if (index % 3 == 0) obj.one = el;
      else if (index % 3 == 1) obj.two = el;
      else if (index % 3 == 2) {
        obj.three = el
        loopItems.value.push({ ...obj })
      }
    })
    console.log(loopItems.value);
  } catch (error) {
    console.error(error);
  }
}
onMounted(() => {
  fetchData()
})
</script>

