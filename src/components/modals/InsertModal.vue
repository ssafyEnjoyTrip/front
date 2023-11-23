<template>
  <!-- Modal insert-->
  <div class="modal fade" id="insertModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="insertOrUpdate" class="modal-title">글 수정</h5>
          <h5 v-if="!insertOrUpdate" class="modal-title">글 쓰기</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <input type="text" v-model="title" class="form-control" id="titleInsert" placeholder="제목" />
          </div>
          <div class="mb-3">
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </div>
          <div class="form-check mb-3">
            <input v-model="attachFile" class="form-check-input" type="checkbox" value="" id="chkFileUploadInsert" />
            <label class="form-check-label" for="chkFileUploadInsert">파일 추가</label>
          </div>
          <span v-if="!insertOrUpdate">
          <div class="mb-3" v-show="attachFile" id="imgFileUploadInsertWrapper">
            
            <input @change="changeFile" type="file" id="inputFileUploadInsert" multiple />
            <div id="imgFileUploadInsertThumbnail" class="thumbnail-wrapper">
              <!-- vue way img 를 만들어서 append 하지 않고, v-for 로 처리 -->              
              <ul>
                <li data-bs-theme="" class="position-relative" v-for="(file, index) in fileList" v-bind:src="file" v-bind:key="index" style="border:1px solid gray">
                  <img :src="file" :key="index" :alt="file" > <span>file{{ index+1 }}.jpg</span>
                    <button @click="xbox(index)" type="button" class="btn-close position-absolute top end-0" aria-label="Close"></button>
                </li>
              </ul>
            </div>
          </div>    
        </span>    
          <button v-if="insertOrUpdate" id="btnBoardInsert" class="btn btn-sm btn-primary btn-outline float-end" data-bs-dismiss="modal" type="button" @click="boardUpdate()">수정</button>
          <button v-if="!insertOrUpdate" id="btnBoardInsert" class="btn btn-sm btn-primary btn-outline float-end" data-bs-dismiss="modal" type="button" @click="boardInsert()">등록</button>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal -->
</template>

<script setup>
import { ref, defineEmits } from "vue";
import axios from 'axios';
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuthStore } from "../../stores/authStore";
import { useArticleStore } from "../../stores/articleStore";
import { useRouter } from "vue-router";

const ckeditor = CKEditor.component;
const editor = ClassEditor;
const editorData = ref("");
const editorConfig = {};
const router = useRouter();
const store = useAuthStore();
const articleStore = useArticleStore();
const insertOrUpdate = ref(false);
const {articleDetail, goToArticle} = articleStore;

const title = ref("");
const attachFile = ref(false);
const fileList = ref([]);

if(articleDetail.title != undefined) {
  insertOrUpdate.value = true;
  title.value =  articleDetail.title;
  editorData.value = articleDetail.content;
  // fileList.value = articleDetail.articleFiles;
  fileList.value.forEach((el)=> {
    
  })
  console.log(fileList);
}

const xbox = (index) => {
  fileList.value.splice(index,1);
  delete_file(index);
}

const changeFile = (fileEvent) => {
  fileList.value = []; // thumbnail
  const fileArray = Array.from(fileEvent.target.files);

  fileArray.forEach((file) => fileList.value.push(URL.createObjectURL(file)));
  console.log(fileList.value);
};

const delete_file = (fileNum) => {	//fileNum은 li 의 index 값
    const dataTransfer = new DataTransfer();
    
    let files =document.querySelector("#inputFileUploadInsert").files;	//사용자가 입력한 파일을 변수에 할당
    
    let fileArray = Array.from(files);	//변수에 할당된 파일을 배열로 변환(FileList -> Array)
    
    fileArray.splice(fileNum, 1);	//해당하는 index의 파일을 배열에서 제거
    
    fileArray.forEach(file => { dataTransfer.items.add(file); });
    //남은 배열을 dataTransfer로 처리(Array -> FileList)
    
    document.querySelector("#inputFileUploadInsert").files = dataTransfer.files;	//제거 처리된 FileList를 돌려줌
    console.log("==================");
    console.log(files)
    console.log(fileArray)
    console.log(fileNum)
    console.log("==================");
  }


const boardInsert = async () => {
  let formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", editorData.value);

  let attachFiles = document.querySelector("#inputFileUploadInsert").files;
  if (attachFiles.length > 0) {
    const fileArray = Array.from(attachFiles);
    fileArray.forEach((file) => formData.append("file", file));
  }

  let options = {
    header: { "Content-Type": "multipart/form-data" },
  };

  try {
    let { data } = await axios.post("api/article", formData, options);
    if (data == 'success') {
      console.log('성공')
      closeModal();
    }
  } catch (error) {
    console.log(error);
  }
};

const boardUpdate = async () => {
  try{
    await axios.post("http://localhost:8080/article/update", 
      {
        title:title.value,
        content: editorData.value,
        articleId: articleDetail.articleId
      }
    )
    alert("SUCCESS!!");
    closeModal();
  } catch(error){
    console.error(error);
  }
};

const emit = defineEmits(['call-parent-insert'])
const closeModal = () => emit('call-parent-insert')
</script>

<style scoped>
/* deep selector >>> -> 함수 deep() */
.modal:deep(.ck-editor__editable) {
  height: 400px;
}
.modal:deep(.thumbnail-wrapper) {
  margin-top: 5px;
}

.modal:deep(.thumbnail-wrapper img) {
  width: 100px !important;
  margin-right: 5px;
  max-width: 100%;
}
</style>
