import axios from "axios";
import { ref, reactive, computed } from "vue";
import router from "../router";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useAttractionStore = defineStore("attractionStore", () => {
  const attractionList = ref([]);
  const detailObject = ref({});
  const popularAttraction = ref([]);

  const sideBarList = async () => {
    try{
      let response = await axios.get("http://localhost:8080/attractions/readCount");
      let {data} = await response;
      popularAttraction.value = data;  
    } catch(error){
      console.log(error);
    }
  }

  const attractionStore = reactive({
    // list
    list: [],
    limit: 9, // 한번뿌릴때 몇개 뿌릴지
    offset: 0,
    searchWord: "",

    // pagination
    listRowCount: 9, // limit랑 갯수 맟춰주자
    pageLinkCount: 10,
    currentPageIndex: 1,
    totalListItemCount: 0,
  })
  const getAttractionList = async () => {
    let params = {
      limit: attractionStore.limit,
      offset: attractionStore.offset,
      searchWord: attractionStore.searchWord,
    };
    try {
      let response = await axios.get("http://localhost:8080/attractions", { params });
      let { data } = await response;
      console.log("AttractionStore' getAttractionList()", data);
      attractionList.value = data.list;
      attractionStore.totalListItemCount = data.count
    } catch (error) {
      console.log(error);
    }
  };

  const search = async () => {
    let params = {
      limit: attractionStore.limit,
      offset: attractionStore.offset,
      searchWord: attractionStore.searchWord,
    };
    try {
      let response = await axios.get("http://localhost:8080/attractions", {params});
      let { data } = await response;
      console.log(data);
      attractionList.value = data.list;
      attractionStore.totalListItemCount = data.count
      console.log(articleList);
    } catch (error) {
      console.log(error);
    }
  };


  const setAttractionMovePage = (pageIndex) => {
    attractionStore.offset = (pageIndex - 1) * attractionStore.listRowCount
    attractionStore.currentPageIndex = pageIndex
  }
  
  const goToAttraction = async (attractionId) => {
    router.push({
      name: "attractionDetail",
      query: {
        attractionId: attractionId,
      },
    });
  };

  const detailAttraction = async (attractionId) => {
    try {
      let response = await axios.get("http://localhost:8080/attractions/" + attractionId);
      let { data } = await response;
      detailObject.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  // pagination
  const pageCount = computed(() => Math.ceil(attractionStore.totalListItemCount / attractionStore.listRowCount))
  const startPageIndex = computed(() => {
    if (attractionStore.currentPageIndex % attractionStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (attractionStore.currentPageIndex / attractionStore.pageLinkCount - 1) * attractionStore.pageLinkCount + 1;
    } else {
      return Math.floor(attractionStore.currentPageIndex / attractionStore.pageLinkCount) * attractionStore.pageLinkCount + 1;
    }
  })

  const endPageIndex = computed(() => {
    let tempEndPageIndex = 0;
    if (attractionStore.currentPageIndex % attractionStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      tempEndPageIndex = ((attractionStore.currentPageIndex / attractionStore.pageLinkCount) - 1) * attractionStore.pageLinkCount + attractionStore.pageLinkCount;
    } else {
      tempEndPageIndex = Math.floor(attractionStore.currentPageIndex / attractionStore.pageLinkCount) * attractionStore.pageLinkCount + attractionStore.pageLinkCount;
    }
    // endPageIndex 가 전체 pageCount(페이지 전체 수) 보다 크면 페이지 전체 수로 보정 
    if( tempEndPageIndex > pageCount.value ) tempEndPageIndex = pageCount.value
    return tempEndPageIndex;
  })
  
  const prev = computed(() => attractionStore.currentPageIndex <= attractionStore.pageLinkCount ? false : true)
  const next = computed(() => endPageIndex.value == pageCount.value ? false : true) // 위에서 더 큰 값은 보정했으므로 같은 지만 비교





  return {
    attractionStore, attractionList, getAttractionList, detailAttraction, goToAttraction, detailObject, search,
    pageCount, startPageIndex, endPageIndex, prev, next,setAttractionMovePage, popularAttraction, sideBarList

  };
});
