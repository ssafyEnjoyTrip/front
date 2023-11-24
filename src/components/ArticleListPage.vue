<template>
  <div class="site-cover site-cover-sm same-height overlay single-page"
    style="background-image: url('images/img_1_horizontal.jpg');">
    <div class="container">
      <div class="row same-height justify-content-center">
        <div class="col-md-6">
          <div class="post-entry text-center">
            <h1 class="mb-4">게시글 목록</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section search-result-wrap">
    <div class="container">
      <div class="row posts-entry">
        <div class="col-lg-8">
          <div class="blog-entry d-flex blog-entry-search-item" v-for="(item, index) in articleList" :key="index">
            <a class="img-link me-4">
              <img v-if:src="thumbnail[index]" :alt="thumbnail[index]" class="img-fluid please-cursor"
                @click="goToArticle(item.articleId)" />
              <img v-else src="@/assets/no-image.avif" alt="No Image" class="img-fluid">
            </a>
            <div class="please-cursor" @click="goToArticle(item.articleId)">
              <span class="date">{{ toDate(item.registerTime) }} &bullet; {{ item.user.name }}</span>
              <h2>{{ item.title }}</h2>
              <p v-html="item.content"></p>
            </div>
          </div>

          <PaginationUI v-on:call-parent="movePage"></PaginationUI>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-sm btn-primary" @click="showInsertModal" v-show="isLogin">글쓰기</button>
            <insert-modal v-on:call-parent-insert="closeAfterInsert"></insert-modal>
          </div>
          <br />
        </div>

        <div class="col-lg-4 sidebar" style="position: sticky; height:calc(100vh - 7rem); top: 1rem;">
          <div class="sidebar-box search-form-wrap mb-4">
            <input type="text" class="form-control" placeholder="Type a keyword and hit enter"
              v-model="articleStore.searchWord" />
            <button type="button" class="btn btn-light" @click="search()">검색</button>
          </div>
          <side-bar-page></side-bar-page>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useArticleStore } from "@/stores/articleStore";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed } from "vue";
//component

import InsertModal from "./modals/InsertModal.vue";
import PaginationUI from "@/components/PaginationUI.vue";

//common
import util from "@/common/util.js";
import SideBarPage from "@/components/SidebarPage.vue";
//bootstrap 객체 생성
import { Modal } from "bootstrap";

const store = useArticleStore();
const authStore = useAuthStore();

const { list, goToArticle, search, setArticleMovePage, toDate, articleStore } = store;

const { articleList, thumbnail } = storeToRefs(store);
const { isLogin } = storeToRefs(authStore);

const thumbnailImage = computed(() => {
  return articleList.value.articleFiles;
})

let insertModal = null;
//mount 안된 상태에서는 document 내에 정보가 없기 때문에!
onMounted(() => {
  insertModal = new Modal(document.getElementById("insertModal"));
});

const showInsertModal = () => insertModal.show();


// pagination
const movePage = (pageIndex) => {
  setArticleMovePage(pageIndex);
  list();
};

const closeAfterInsert = () => {
  console.log("closeAfterInsert");
  insertModal.hide();
  list();
};
list();
</script>

<style>
tr,
td {
  border: 1px solid black;
}

.please-cursor {
  cursor: pointer;
}
</style>
