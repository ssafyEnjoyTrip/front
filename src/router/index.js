import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import AboutPage from "@/components/AboutPage.vue";
import BlogPage from "@/components/BlogPage.vue";
import CategoryPage from "@/components/CategoryPage.vue";
import ContactPage from "@/components/ContactPage.vue";
import SearchResultPage from "@/components/SearchResultPage.vue";
import SinglePage from "@/components/SinglePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: MainPage,
        },
        {
            path: "/about",
            component: AboutPage,
        },
        {
            path: "/blog",
            component: BlogPage,
        },
        {
            path: "/category",
            component: CategoryPage,
        },
        {
            path: "/contact",
            component: ContactPage,
        },
        {
            path: "/searchResult",
            component: SearchResultPage,
        },
        {
            path: "/single",
            component: SinglePage,
        },
    ],
});

export default router;
