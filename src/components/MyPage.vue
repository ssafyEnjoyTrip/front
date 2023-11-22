<template>
	<div class="site-cover site-cover-sm same-height overlay single-page"
		style="background-image: url('images/img_1_horizontal.jpg');">
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
							<router-link :to="{ name: 'editProfile', query: { userId: user.id } }"
								class="btn btn-primary">Edit Profile</router-link>
							<router-link :to="{ name: 'deleteUser', query: { userId: user.id } }"
								class="btn btn-primary">Delete Account</router-link>
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
				<div v-for="(attraction, index) in bookMarkAttractionList" :key="attraction.attractionId"
					class="col-md-6 col-lg-3">
					<router-link :to="{ name: 'attractionDetail', query: { attractionId: attraction.attractionId } }"
						class="nav-link">
						<div class="blog-entry">
							<a href="#" class="img-link">
								<img v-if="attraction.firstImage" :src="attraction.firstImage" alt="Attraction Image"
									class="img-fluid">
								<img v-else src="@/assets/no-image.avif" alt="No Image" class="img-fluid">
							</a>
							<h2><a href="#">{{ attraction.title }}</a></h2>
						</div>
					</router-link>

				</div>
			</div>
		</div>
	</section>

	<section class="section posts-entry posts-entry-sm bg-light">
		<div class="container">
			<div class="row mb-4">
				<div class="col-12">
					<h2 class="text-uppercase fw-bold text-black mb-4">좋아요한 게시글</h2>
				</div>
			</div>
			<div class="row">
				<div v-for="(article, index) in heartArticleList" :key="article.articleId" class="col-md-6 col-lg-3">
					<div @click="goToArticle(article.articleId)">
						<div class="blog-entry">
							<!-- <a href="#" class="img-link">
								<img v-if="attraction.firstImage" :src="attraction.firstImage" alt="Attraction Image" class="img-fluid">
								<img v-else src="@/assets/no-image.avif" alt="No Image" class="img-fluid">
							</a> -->
							<h2>{{ article.title }}</h2>
						</div>
					</div>

				</div>
			</div>
		</div>
	</section>

	<section class="section posts-entry posts-entry-sm bg-light">
		<div class="container">
			<div class="row mb-4">
				<div class="col-12">
					<h2 class="text-uppercase fw-bold text-black mb-4">내가 작성한 게시글</h2>
				</div>
			</div>
			<div class="row">
				<div v-for="(article, index) in MyArticleList" :key="article.articleId" class="col-md-6 col-lg-3">
					<div @click="goToArticle(article.articleId)">
						<div class="blog-entry">
							<h2>{{ article.title }}</h2>
							<h2 v-html="article.content"></h2>
						</div>
					</div>

				</div>
			</div>
		</div>
	</section>

	<section class="section posts-entry posts-entry-sm bg-light">
		<div class="container">
			<div class="row mb-4">
				<div class="col-12">
					<h2 class="text-uppercase fw-bold text-black mb-4">내가 작성한 댓글</h2>
				</div>
			</div>
			<div class="row">
				<div v-for="(comment, index) in myCommentList" :key="comment.commentId" class="col-md-6 col-lg-3"
					@click="goToArticle(comment.article.articleId)">
					<div @click="detail(comment.commentId)">
						<div class="blog-entry">
							<h2>{{ comment.article.title }}</h2>
							<h2>{{ comment.comment }}</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>


<script setup>
import axios from 'axios';
import { useUserStore } from "@/stores/userStore";
import { useArticleStore } from "@/stores/articleStore";
import { useRouter } from "vue-router";
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
const { authStore } = useUserStore();
const { detail, goToArticle, } = useArticleStore();
// const {articleDetail} = storeToRefs(useArticleStore());

const router = useRouter();
const bookMarkAttractionList = ref([]);
const heartArticleList = ref([]);
const MyArticleList = ref([]);
const myCommentList = ref([]);


const Bookmarks = async () => {

	let userId = authStore.userId;
	if (userId === 0) {
		alert("로그인을 먼저 해주세요!")
		router.push(`/login`)
	}

	try {
		let { data } = await axios.get('api/users/myPage/' + userId);
		bookMarkAttractionList.value = data.bookMarkAttractionList || [];
		heartArticleList.value = data.myPageArticleList || [];
		MyArticleList.value = data.myPageWriteArticleList || [];
		myCommentList.value = data.myPageCommentList || [];
		console.log(myCommentList);
	} catch (error) {
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
/* Add your custom styles here */
.hero-section {
	margin-bottom: 50px;
}

.card {
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-danger {
	background-color: #dc3545;
	border-color: #dc3545;
}

.col-lg-3 h2 {
	border: 1px solid;
	cursor: pointer;
}

/* Add more styles as needed */</style>