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
  const articleDetail = ref({});
  const thumbnail = ref([]);
  const writer = ref(false);
  const isLogin = ref(false);

  const articleStore = reactive({
    // list
    list: [],
    limit: 5, // 한번뿌릴때 몇개 뿌릴지
    offset: 0,
    searchWord: "",

    // pagination
    listRowCount: 5, // limit랑 갯수 맟춰주자
    pageLinkCount: 10,
    currentPageIndex: 1,
    totalListItemCount: 0,
  });
  const list = async () => {
    thumbnail.value = [];
    let params = {
      limit: articleStore.limit,
      offset: articleStore.offset,
      searchWord: articleStore.searchWord,
    };

    try {
      let response = await axios.get("http://localhost:8080/article", { params });
      let { data } = await response;
      articleList.value = data.list;
      articleStore.totalListItemCount = data.count;

      articleList.value.forEach(element => {
        console.log(element.articleFiles[0].fileUrl);
        thumbnail.value.push(element.articleFiles[0].fileUrl)
      });
    } catch (error) {
      console.log(error);
    }
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

  const setArticleMovePage = (pageIndex) => {
    articleStore.offset = (pageIndex - 1) * articleStore.listRowCount;
    articleStore.currentPageIndex = pageIndex;
  };

  const goToArticle = (articleId) => {
    router.push({
      name: "Single",
      query: {
        articleId: articleId,
      },
    });
  };

  const getDetailArticle = async (articleId) => {
    try {
      let response = await axios.get("http://localhost:8080/article/" + articleId);
      let { data } = await response;
      articleDetail.value = data;
      console.log("articleStore's getDetailArticle: ", articleDetail);
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

  const search = async () => {
    let params = {
      limit: articleStore.limit,
      offset: articleStore.offset,
      searchWord: articleStore.searchWord,
    };
    try {
      let response = await axios.get("http://localhost:8080/article", { params });
      let { data } = await response;
      console.log(data);
      articleList.value = data.list;
      articleStore.totalListItemCount = data.count;
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
        "http://localhost:8080/comment",
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

  const isArticleWriter = (articleUserId) => {
    if (sessionStorage.userId == articleUserId) writer.value = true;
    else writer.value = false;
  };

  const checkLogin = () => {
    if (sessionStorage.userId != null) isLogin.value = true;
  }

  const incrementHeartCount = () => {
    articleStore.heartCount++;
  };

  const decrementHeartCount = () => {
    if (articleStore.heartCount > 0) {
      articleStore.heartCount--;
    }
  };
  // pagination
  const pageCount = computed(() => Math.ceil(articleStore.totalListItemCount / articleStore.listRowCount));
  const startPageIndex = computed(() => {
    if (articleStore.currentPageIndex % articleStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (articleStore.currentPageIndex / articleStore.pageLinkCount - 1) * articleStore.pageLinkCount + 1;
    } else {
      return Math.floor(articleStore.currentPageIndex / articleStore.pageLinkCount) * articleStore.pageLinkCount + 1;
    }
  });

  const endPageIndex = computed(() => {
    let tempEndPageIndex = 0;
    if (articleStore.currentPageIndex % articleStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      tempEndPageIndex = (articleStore.currentPageIndex / articleStore.pageLinkCount - 1) * articleStore.pageLinkCount + articleStore.pageLinkCount;
    } else {
      tempEndPageIndex = Math.floor(articleStore.currentPageIndex / articleStore.pageLinkCount) * articleStore.pageLinkCount + articleStore.pageLinkCount;
    }
    // endPageIndex 가 전체 pageCount(페이지 전체 수) 보다 크면 페이지 전체 수로 보정
    if (tempEndPageIndex > pageCount.value) tempEndPageIndex = pageCount.value;
    return tempEndPageIndex;
  });

  const prev = computed(() => (articleStore.currentPageIndex <= articleStore.pageLinkCount ? false : true));
  const next = computed(() => (endPageIndex.value == pageCount.value ? false : true)); // 위에서 더 큰 값은 보정했으므로 같은 지만 비교

  return {
    articleStore,
    goToArticle,
    list,
    article,
    articleList,
    articleDelete,
    commentList,
    loadComment,
    saveComment,
    setArticleMovePage,
    pageCount,
    startPageIndex,
    endPageIndex,
    prev,
    next,
    incrementHeartCount,
    decrementHeartCount,
    toDate,
    search,
    getDetailArticle,
    articleDetail,
    isArticleWriter,
    writer,
    checkLogin, isLogin, thumbnail
  };
});
