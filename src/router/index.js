import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";

import ArticleListPage from "@/components/ArticleListPage.vue";
import LoginPage from "@/components/LoginPage.vue";

import SinglePage from "@/components/SinglePage.vue";
import JoinPage from "@/components/JoinPage.vue";
import MyPage from "@/components/MyPage.vue";
import AttractionDetailPage from "@/components/AttractionDetailPage.vue";
import EditProfilePage from "@/components/EditProfilePage.vue";
import DeleteAccountPage from "@/components/DeleteAccountPage.vue";
import AttractionPage from "@/components/AttractionPage.vue";
import KakaoMap from "@/components/KakaoMap.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: MainPage, },
    { path: "/myPage", component: MyPage },
    { name: "ArticleList", path: "/articleList", component: ArticleListPage, },
    { path: "/login", component: LoginPage },
    { path: "/join", component: JoinPage },
    { name: "Single", path: "/single", component: SinglePage },
    { path: "/attractionDetail", name: "attractionDetail", component: AttractionDetailPage },
    { path: "/editProfile", name: "editProfile", component: EditProfilePage },
    { path: "/deleteUser", name: "deleteUser", component: DeleteAccountPage },
    { path: "/attractionPage", component: AttractionPage },
    { path: "/kakaomap", component: KakaoMap },
  ],
});

export default router;
