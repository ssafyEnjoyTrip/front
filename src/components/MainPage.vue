<template>
  <!-- Start posts-entry -->
  <section class="section posts-entry">
    <div class="container">
      <div class="row mb-4">
        <div class="col-sm-6">
          <h2 class="posts-entry-title">뭘로하지</h2>
        </div>
      </div>

      <div class="row g-3 carousel slide" data-bs-ride="carousel">
        <div class="col-md-6">
          <div class="row">
            <div class="blog-entry carousel-inner">
              <div class="carousel-item active" style="background-size: cover; background-position: 50% 50%;">
                <img :src="mainPageAttractions[0].firstImage" data-bs-interval="1"
                  class="d-block w-100 img-fluid featured-img" alt="...">
                <input type="hidden" v-model="mainPageAttractions[0].attractionId">
                <div class=" text text-sm">
                  <h2>{{ mainPageAttractions[0].title }} </h2>
                </div>
              </div>
              <div class="carousel-item">
                <img :src="mainPageAttractions[1].firstImage" data-bs-interval="1" class="d-block w-100" alt="...">
                <div class="text text-sm">
                  <h2>{{ mainPageAttractions[1].title }} </h2>
                </div>
              </div>
              <div class="carousel-item">
                <img :src="mainPageAttractions[2].firstImage" data-bs-interval="1" class="d-block w-100" alt="...">
                <div class="text text-sm">
                  <h2>{{ mainPageAttractions[2].title }} </h2>
                </div>
              </div>
              <div class="carousel-item">
                <img :src="mainPageAttractions[3].firstImage" data-bs-interval="1" class="d-block w-100" alt="...">
                <div class="text text-sm">
                  <h2>{{ mainPageAttractions[3].title }} </h2>
                </div>
              </div>
              <div class="carousel-item">
                <img :src="mainPageAttractions[4].firstImage" data-bs-interval="1" class="d-block w-100" alt="...">
                <div class="text text-sm">
                  <h2>{{ mainPageAttractions[4].title }} </h2>
                </div>
              </div>
              <div class="carousel-item">
                <img :src="mainPageAttractions[5].firstImage" data-bs-interval="1" class="d-block w-100" alt="...">
                <div class="text text-sm">
                  <h2>{{ mainPageAttractions[5].title }} </h2>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="col-md-6">
          <ul class="list-unstyled blog-entry-sm">
            <li v-for="item in mainPageAttractions" :key="item.attractionId">
              <h3 style="cursor: pointer;" @click="useAttractionStore().goToAttraction(item.attractionId)">{{
                item.title }}놀러가기</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- End posts-entry -->
  <random-attraction></random-attraction>
  <!-- Start posts-entry -->
  <section class="section posts-entry posts-entry-sm bg-light">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-3">
          <div class="blog-entry">
            <router-link to="/single" class="img-link">
              <img src="images/img_1_horizontal.jpg" alt="Image" class="img-fluid" />
            </router-link>
            <span class="date">Apr. 14th, 2022</span>
            <h2><router-link to="/single">Thought you loved Python? Wait until you meet Rust</router-link></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p><router-link to="/single" class="read-more">Continue Reading</router-link></p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="blog-entry">
            <router-link to="/single" class="img-link">
              <img src="images/img_2_horizontal.jpg" alt="Image" class="img-fluid featured-img" />
            </router-link>
            <span class="date">Apr. 14th, 2022</span>
            <h2><router-link to="/single">Startup vs corporate: What job suits you best?</router-link></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p><router-link to="/single" class="read-more">Continue Reading</router-link></p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="blog-entry">
            <router-link to="/single" class="img-link">
              <img src="images/img_3_horizontal.jpg" alt="Image" class="img-fluid" />
            </router-link>
            <span class="date">Apr. 14th, 2022</span>
            <h2><router-link to="/single">UK sees highest inflation in 30 years</router-link></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p><router-link to="/single" class="read-more">Continue Reading</router-link></p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="blog-entry">
            <router-link to="/single" class="img-link">
              <img src="images/img_4_horizontal.jpg" alt="Image" class="img-fluid" />
            </router-link>
            <span class="date">Apr. 14th, 2022</span>
            <h2><router-link to="/single">Don’t assume your user data in the cloud is safe</router-link></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p><router-link to="/single" class="read-more">Continue Reading</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End posts-entry -->

  <!-- Start posts-entry -->
  <section class="section posts-entry">
    <div class="container">
      <div class="row mb-4">
        <div class="col-sm-6">
          <h2 class="posts-entry-title">Culture</h2>
        </div>
        <div class="col-sm-6 text-sm-end"><a href="#" class="read-more">View All</a></div>
      </div>
      <div class="row g-3">
        <div class="col-md-9 order-md-2">
          <div class="row g-3">
            <div class="col-md-6">
              <div class="blog-entry">
                <router-link to="/single" class="img-link">
                  <img src="images/img_1_sq.jpg" alt="Image" class="img-fluid" />
                </router-link>
                <span class="date">Apr. 14th, 2022</span>
                <h2><router-link to="/single">Thought you loved Python? Wait until you meet Rust</router-link></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nobis ea quis inventore vel voluptas.
                </p>
                <p><router-link to="/single" class="btn btn-sm btn-outline-primary">Read More</router-link></p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="blog-entry">
                <router-link to="/single" class="img-link">
                  <img src="images/img_2_sq.jpg" alt="Image" class="img-fluid" />
                </router-link>
                <span class="date">Apr. 14th, 2022</span>
                <h2><router-link to="/single">Startup vs corporate: What job suits you best?</router-link></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nobis ea quis inventore vel voluptas.
                </p>
                <p><router-link to="/single" class="btn btn-sm btn-outline-primary">Read More</router-link></p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <ul class="list-unstyled blog-entry-sm">
            <li>
              <span class="date">Apr. 14th, 2022</span>
              <h3><router-link to="/single">Don’t assume your user data in the cloud is safe</router-link></h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nobis ea quis inventore vel voluptas.</p>
              <p><router-link to="/single" class="read-more">Continue Reading</router-link></p>
            </li>

            <li>
              <span class="date">Apr. 14th, 2022</span>
              <h3><router-link to="/single">Meta unveils fees on metaverse sales</router-link></h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nobis ea quis inventore vel voluptas.</p>
              <p><a href="#" class="read-more">Continue Reading</a></p>
            </li>

            <li>
              <span class="date">Apr. 14th, 2022</span>
              <h3><router-link to="/single">UK sees highest inflation in 30 years</router-link></h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nobis ea quis inventore vel voluptas.</p>
              <p><router-link to="/single" class="read-more">Continue Reading</router-link></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import RandomAttraction from "@/components/RandomAttraction.vue";
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
