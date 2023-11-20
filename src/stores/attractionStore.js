import axios from "axios";
import { ref } from "vue";
import router from "../router";
import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useAttractionStore = defineStore("attractionStore", () => {
  const attractionList = ref([]);
  const getAttractionList = async () => {
    try {
      let response = await axios.get("http://localhost:8080/attractions/");
      let { data } = await response;
      console.log("AttractionStore' getAttractionList()", data);
      attractionList.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const goToAttraction = async (attractionId) => {
    router.push({
      name: "attractionDetail",
      query: {
        attractionId: attractionId,
      },
    });
  };

  const detailAttraction = async (attractionId) => {};

  return { attractionList, getAttractionList, detailAttraction, goToAttraction };
});
