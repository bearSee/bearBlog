<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="memories">
    <el-image ref="imagePreview" v-if="curentImage" class="image-preview" :src="curentImage" :preview-src-list="[curentImage]"></el-image>
    <el-carousel
      class="memories-card animated bounceInRight delay-1s"
      :interval="2000"
      type="card"
      indicator-position="none">
      <el-carousel-item
        v-for="item in cardItems"
        :key="item.url">
        <div class="carousel-box" @click="handlerPreview(item)">
          <div class="des-box" v-if="i18nName === 'zh-CN'">
            <div class="name">{{ item.name_Cn }} {{ item.date }}</div>
            <div class="des">{{ item.describe_Cn }}</div>
          </div>
          <div class="des-box" v-else>
            <div class="name">{{ item.name_En }} {{ item.date }}</div>
            <div class="des">{{ item.describe_En }}</div>
          </div>
          <el-image class="image" :src="cdn + item.url" :fit="item.fit"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="memories-footer">
      <el-carousel
        class="memories-normal animated bounceInLeft delay-1s"
        :interval="1500"
        indicator-position="none">
        <el-carousel-item
          v-for="item in normalItems"
          :key="item.url">
          <div class="carousel-box" @click="handlerPreview(item)">
            <div class="des-box" v-if="i18nName === 'zh-CN'">
              <div class="name">{{ item.name_Cn }} {{ item.date }}</div>
              <div class="des">{{ item.describe_Cn }}</div>
            </div>
            <div class="des-box" v-else>
              <div class="name">{{ item.name_En }} {{ item.date }}</div>
              <div class="des">{{ item.describe_En }}</div>
            </div>
            <el-image class="image" :src="cdn + item.url" :fit="item.fit"></el-image>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="vidio-list animated fadeIn delay-2s vertical-scroll">
        <video
          class="vidio"
          ref="videoPlayer"
          muted
          v-for="(vd, i) in vidioList"
          :key="i"
          :src="cdn + vd.url"
          type="video/mp4"
          :style="vd.style"
          @click="videoPlay(vd, i)"
          controls>
        </video>
      </div>
    </div>
    <el-dialog
      class="video-fullscreen"
      fullscreen
      :modal="false"
      :show-close="false"
      :close-on-press-escape="false"
      v-if="videoVisible"
      :visible.sync="videoVisible">
      <el-page-header :title="i18nName === 'zh-CN' ? '返回' : 'Back'" @back="videoVisible = false" :content="videoDescribe"></el-page-header>
      <video v-if="currentVideo.url" :src="cdn + currentVideo.url" autoplay controls></video>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'memories',
  data() {
    return {
      curentImage: '',
      currentVideo: {},
      videoVisible: false,
    };
  },
  computed: {
    ...mapState([
      'cdn',
      'wholeConfig',
    ]),
    i18nName() {
      return this.$i18n.locale;
    },
    cardItems() {
      return this.wholeConfig.photoAlbumConfig && this.wholeConfig.photoAlbumConfig.cardItems || [];
    },
    normalItems() {
      return this.wholeConfig.photoAlbumConfig && this.wholeConfig.photoAlbumConfig.normalItems || [];
    },
    vidioList() {
      return this.wholeConfig.photoAlbumConfig && this.wholeConfig.photoAlbumConfig.vidioList || [];
    },
    videoDescribe() {
      /* eslint-disable */
      const {
        name_Cn,
        name_En,
        describe_Cn,
        describe_En,
        date,
      } = this.currentVideo;
      return this.i18nName === 'zh-CN' ? `${name_Cn} - ${describe_Cn} (${date})` : `${name_En} - ${describe_En} (${date})`;
    },
  },
  methods: {
    handlerPreview({ url }) {
      this.curentImage = '';
      this.$nextTick(() => {
        this.curentImage = this.cdn + url;
        // this.$nextTick(() => {
        //   this.$refs.imagePreview.showViewer = true;
        // });
      });
    },
    videoPlay(vd, i) {
      this.currentVideo = vd;
      this.videoVisible = true;
      const video = this.$refs.videoPlayer[i];
      // video.play();
      setTimeout(() => {
        video.pause();
      }, 500);
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.memories {
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  .image-preview {
    width: 0;
    height: 0;
  }
  .el-carousel {
    &.memories-card {
      width: 100%;
      height: calc(50% - 5px);
      margin-bottom: 5px;
    }
    .el-carousel__container {
      width: 100%;
      height: 100%;
      .el-carousel__item {
        .carousel-box {
          height: 100%;
          cursor: pointer;
          .des-box {
            position: absolute;
            z-index: 9;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            color: var(--theme);
            text-align: center;
            .name,.des {
              font-size: 12px;
              margin: 3px 0;
              max-width: 200px;
              line-height: 1.2;
            }
          }
          .el-image {
            height: 100%;
            border-radius: 5px;
          }
        }
      }
    }
  }
  .memories-footer {
    display: flex;
    width: 100%;
    height: calc(50% - 5px);
    margin-top: 5px;
    .memories-normal {
      width: 50%;
      height: 100%;
      margin-right: 5px;
    }
    .vidio-list {
      margin-left: 5px;
      width: 50%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      justify-content: space-around;
      .vidio {
        min-width: 150px;
        height: 50%;
        margin-bottom: 20px;
        cursor: pointer;
      }
    }
  }
  .video-fullscreen {
    .el-dialog__body {
      .des-box {
      }
      video {
        height: calc(100% - 45px);
        margin: auto;
        display: block;
        margin-top: 20px;
      }
    }
  }
}
</style>
