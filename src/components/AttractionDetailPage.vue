<template>
  <div class="site-cover site-cover-sm same-height overlay single-page"
    style="background-image: url('images/img_1_horizontal.jpg');">
    <div class="container">
      <div class="row same-height justify-content-center">
        <div class="col-md-6">
          <div class="post-entry text-center">
            <h1 class="mb-4"> Attraction </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="section posts-entry">
    <div class="container">
      <div class="row mb-4">
        <div class="col-sm-6">
          <div v-if="isLogin">
            <img src="../assets/bookmark.png" class="bookmarks" v-show="isBookmark" @click="changeBookmark(attractionId)">
            <img src="../assets/no_bookmark.png" class="bookmarks" v-show="!isBookmark"
              @click="changeBookmark(attractionId)">
          </div>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-md-9">
          <div class="row g-3">
            <div class="col-md-12">
              <div class="blog-entry" style="text-align: center; margin-right: 100px; margin-left: 100px;">
                <img v-if="detailObject.firstImage" :src="detailObject.firstImage" alt="Attraction Image"
									class="img-fluid">
						    <img v-else src="@/assets/no-image.avif" alt="No Image" class="img-fluid">
                <!-- <img alt="Image" :src="detailObject.firstImage" class="img-fluid" /> -->

                <h2>{{ detailObject.title }}</h2>
                <p>{{ detailObject.attractionDescription.overview }}</p>
              </div>
            </div>
          </div>
          
          <div class="row g-0" style="margin-right: 100px; margin-left: 100px; margin-top: 100px">
            <kakao-map></kakao-map>
            <ul>
              <li class="fw-bold">전화 및 문의: <span>010-0000-11111</span></li>
              <li>홈페이지: www.xxx.com</li>
            </ul>
          </div>
        </div>
        

        <div class="col-lg-3 sidebar">
          <side-bar-page></side-bar-page>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import KakaoMap from "./KakaoMap.vue";
import { useAttractionStore } from "@/stores/attractionStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import SideBarPage from "@/components/SidebarPage.vue";
import axios from "axios";

// 라우트에서 쿼리 추출
const route = useRoute();
const store = useAttractionStore();
const {authStore} = useUserStore();

const { isLogin } = authStore;
const { detailAttraction, changeBookmark } = store;
const { detailObject, isBookmark } = storeToRefs(store);
const attractionId = route.query.attractionId;
const bookmark = ref("")
console.log("글쓰기 버튼 나오면 안되는데. ", isLogin);

const checkBookmark = async () => {
  if (isLogin) {
  console.log(isLogin);
    try {
      let { data } = await axios.post("http://localhost:8080/bookmarks", {
        "userId": sessionStorage.userId,
        "attractionId": attractionId
      });
      if (data == "SUCCESS") isBookmark.value = true;
      else isBookmark.value = false;

    } catch (error) {
      console.error(error);
    }
  }

}

checkBookmark();

// 로그인 했는지 확인 -> 안했다면 북마크 로고 지우기
// 로그인 안되어있으면 북마크 로고 지우기
//if (isLogin.value == true) {
//isBookmark.value = false;
//}

detailAttraction(attractionId);
onMounted(() => {
  initMap();
  //   if (window.kakao && window.kakao.maps) {
  //     initMap();
  //   } else {
  //     // // API KEY는 index에서 불러오고 있음
  //     const script = document.createElement("script");
  //     script.onload = () => window.kakao.maps.load(this.initMap);
  //     document.head.appendChild(script);
  //   }
});
const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(detailObject.value.latitude, detailObject.value.longitude),
    level: 5,
  };

  var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
    contentNode = document.createElement("div"), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
    markers = [], // 마커를 담을 배열입니다
    currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다


  var map = new kakao.maps.Map(container, options);

  // 장소 검색 객체를 생성합니다
  var ps = new kakao.maps.services.Places(map);

  // 지도에 idle 이벤트를 등록합니다
  kakao.maps.event.addListener(map, "idle", searchPlaces);

  var markerPosition = new kakao.maps.LatLng(detailObject.value.latitude, detailObject.value.longitude);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  var iwContent = '<div style="padding:5px;">' + detailObject.value.title + '</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    position: iwPosition,
    content: iwContent
  });

  // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
  infowindow.open(map, marker);

  // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
  contentNode.className = "placeinfo_wrap";

  // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
  // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
  addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
  addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);

  // 커스텀 오버레이 컨텐츠를 설정합니다
  placeOverlay.setContent(contentNode);

  // 각 카테고리에 클릭 이벤트를 등록합니다
  addCategoryClickEvent();

  // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
  function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent("on" + type, callback);
    }
  }

  // 카테고리 검색을 요청하는 함수입니다
  function searchPlaces() {
    if (!currCategory) {
      return;
    }

    // 커스텀 오버레이를 숨깁니다
    placeOverlay.setMap(null);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
    } else if (status === kakao.maps.services.Status.ERROR) {
      // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
    }
  }

  // 지도에 마커를 표출하는 함수입니다
  function displayPlaces(places) {
    // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
    // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
    var order = document.getElementById(currCategory).getAttribute("data-order");

    for (var i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

      // 마커와 검색결과 항목을 클릭 했을 때
      // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
      (function (marker, place) {
        kakao.maps.event.addListener(marker, "click", function () {
          displayPlaceInfo(place);
        });
      })(marker, places[i]);
    }
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, order) {
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
  function displayPlaceInfo(place) {
    var content = '<div class="placeinfo">' + '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + "</a>";

    if (place.road_address_name) {
      content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + "</span>" + '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ")</span>";
    } else {
      content += '    <span title="' + place.address_name + '">' + place.address_name + "</span>";
    }

    content += '    <span class="tel">' + place.phone + "</span>" + "</div>" + '<div class="after"></div>';

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
  }

  // 각 카테고리에 클릭 이벤트를 등록합니다
  function addCategoryClickEvent() {
    var category = document.getElementById("category"),
      children = category.children;

    for (var i = 0; i < children.length; i++) {
      children[i].onclick = onClickCategory;
    }
  }

  // 카테고리를 클릭했을 때 호출되는 함수입니다
  function onClickCategory() {
    var id = this.id,
      className = this.className;

    placeOverlay.setMap(null);

    if (className === "on") {
      currCategory = "";
      changeCategoryClass();
      removeMarker();
    } else {
      currCategory = id;
      changeCategoryClass(this);
      searchPlaces();
    }
  }

  // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
  function changeCategoryClass(el) {
    var category = document.getElementById("category"),
      children = category.children,
      i;

    for (i = 0; i < children.length; i++) {
      children[i].className = "";
    }

    if (el) {
      el.className = "on";
    }
  }
};
</script>


<style>
.bookmarks {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>