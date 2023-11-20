import axios from "axios";
import { ref } from "vue";
import router from "../router";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useArticleStore = defineStore("articleStore", () => {
  const route = useRoute();

  const article = ref({});
  const articleList = ref([]);
  const commentList = ref([]);

  const list = async () => {
    console.log("list()");
    try {
      let response = await axios.get("http://localhost:8080/article/list");
      let { data } = await response;
      articleList.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  const detail = async (articleId) => {
    console.log("detail()");
    console.log(articleId);
    try {
      let response = await axios.get("http://localhost:8080/article/" + articleId);
      let { data } = await response;

      router.push({
        name: "Single",
        query: {
          articleId: data.articleId,
          title: data.title,
          registerTime: data.registerTime,
          commentsCount: data.commentsCount,
          content: data.content,
          userId: data.userId,
          name: data.name,
        },
      });
      alert("Push로 출동한 녀석!");
    } catch (error) {
      console.log(error);
    }
  };

  const articleDelete = async (articleId) => {
    alert(articleId + " articleDelete()");
    try {
      await axios.delete("http://localhost:8080/article/" + articleId);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const search = async (keyword) => {
    alert(keyword + " search()");
    try {
      let response = await axios.post("http://localhost:8080/article/" + keyword);
      let { data } = await response;
      console.log(data);
      articleList.value = data;
      console.log(articleList);
      router.push("/blog");
    } catch (error) {
      console.log(error);
    }
  };

  const loadComment = async (articleId) => {
    try {
      let response = await axios.get("http://localhost:8080/comment/" + articleId);
      let { data } = await response;
      commentList.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  const saveComment = async (comment) => {
    console.log(comment.value.articleId);
    console.log(comment.value.comment);
    console.log(comment.value.userId);

    try {
      let response = await axios.post(
        "http://localhost:8080/comment/save",
        {
          articleId: comment.value.articleId,
          comment: comment.value.comment,
          userId: comment.value.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const insertArticle = async (articleDto) => {};
  return { detail, list, article, articleList, articleDelete, search, commentList, loadComment, saveComment };
});
