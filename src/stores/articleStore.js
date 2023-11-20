import axios from "axios";
import { ref, reactive, computed } from "vue";
import router from "../router";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useArticleStore = defineStore("articleStore", () => {
  const route = useRoute();

  const article = ref({});
  const articleList = ref([]);
  const commentList = ref([]);
  const articleStore = reactive({
    // list
    list: [],
    limit: 10,
    offset: 0,
    searchWord: "",

    // pagination
    listRowCount: 10,
    pageLinkCount: 10,
    currentPageIndex: 1,
    totalListItemCount: 0,

    // detail, update, delete
    articleId: 0,
    title: "",
    content: "",
    user: ref({}),
    regDate: "",
    regTime: "",
    readCount: 0,
    fileList: [],
    heartCount:0,
 })



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

  const setArticleDetail = (payload) => {
    articleStore.articleId = payload.articleId;
    articleStore.title = payload.title;
    articleStore.registerTime = payload.registerTime;
    articleStore.content = payload.content;
    articleStore.user = payload.user;
    articleStore.name = payload.name;
    articleStore.heartCount = payload.heartCount;
  }
  const detail = async (articleId) => {
    console.log("detail()");
    console.log(articleId);
    try {
      let { data } = await axios.get("http://localhost:8080/article/" + articleId);
      setArticleDetail(data);
      router.push({
        name: "Single",
        query: {
          articleId : articleId,
        }
      });
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
    } catch (error) {
      console.log(error);
    }
  };

  const loadComment = async (articleId) => {
    try {
      let response = await axios.get("http://localhost:8080/comment/" + articleId);
      let { data } = await response;

      console.log("loadComment가 정상적으로 실행이 되나?");

      commentList.value = data;

      console.log("commentList: ", commentList.value);
    } catch (error) {
      console.log(error);
    }
  };

  const saveComment = async (comment) => {
    console.log(comment.value);
    try {
      let response = await axios.post(
        "http://localhost:8080/comment/save",
        {
          articleId: comment.value.article,
          comment: comment.value.comment,
          userId: comment.value.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      loadComment(comment.value.article);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementHeartCount = () => {
    articleStore.heartCount++;
  };

  const decrementHeartCount = () => {
    if (articleStore.heartCount > 0) {
      articleStore.heartCount--;
    }
  };
  // pagination
  const pageCount = computed(() => Math.ceil(articleStore.totalListItemCount / articleStore.listRowCount))
  const startPageIndex = computed(() => {
    if (articleStore.currentPageIndex % articleStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (articleStore.currentPageIndex / articleStore.pageLinkCount - 1) * articleStore.pageLinkCount + 1;
    } else {
      return Math.floor(articleStore.currentPageIndex / articleStore.pageLinkCount) * articleStore.pageLinkCount + 1;
    }
  })

  const endPageIndex = computed(() => {
    if (articleStore.currentPageIndex % articleStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (articleStore.currentPageIndex / articleStore.pageLinkCount - 1) * articleStore.pageLinkCount + articleStore.pageLinkCount;
    } else {
      return Math.floor(articleStore.currentPageIndex / articleStore.pageLinkCount) * articleStore.pageLinkCount + articleStore.pageLinkCount;
    }
  })

  const prev = computed(() => articleStore.currentPageIndex <= articleStore.pageLinkCount ? false : true)
  const next = computed(() => 
    Math.floor(pageCount / articleStore.pageLinkCount) * articleStore.pageLinkCount < articleStore.currentPageIndex ? false : true)

  const insertArticle = async (articleDto) => {};
  return {
    articleStore, detail, list, article, articleList, articleDelete, search, commentList, loadComment, saveComment, setArticleDetail,
    pageCount, startPageIndex, endPageIndex, prev, next, incrementHeartCount, decrementHeartCount

  };
});
