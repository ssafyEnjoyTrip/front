<template>
  <div class="site-cover site-cover-sm same-height overlay single-page" style="background-image: url(&quot;images/hero_5.jpg&quot;)">
    <div class="container">
      <div class="row same-height justify-content-center">
        <div class="col-md-6">
          <div class="post-entry text-center">
            <h1 class="mb-4">{{ route.query.title }}</h1>
            <div class="post-meta align-items-center text-center">
              <figure class="author-figure mb-0 me-3 d-inline-block">
                <img src="images/person_1.jpg" alt="Image" class="img-fluid" />
              </figure>
              <span class="d-inline-block mt-1">{{ route.query.name }}</span>
              <span>&nbsp;-&nbsp; {{ route.query.registerTime }}</span>
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
            <p>{{ route.query.content }}</p>
            <div class="row my-4">
              <div class="col-md-12 mb-4">
                <img src="images/hero_1.jpg" alt="Image placeholder" class="img-fluid rounded" />
              </div>
              <div class="col-md-6 mb-4">
                <img src="images/img_2_horizontal.jpg" alt="Image placeholder" class="img-fluid rounded" />
              </div>
              <div class="col-md-6 mb-4">
                <img src="images/img_3_horizontal.jpg" alt="Image placeholder" class="img-fluid rounded" />
              </div>
            </div>
          </div>

          <div class="pt-5">
            <p>Categories: <a href="#">Food</a>, <a href="#">Travel</a> Tags: <a href="#">#manila</a>, <a href="#">#asia</a></p>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-sm btn-primary" @click="">글수정</button>
            <button class="btn btn-sm btn-primary" @click="articleDelete(route.query.articleId)">글삭제</button>
          </div>

          <div class="pt-5 comment-wrap">
            <h3 class="mb-5 heading">{{ commentList.length }} Comments</h3>
            <div>
            <!-- 이미지를 클릭할 때 toggleLike 함수 호출 -->
            <img
              v-if="isLiked"
              src="@/assets/heart.svg"
              alt="Liked"
              @click="toggleLike"
              style="width: 20px; height: 20px; cursor: pointer;"
            />
            <img
              v-else
              src="@/assets/noheart.svg"
              alt="Not Liked"
              @click="toggleLike"
              style="width: 20px; height: 20px; cursor: pointer;"
            />
            <span>   좋아요 ssadas 개</span>
          </div>
            <ul class="comment-list">
              <li class="comment" v-for="comment in commentList" :key="comment.id">
                <div class="vcard">
                  <img src="images/person_1.jpg" alt="Image placeholder" />
                </div>
                <div class="comment-body">
                  <h3>{{ comment.article.name }}</h3>
                  <div class="meta">{{ comment.article.registerTime }}</div>
                  <p>
                    {{ comment.comment }}
                  </p>
                  <p><a href="#" class="reply rounded">Reply</a></p>
                </div>
              </li>
            </ul>

            <!-- END comment-list -->

            <div class="comment-form-wrap pt-5" v-show="storage.isLogin">
              <h3 class="mb-5">Leave a comment</h3>
              <div class="form-group">
                <label for="name">Name *</label>
                <input type="text" class="form-control" id="name" v-model="storage.userName" />
              </div>
              <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" class="form-control" id="email" v-model="storage.email" />
              </div>

              <div class="form-group">
                <label for="message">Message</label>
                <textarea name="" id="message" cols="30" rows="10" class="form-control" v-model="commentValue"></textarea>
              </div>
              <div class="form-group">
                <button class="btn btn-primary" @click="setting()">Post Comment</button>
              </div>
            </div>
          </div>
        </div>

        <!-- END main-content -->

        <div class="col-md-12 col-lg-4 sidebar">
          <div class="sidebar-box search-form-wrap">
            <form action="#" class="sidebar-search-form">
              <span class="bi-search"></span>
              <input type="text" class="form-control" id="s" placeholder="Type a keyword and hit enter" v-model="keyword" @click="search(keyword)" />
            </form>
          </div>
          <!-- END sidebar-box -->
          <div class="sidebar-box">
            <div class="bio text-center">
              <img src="images/person_2.jpg" alt="Image Placeholder" class="img-fluid mb-3" />
              <div class="bio-body">
                <h2>Hannah Anderson</h2>
                <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.</p>
                <p><a href="#" class="btn btn-primary btn-sm rounded px-2 py-2">Read my bio</a></p>
                <p class="social">
                  <a href="#" class="p-2"><span class="fa fa-facebook"></span></a>
                  <a href="#" class="p-2"><span class="fa fa-twitter"></span></a>
                  <a href="#" class="p-2"><span class="fa fa-instagram"></span></a>
                  <a href="#" class="p-2"><span class="fa fa-youtube-play"></span></a>
                </p>
              </div>
            </div>
          </div>
          <!-- END sidebar-box -->
          <div class="sidebar-box">
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
          </div>
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
        <div class="col-md-6 col-lg-3">
          <div class="blog-entry">
            <a href="single.html" class="img-link">
              <img src="images/img_1_horizontal.jpg" alt="Image" class="img-fluid" />
            </a>
            <span class="date">Apr. 14th, 2022</span>
            <h2><a href="single.html">Thought you loved Python? Wait until you meet Rust</a></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p><a href="#" class="read-more">Continue Reading</a></p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="blog-entry">
            <a href="single.html" class="img-link">
              <img src="images/img_2_horizontal.jpg" alt="Image" class="img-fluid" />
            </a>
            <span class="date">Apr. 14th, 2022</span>
            <h2><a href="single.html">Startup vs corporate: What job suits you best?</a></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p><a href="#" class="read-more">Continue Reading</a></p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="blog-entry">
            <a href="single.html" class="img-link">
              <img src="images/img_3_horizontal.jpg" alt="Image" class="img-fluid" />
            </a>
            <span class="date">Apr. 14th, 2022</span>
            <h2><a href="single.html">UK sees highest inflation in 30 years</a></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p><a href="#" class="read-more">Continue Reading</a></p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="blog-entry">
            <a href="single.html" class="img-link">
              <img src="images/img_4_horizontal.jpg" alt="Image" class="img-fluid" />
            </a>
            <span class="date">Apr. 14th, 2022</span>
            <h2><a href="single.html">Don’t assume your user data in the cloud is safe</a></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p><a href="#" class="read-more">Continue Reading</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import axios from 'axios';
import { useArticleStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const route = useRoute();
const store = useArticleStore();
const userStore = useUserStore();
const commentValue = ref("");
const comment = ref({});
const isLiked = ref(false);
const keyword = ref("");
const storage = ref(sessionStorage);
const articleId = route.query.articleId;
const setting = () => {
  comment.value = {
    article: route.query.articleId,
    userId: storage.value.userId,
    comment: commentValue.value,
  };

  saveComment(comment);
};

const { articleDelete, loadComment, saveComment } = store;
const { commentList } = storeToRefs(store);
loadComment(route.query.articleId);
console.log(commentList);
console.log("길이는?" + commentList.length);



const toggleLike = async () => {
  try {
    if (isLiked.value) {
      // Unlike the article
      await axios.delete(`api/hearts/${articleId}`);
    } else {
      // Like the article
      await axios.post(`api/hearts/${articleId}`);
    }

    // Toggle the like status
    isLiked.value = !isLiked.value;
  } catch (error) {
    console.error(error);
  }
};
const checkHeart = async () => {
  try {  
      let {data} = await axios.post(`api/hearts/check/${articleId}`);

      if (data) {
        isLiked.value = true;
      }

    } catch (error) {
        console.error(error);
  }


  console.log(isLiked.value);
}

checkHeart(); // 좋아요 한 게시물인지 확인, 그리고 isLiked 갱신
</script>
