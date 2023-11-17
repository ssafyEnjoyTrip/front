<template>	
	<div class="site-cover site-cover-sm same-height overlay single-page" style="background-image: url('images/img_1_horizontal.jpg');">
		<div class="container">
			<div class="row same-height justify-content-center">
				<div class="col-md-6">
					<div class="post-entry text-center">
						<h1 class="mb-4">MyPage</h1>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="container mt-5">
    <div class="row">
      <div class="col-md-4">
        <!-- User Profile Card -->
        <div class="card">
          <img src="@/assets/profile.webp" class="img-fluid" alt="User Avatar">
          <div class="card-body">
            <h5 class="card-title text-center">{{ user.name }}</h5>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <!-- User Details -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">회원 정보</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Email:</strong> {{ user.email }}</li>
              <li class="list-group-item"><strong>Joined Date:</strong> {{ user.joinedDate }}</li>
			  <li class="list-group-item"><strong>phoneNum:</strong> {{ user.phoneNum }}</li>
              <!-- Add more user details as needed -->
            </ul>
			<div class="mt-3">
				<router-link :to="{ name: 'editProfile', query: { userId: user.id} }" class="btn btn-primary">Edit Profile</router-link>
				<router-link :to="{ name: 'deleteUser', query: { userId: user.id} }" class="btn btn-primary">Delete Account</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

	<section class="section posts-entry posts-entry-sm bg-light">
		<div class="container">
			<div class="row mb-4">
				<div class="col-12">
					<h2 class="text-uppercase fw-bold text-black mb-4">즐겨찾기한 관광지</h2>
				</div>
			</div>
			<div class="row">
				<div v-for="(attraction, index) in bookMarkAttractionList" :key="attraction.attractionId" class="col-md-6 col-lg-3">
					<router-link :to="{ name: 'attractionDetail', query: { attractionId: attraction.attractionId } }" class="nav-link">
						<div class="blog-entry">
							<a href="#" class="img-link">
								<img v-if="attraction.firstImage" :src="attraction.firstImage" alt="Attraction Image" class="img-fluid">
								<img v-else src="@/assets/no-image.avif" alt="No Image" class="img-fluid">
							</a>
							<h2><a href="#">{{ attraction.title }}</a></h2>
						</div>
					</router-link>
					
				</div>
			</div>
		</div>
	</section>

	<div class="section sec-halfs py-0">
		<div class="container">
			<div class="half-content d-lg-flex align-items-stretch">
				<div class="img" style="background-image: url('images/hero_1.jpg')" data-aos="fade-in" data-aos-delay="100">
					
				</div>
				<div class="text">
					<h2 class="heading text-primary mb-3">Resources for makers and creatives</h2>
					<p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
					<p><a href="#" class="btn btn-outline-primary py-2">Read more</a></p>
				</div>
			</div>

			<div class="half-content d-lg-flex align-items-stretch">
				<div class="img order-md-2" style="background-image: url('images/hero_2.jpg')" data-aos="fade-in">
					
				</div>
				<div class="text">
					<h2 class="heading text-primary mb-3">We are trusted by more than 5,000 clients</h2>
					<p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
					<p><a href="#" class="btn btn-outline-primary py-2">Read more</a></p>
				</div>
			</div>
		</div>

	</div>



	<div class="section">
		<div class="container">
			<div class="row justify-content-between">
				<div class="col-lg-7 mb-4 mb-lg-0">
					<img src="images/img_7_sq.jpg" alt="Image" class="img-fluid rounded
					">
				</div>
				<div class="col-lg-4 ps-lg-2">
					<div class="mb-5">
						<h2 class="text-black h4">Publishing platform for professional bloggers</h2>
						<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
					</div>
					<div class="d-flex mb-3 service-alt">
						<div>
							<span class="bi-wallet-fill me-4"></span>
						</div>
						<div>
							<h3>Building your blog</h3>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
						</div>
					</div>

					<div class="d-flex mb-3 service-alt">
						<div>
							<span class="bi-pie-chart-fill me-4"></span>
						</div>
						<div>
							<h3>Resources and insights</h3>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
						</div>
					</div>

					<div class="d-flex mb-3 service-alt">
						<div>
							<span class="bi-bag-check-fill me-4"></span>
						</div>
						<div>
							<h3>Blog just for you</h3>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
						</div>
					</div>

				</div>

			</div>
		</div>
	</div>

</template>


<script setup>
import axios from 'axios';
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { ref, reactive } from 'vue';
const { authStore } = useUserStore();
const router = useRouter();
const bookMarkAttractionList = ref([]);
const Bookmarks = async () => {

	let userId = authStore.userId;
	if (userId === 0) {
		alert("로그인을 먼저 해주세요!")
		router.push(`/login`)
	}

	try {
		let { data } = await axios.get('api/users/myPage/' + userId);
		bookMarkAttractionList.value = data.bookMarkAttractionList || [];   
    }catch (error) {
        console.log(error)
    }
    
}

Bookmarks();
const user = reactive({
	id: authStore.userId,
  	name: authStore.userName,
  	email: authStore.userEmail,
	joinedDate: authStore.userRegisterTime,
	phoneNum: authStore.userPhoneNum,
  // Add more user details as needed
});

</script>

<style scoped>

</style>