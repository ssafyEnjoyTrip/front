<template>
  <div class="section search-result-wrap">
    <div class="container">
      <div class="row posts-entry">
        <div class="col-lg-8">
          <div class="blog-entry d-flex blog-entry-search-item" v-for="(item, index) in articleList" :key="index">
            <a class="img-link me-4">
              <img src="https://picsum.photos/1024/1000/?image=50" alt="Image" class="img-fluid" @click="detail(item.articleId)" />
            </a>
            <div>
              <span class="date"
                >{{ item.registerTime }} &bullet; <a href="#">{{ item.user.name }}</a></span
              >
              <h2>
                {{ item.title }}
              </h2>
              <p>{{ item.content }}</p>
              <button class="btn btn-sm btn-outline-primary">Read More</button>
            </div>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-sm btn-primary" @click="showInsertModal">글쓰기</button>
            <button class="btn btn-sm btn-primary" @click="showUpdateModal">글수정</button>
            <button class="btn btn-sm btn-primary" @click="showDetailModal">글삭제</button>
            <insert-modal v-on:call-parent-insert="closeAfterInsert"></insert-modal>
            <update-modal></update-modal>
            <detail-modal></detail-modal>
          </div>
          <br />
          <div class="row text-start pt-5 border-top">
            <div class="col-md-12">
              <div class="custom-pagination">
                <span>1</span>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <span>...</span>
                <a href="#">15</a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 sidebar">
          <div class="sidebar-box search-form-wrap mb-4">
            <input type="text" class="form-control" placeholder="Type a keyword and hit enter" v-model="keyword" />
            <button @click="search(keyword)">검색</button>
          </div>
          <side-bar-page></side-bar-page>
          <!-- END sidebar-box -->
          <!-- <div class="sidebar-box">
            <h3 class="heading">Popular Posts</h3>
            <div class="post-entry-sidebar">
              <ul>
                <li>
                  <a href="">
                    <img src="images/img_1_sq.jpg" alt="Image placeholder" class="me-4 rounded" />
                    <div class="text">
                      <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                      <div class="post-meta">
                        <span class="mr-2">March 15, 2018 </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="images/img_2_sq.jpg" alt="Image placeholder" class="me-4 rounded" />
                    <div class="text">
                      <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                      <div class="post-meta">
                        <span class="mr-2">March 15, 2018 </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src="images/img_3_sq.jpg" alt="Image placeholder" class="me-4 rounded" />
                    <div class="text">
                      <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                      <div class="post-meta">
                        <span class="mr-2">March 15, 2018 </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div> -->

          <!-- END sidebar-box -->

          <div class="sidebar-box">
            <h3 class="heading">Categories</h3>
            <ul class="categories">
              <li>
                <a href="#">Food <span>(12)</span></a>
              </li>
              <li>
                <a href="#">Travel <span>(22)</span></a>
              </li>
              <li>
                <a href="#">Lifestyle <span>(37)</span></a>
              </li>
              <li>
                <a href="#">Business <span>(42)</span></a>
              </li>
              <li>
                <a href="#">Adventure <span>(14)</span></a>
              </li>
            </ul>
          </div>
          <!-- END sidebar-box -->

          <div class="sidebar-box">
            <h3 class="heading">Tags</h3>
            <ul class="tags">
              <li><a href="#">Travel</a></li>
              <li><a href="#">Adventure</a></li>
              <li><a href="#">Food</a></li>
              <li><a href="#">Lifestyle</a></li>
              <li><a href="#">Business</a></li>
              <li><a href="#">Freelancing</a></li>
              <li><a href="#">Travel</a></li>
              <li><a href="#">Adventure</a></li>
              <li><a href="#">Food</a></li>
              <li><a href="#">Lifestyle</a></li>
              <li><a href="#">Business</a></li>
              <li><a href="#">Freelancing</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { useArticleStore } from "@/stores/articleStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

//component
// import PaginationUI from '../components/PaginationUI.vue'
import InsertModal from "../components/modals/InsertModal.vue";
import UpdateModal from "../components/modals/UpdateModal.vue";
import DetailModal from "../components/modals/DetailModal.vue";

//common
import util from "@/common/util.js";
import SideBarPage from "@/components/SidebarPage.vue";
//bootstrap 객체 생성
import { Modal } from "bootstrap";

const store = useArticleStore();

const { list, detail, search } = store;
const { articleList } = storeToRefs(store);

let insertModal = null;
let updateModal = null;
let detailModal = null;

let keyword = ref("");

//mount 안된 상태에서는 document 내에 정보가 없기 때문에!
onMounted(() => {
  insertModal = new Modal(document.getElementById("insertModal"));
  updateModal = new Modal(document.getElementById("updateModal"));
  detailModal = new Modal(document.getElementById("detailModal"));
});

const showInsertModal = () => insertModal.show();
const showUpdateModal = () => updateModal.show();
const showDetailModal = () => detailModal.show();

list();
console.log(articleList);

const closeAfterInsert = () => {
  console.log("closeAfterInsert")
  insertModal.hide();
      list();
   }
</script>

<style>
tr,
td {
  border: 1px solid black;
}
</style>
