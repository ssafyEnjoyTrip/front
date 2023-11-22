<template>
  <!-- Start posts-entry -->
  <section class="section posts-entry">
    <div class="container">
      <div class="row mb-4">
        <div class="col-sm-6">
          <h2 class="posts-entry-title">Business</h2>
        </div>
        <div class="col-sm-6 text-sm-end"><router-link to="/articleList" class="read-more">View All</router-link></div>
      </div>

      <div class="row g-3 carousel slide" data-bs-ride="carousel">
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-10">
              <div class="carousel-inner">
                <div class="carousel-item active" style="background-size: cover; background-position: 50% 50%;">
                  <img src="images/img_1_sq.jpg" data-bs-interval="100" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="images/img_2_sq.jpg" data-bs-interval="100" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="images/img_3_sq.jpg" data-bs-interval="100" class="d-block w-100" alt="...">
                </div>
              </div>
              <!-- <div class="blog-entry">
                <router-link to="/single" class="img-link">
                  <img src="images/img_1_sq.jpg" alt="Image" class="img-fluid" />
                </router-link>
                <span class="date">Apr. 14th, 2022</span>
                <h2><router-link to="/single">Thought you loved Python? Wait until you meet Rust</router-link></h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nobis ea quis inventore vel voluptas.
                </p>
                <p><router-link to="/single" class="btn btn-sm btn-outline-primary">Read More</router-link></p>
              </div> -->
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
              <p><router-link to="/single" class="read-more">Continue Reading</router-link></p>
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
              <img src="images/img_2_horizontal.jpg" alt="Image" class="img-fluid" />
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
</script>
