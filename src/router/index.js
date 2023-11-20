import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import BlogPage from "@/components/BlogPage.vue";
import CategoryPage from "@/components/CategoryPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import SearchResultPage from "@/components/SearchResultPage.vue";
import SinglePage from "@/components/SinglePage.vue";
import JoinPage from "@/components/JoinPage.vue";
import MyPage from "@/components/MyPage.vue";
import AttractionDetailPage from "@/components/AttractionDetailPage.vue";
import EditProfilePage from "@/components/EditProfilePage.vue";
import DeleteAccountPage from "@/components/DeleteAccountPage.vue";
import AttractionPage from "@/components/AttractionPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainPage,
    },
    {
      path: "/myPage",
      component: MyPage,
    },
    {
      path: "/blog",
      component: BlogPage,
    },
    {
      name: "Catogory",
      path: "/category",
      component: CategoryPage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/join",
      component: JoinPage,
    },
    {
      path: "/searchResult",
      component: SearchResultPage,
    },
    { name: "Single", path: "/single", component: SinglePage },

    {
      path: "/attractionDetail",
      name: "attractionDetail",
      component: AttractionDetailPage,
    },
    {
      path: "/editProfile",
      name: "editProfile",
      component: EditProfilePage,
    },
    {
      path: "/deleteUser",
      name: "deleteUser",
      component: DeleteAccountPage,
    },
    {
      path: "/blogPage",
      component: BlogPage,
    },
    {
      path: "/attractionPage",
      component: AttractionPage,
    },
  ],
});

export default router;
