<template>
  <div class="site-cover site-cover-sm same-height overlay single-page"
    style="background-image: url(&quot;images/hero_5.jpg&quot;)">
    <div class="container">
      <div class="row same-height justify-content-center">
        <div class="col-md-6">
          <div class="post-entry text-center">
            <h1 class="mb-4">{{ articleDetail.title }}</h1>
            <div class="post-meta align-items-center text-center">
              <figure class="author-figure mb-0 me-3 d-inline-block">

              </figure>
              <span class="d-inline-block mt-1">{{ articleDetail.user.name }}</span>
              <span>&nbsp;-&nbsp; {{ toDate(articleDetail.registerTime) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section">
    <div class="container">
      <div class="row blog-entries element-animate">
        <div class="col-md-12 col-lg-8 main-content">
          <div class="post-content-body">
            <p v-html="articleDetail.content"></p>
            <div class="row my-4">
              <div class="col-md-12 mb-4" v-for="item in articleDetail.articleFiles" :key="item.id">
                <img :src="item.fileUrl" :alt="item.fileUrl" class="img-fluid rounded" />
              </div>
            </div>
          </div>

          <div class="pt-5">
            <p>Categories: <a href="#">Food</a>, <a href="#">Travel</a> Tags: <a href="#">#manila</a>, <a
                href="#">#asia</a></p>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button v-show="writer" class="btn btn-sm btn-primary" @click="showInsertModal">글수정</button>
            <button v-show="writer" class="btn btn-sm btn-primary"
              @click="articleDelete(route.query.articleId)">글삭제</button>
            <insert-modal v-show="writer"></insert-modal>
          </div>

          <div class="pt-5 comment-wrap">
            <div style="display: flex; align-items: center; justify-content: space-between">
              <h3 class="mb-5 heading">{{ commentList.length }} Comments</h3>

              <!-- 이미지를 클릭할 때 toggleLike 함수 호출 -->
              <div class="mb-5 heading" style="border: transparent; padding-bottom: 32px">
                <img v-show="isLiked" src="@/assets/heart.svg" alt="Liked" @click="toggleLike(-1)"
                  style="width: 20px; height: 20px; cursor: pointer" />
                <img v-show="!isLiked" src="@/assets/noheart.svg" alt="Not Liked" @click="toggleLike(1)"
                  style="width: 20px; height: 20px; cursor: pointer" />
                <span> 좋아요 {{ articleDetail.heartCount }} 개</span>
              </div>
            </div>
            <ul class="comment-list">
              <li class="comment" v-for="comment in commentList" :key="comment.id">
                <div class="vcard">
                  <!-- <img src="images/person_1.jpg" alt="Image placeholder" /> -->
                </div>
                <div class="comment-body">
                  <h3>{{ comment.user.name }}</h3>
                  <div class="meta">{{ toDate(comment.commentRegisterTime) }}</div>
                  <p>{{ comment.comment }}</p>
                </div>
              </li>
            </ul>

            <!-- END comment-list -->

            <div class="comment-form-wrap pt-5">
              <h3 class="mb-5">Leave a comment</h3>
              <div class="form-group">
                <label for="name">Name *</label>
                <input type="text" class="form-control" id="name" v-model="storage.userName" readOnly v-if="isLogin" />
                <input type="text" class="form-control" id="name" placeholder="로그인을 해주세요" readOnly v-if="!isLogin" />
              </div>
              <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" class="form-control" id="email" v-model="storage.email" readOnly v-if="isLogin" />
                <input type="email" class="form-control" id="email" placeholder="로그인을 해주세요" v-if="!isLogin" readOnly />
              </div>

              <div class="form-group">
                <label for="message">Message</label>
                <textarea name="" id="message" cols="30" rows="10" class="form-control" v-model="commentValue"
                  v-if="isLogin"></textarea>
                <textarea name="" id="message" cols="30" rows="10" class="form-control" placeholder="로그인을 해주세요"
                  v-if="!isLogin" readonly></textarea>
              </div>
              <div class="form-group">
                <button class="btn btn-primary" @click="setting()" v-if="isLogin">Post Comment</button>
                <button class="btn btn-primary disabled" v-if="!isLogin">Post Comment</button>
              </div>
            </div>
          </div>
        </div>

        <!-- END main-content -->

        <div class="col-lg-4 sidebar" style="position: sticky; height:calc(100vh - 7rem); top: 1rem;">

          <side-bar-page></side-bar-page>
        </div>
        <!-- END sidebar -->
      </div>
    </div>
  </section>

  <!-- Start posts-entry -->
  <section class="section posts-entry posts-entry-sm bg-light">
    <div class="container">
      <div class="row mb-4">
        <div class="col-12 text-uppercase text-black">More Blog Posts</div>
      </div>
      <div class="row">
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useArticleStore } from "@/stores/articleStore";
import { storeToRefs } from "pinia";
import { Modal } from "bootstrap";
import InsertModal from "@/components/modals/InsertModal.vue";
import { useAuthStore } from "@/stores/authStore";
import SideBarPage from "@/components/SideBarPage.vue"
const { isLogin } = storeToRefs(useAuthStore());

const route = useRoute();
const store = useArticleStore();
const { articleDelete, loadComment, saveComment, getDetailArticle, incrementHeartCount, decrementHeartCount } = store;
const { commentList, articleDetail } = storeToRefs(store);
const commentValue = ref("");
const comment = ref({});
const isLiked = ref(false);
const keyword = ref("");
const storage = ref(sessionStorage);
let insertModal = null;
const writer = ref(false);

const updateValue = ref({
  title: "",
  content: "",
  articleFiles: {
    fileUrl: ""
  }
})

const articleId = route.query.articleId;
console.log(articleId);

const setting = () => {
  comment.value = {
    article: articleId,
    userId: storage.value.userId,
    comment: commentValue.value,
  };

  saveComment(comment);
};

const toDate = (date) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Seoul",
  });
  return formattedDate;
};

const toggleLike = async (number) => {
  try {
    if (isLiked.value) {
      // Unlike the article
      await axios.delete(`api/hearts/${articleId}`);
      decrementHeartCount();
    } else {
      // Like the article
      await axios.post(`api/hearts/${articleId}`);
      incrementHeartCount();
    }
    getDetailArticle(articleId);
    // Toggle the like status
    isLiked.value = !isLiked.value;
  } catch (error) {
    console.error(error);
  }
};
const checkHeart = async () => {
  try {
    let { data } = await axios.post(`api/hearts/check/${articleId}`);
    if (data) {
      isLiked.value = true;
    }
  } catch (error) {
    console.error(error);
  }
};

const isArticleWriter = (articleUserId) => {
  if (sessionStorage.userId == articleUserId) writer.value = true;
  else writer.value = false;
  console.log(writer.value);
};

onMounted( () => {
  insertModal = new Modal(document.getElementById("insertModal"));
  isArticleWriter(articleDetail.value.user.userId); // article 작성자의 ID와 로그인한 user의 ID를 확인해서 일치하면 글 수정, 삭제 버튼 활성화
  checkHeart(); // 좋아요 한 게시물인지 확인, 그리고 isLiked 갱신
  updateValue.value = articleDetail.value;
  console.log(articleDetail);
});

const showInsertModal = () =>{
  insertModal.show();
  return articleId;
} 

getDetailArticle(articleId);
loadComment(articleId);
</script>
