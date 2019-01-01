<template>
  <div id="dynamic_create">
    <mt-field  v-model="dynamicContent" placeholder="Post your news" type="textarea" rows="4" ></mt-field>
    <uploader @getFiles='getImageList' @removeFiles='removeImage'></uploader>
    <div class="btn-wrapper">
      <mt-button class='btn-send' size="large" type="primary" @click="send">submit</mt-button>
    </div>

  </div>
</template>

<script>
  import { Toast } from "mint-ui";
  import uploader from "./Upload";
  export default {
    name: "DynamicCreate",
    data() {
      return {
        dynamicContent: "",
        imgList: [],
        FilecodeList: [],
        isSubmit: false
      };
    },
    methods: {
      getImageList(files) {
        this.$nextTick(() => {
          for (let i = 0, len = files.length; i < len; i++) {
            this.imgList.push(files[i].src.split("base64,")[1]);

            //   this._getFileCode({
            //     Base64Str: files[i].src.split("base64,")[1],
            //     AttachmentType: this.$enums.AttachmentType.Activity
            //   });
          }
        });
      },

      removeImage(index) {
        this.imgList.splice(index, 1);
      },
      createDynamic(arr) {
        this.isSubmit = true;
        this.$http
          .post(this.$profileApi.Dynamic_CreateDynamic, {
            Subject: this.dynamicContent,
            Files: arr
          })
          .then(data => {
            this.isSubmit = false;
            if (data.Rstatus) {
              // Toast(this.lang.dynamic_publish_ok);
              this.$router.back();
            } else {
              // Toast(this.lang.dynamic_publish_fail);
            }
          })
          .catch(err => {
            //   Toast(this.lang.dynamic_net_error);
          });
      },
      //发布事件
      send() {
        Toast("Submit the information in the console ~ the image address is the compressed base64 address");
        console.log("content" + this.dynamicContent);
        console.log(this.imgList);
        //   if (this.dynamicContent.trim() == "" && this.imgList.length === 0) {
        //     // Toast(this.lang.dynamic_content_no_null);
        //     return;
        //   }
        //   //当图片还没上传成功
        //   let self = this;
        //   var timer = setInterval(function() {
        //     if (
        //       self.FilecodeList &&
        //       self.imgList &&
        //       self.FilecodeList.length < self.imgList.length
        //     ) {
        //       // Indicator.open(self.lang.dynamic_uploading)
        //       self.isSubmit = true;
        //     } else {
        //       clearInterval(timer);
        //       // Indicator.close();
        //       self.createDynamic(self.FilecodeList);
        //     }
        //   }, 200);
      }
    },
    components: {
      uploader
    }
  };
</script>


