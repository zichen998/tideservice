
<template>
  <div id="imgUploader">
    <div class="file-list">
      <!-- <section class="file-item draggable-item" v-for="(item,index) in files" :key="index"> -->
      <div class="thumbnails my-gallery">
        <figure itemprop="associatedMedia" itemscope  class="thumbnail" v-for="(item,index) in files" :key="index">
          <a :href="item.src" itemprop="contentUrl" data-size="400x400" class="img-wrapper">
            <img :src="item.src" itemprop="thumbnail"  />
            <!-- <div :style="{background:'url('+item.src+')  no-repeat',  backgroundPosition:'center center',backgroundSize:'cover'}" style="width:100%;height:110px;" itemprop="thumbnail"></div> -->
          </a>
          <span class="file-remove" @click="remove(index,$event)">×</span>
        </figure>
        <section class="thumbnail" v-if="this.files.length < 9">
          <div class="add">
            <span>+</span>
            <!-- accept="image/jpeg,image/png" capture="camera" -->
            <input type="file" @change="selectImgs()" multiple accept="image/*" ref="file">
          </div>
        </section>
      </div>
      <!-- <img :src="item.src" alt="" ondragstart="return false;">
      <span class="file-remove" @click="remove(index)">×</span> -->
      <!-- </section> -->

      <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>

          <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">

              <div class="pswp__counter"></div>
              <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

              <!-- <button class="pswp__button pswp__button--share" title="Share"></button>
              <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
              <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> -->
              <div class="pswp__preloader">
                <div class="pswp__preloader__icn">
                  <div class="pswp__preloader__cut">
                    <div class="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div class="pswp__share-tooltip"></div>
            </div>
            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
            <div class="pswp__caption">
              <div class="pswp__caption__center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PhotoSwipe from "photoswipe";
  import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
  import "photoswipe/dist/photoswipe.css";
  import "photoswipe/dist/default-skin/default-skin.css";
  import { Toast } from "mint-ui";
  export default {
    data() {
      return {
        // lang: this.$lang("dynamic"),
        files: [],
        index: 0,
        maxLength: 9,
        maxSize: 10240000
      };
    },
    methods: {
      //选择图片
      selectImgs() {
        let fileList = this.$refs.file.files;
        if (fileList.length > 9) {
          alert(this.lang.dynamic_upload_tips);
        }
        let tempList = [];
        for (let i = 0, len = fileList.length; i < len; i++) {
          let fileItem = {
            Id: this.index++,
            name: fileList[i].name,
            size: fileList[i].size,
            file: fileList[i]
          };

          let reader = new FileReader();
          reader.onloadend = e => {
            this.getBase64(e.target.result).then(url => {
              this.$set(fileItem, "src", url);
            });
          };
          if (fileItem.size > this.maxSize) {
            Toast(this.lang.dynamic_over_size);
          } else {
            reader.readAsDataURL(fileList[i]);
            tempList.push(fileItem);
            this.files.push(fileItem);
          }
        }
        setTimeout(() => {
          this.$emit("getFiles", tempList);
        }, 300);
        this.files.splice(9);
      },

      getBase64(url) {
        let self = this;
        let Img = new Image(),
          dataURL = "";
        Img.src = url;
        let p = new Promise(function(resolve, reject) {
          Img.onload = function() {

            let canvas = document.createElement("canvas"),
              width = Img.width,
              height = Img.height;

            let ratio = width / height,
              maxLength = 1000,
              newHeight = height,
              newWidth = width;

            if (width > maxLength || height > maxLength) {
              if (width > height) {
                newWidth = maxLength;
                newHeight = maxLength / ratio;
              } else {
                newWidth = maxLength * ratio;
                newHeight = maxLength;
              }
            }
            canvas.width = newWidth;
            canvas.height = newHeight;
            canvas.getContext("2d").drawImage(Img, 0, 0, newWidth, newHeight);
            dataURL = canvas.toDataURL("image/jpeg", 0.5);
            resolve(dataURL);
          };
        });
        return p;
      },
      remove(index, e) {
        e.stopPropagation();
        this.files.splice(index, 1);
        setTimeout(() => {
          this.$emit("removeFiles", index);
        }, 300);
      },

      initPhotoSwipeFromDOM(gallerySelector) {
        var parseThumbnailElements = function(el) {
          var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
          for (var i = 0; i < numNodes - 1; i++) {
            figureEl = thumbElements[i];
            if (figureEl.nodeType !== 1) {
              continue;
            }
            linkEl = figureEl.children[0];
            var img = new Image();
            img.src = linkEl.getAttribute("href");
            linkEl.setAttribute(
              "data-size",
              img.naturalWidth + "x" + img.naturalHeight
            );
            size = linkEl.getAttribute("data-size").split("x");
            item = {
              src: linkEl.getAttribute("href"),
              w: parseInt(size[0], 10),
              h: parseInt(size[1], 10)
            };
            if (figureEl.children.length > 1) {
              item.title = figureEl.children[1].innerHTML;
            }
            if (linkEl.children.length > 0) {
              item.msrc = linkEl.children[0].getAttribute("src");
            }
            item.el = figureEl;
            items.push(item);
          }
          return items;
        };
        var closest = function closest(el, fn) {
          return el && (fn(el) ? el : closest(el.parentNode, fn));
        };
        var onThumbnailsClick = function(e) {
          e = e || window.event;
          // e.preventDefault ? e.preventDefault() : (e.returnValue = false);
          var eTarget = e.target || e.srcElement;
          var clickedListItem = closest(eTarget, function(el, e) {
            return el.tagName && el.tagName.toUpperCase() === "FIGURE";
          });
          if (!clickedListItem) {
            return;
          }
          var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
          for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
              continue;
            }
            if (childNodes[i] === clickedListItem) {
              index = nodeIndex;
              break;
            }
            nodeIndex++;
          }
          if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
          }
          return false;
        };
        var photoswipeParseHash = function() {
          var hash = window.location.hash.substring(1),
            params = {};
          if (hash.length < 5) {
            return params;
          }
          var vars = hash.split("&");
          for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
              continue;
            }
            var pair = vars[i].split("=");
            if (pair.length < 2) {
              continue;
            }
            params[pair[0]] = pair[1];
          }
          if (params.gid) {
            params.gid = parseInt(params.gid, 10);
          }
          return params;
        };
        var openPhotoSwipe = function(
          index,
          galleryElement,
          disableAnimation,
          fromURL
        ) {
          var pswpElement = document.querySelectorAll(".pswp")[0],
            gallery,
            options,
            items;
          items = parseThumbnailElements(galleryElement);
          options = {
            history: false,
            tapToClose: true,
            galleryUID: galleryElement.getAttribute("data-pswp-uid"),
            getThumbBoundsFn: function(index) {
              var thumbnail = items[index].el.getElementsByTagName("img")[0],
                pageYScroll =
                  window.pageYOffset || document.documentElement.scrollTop,
                rect = thumbnail.getBoundingClientRect();
              return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }
          };
          if (fromURL) {
            if (options.galleryPIDs) {
              for (var j = 0; j < items.length; j++) {
                if (items[j].pid == index) {
                  options.index = j;
                  break;
                }
              }
            } else {
              options.index = parseInt(index, 10) - 1;
            }
          } else {
            options.index = parseInt(index, 10);
          }
          if (isNaN(options.index)) {
            return "";
          }
          if (disableAnimation) {
            options.showAnimationDuration = 0;
          }
          gallery = new PhotoSwipe(
            pswpElement,
            PhotoSwipeUI_Default,
            items,
            options
          );
          gallery.init();
        };
        var galleryElements = document.querySelectorAll(gallerySelector);
        for (var i = 0, l = galleryElements.length; i < l; i++) {
          galleryElements[i].setAttribute("data-pswp-uid", i + 1);
          galleryElements[i].onclick = onThumbnailsClick;
        }
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
          openPhotoSwipe(
            hashData.pid,
            galleryElements[hashData.gid - 1],
            true,
            true
          );
        }
      }
    },
    mounted() {
      this.initPhotoSwipeFromDOM(".my-gallery");
    }
  };
</script>


