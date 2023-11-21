<template>
  <!-- Modal insert-->
  <div class="modal fade" id="insertModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">글 쓰기</h5>
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
          <div class="mb-3" v-show="attachFile" id="imgFileUploadInsertWrapper">
            <input @change="changeFile" type="file" id="inputFileUploadInsert" multiple />
            <div id="imgFileUploadInsertThumbnail" class="thumbnail-wrapper">
              <!-- vue way img 를 만들어서 append 하지 않고, v-for 로 처리 -->
              <img v-for="(file, index) in fileList" v-bind:src="file" v-bind:key="index" />
            </div>
          </div>
          <button id="btnBoardInsert" class="btn btn-sm btn-primary btn-outline float-end" data-bs-dismiss="modal" type="button" @click="boardInsert()">등록</button>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal -->
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

const ckeditor = CKEditor.component;
const editor = ClassEditor;
const editorData = ref("");
const editorConfig = {};
const router = useRouter();
const store = useAuthStore();

const title = ref("");
const attachFile = ref(false);

const fileList = ref([]);
const fileDto = ref([]);
const changeFile = (fileEvent) => {
  fileList.value = []; // thumbnail
  const fileArray = Array.from(fileEvent.target.files);
  fileArray.forEach((file) => fileList.value.push(URL.createObjectURL(file)));
};

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
    let { data } = await axios.post("api/upload", formData, options);
    console.log(data);

    if (data != null) {
      //data == 파일 정보가 있음
      //title, content, data <- 객체로 묶어서 article dto 
      console.log('성공')
      data.forEach(el => {
        fileDto.push({
          "fileName":el.fileName,
          "fileUrl":el.fileUrl
        })
      })
      console.log(fileDto);
      closeModal();
    }    
  } catch (error) {
    console.log(error);
  }

  let uploadObject = {
    "fileList":fileList.value,
    "content": editorData.value,
    "title": title.value
  }
  console.log(uploadObject)
  try{
    let response = await axios.post("http://localhost:8080/article/", uploadObject);
    let {data} = await response;

  }catch(error){
    console.log(error);
  }
 
  // const doLogout = () => {
  //   // store.setLogout();
  //   router.push("/login");
  // };

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
