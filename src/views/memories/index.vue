<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div
    ref="memories"
    class="memories"
    :style="`height: ${dialogVisible ? '100%' : 'auto'};overflow-y: ${dialogVisible ? 'hidden' : 'auto'}`">
    <el-timeline>
      <el-timeline-item
        placement="top"
        size="large"
        v-for="data in timelineData"
        :key="data.timestamp"
        :timestamp="data.timestamp">
        <el-card>
          <div class="content-title">
            {{ i18nName === 'zh-CN' ? data.title_Cn : data.title_En }}
          </div>
          <template v-for="(item, i) in data.images">
            <el-image
              class="image"
              v-if="item.type === 'image'"
              :key="i"
              :title="i18nName === 'zh-CN' ? item.describe_Cn : item.describe_En"
              :src="cdn + item.url"
              @click="handlerOpenDialog(item)"
              :fit="item.fit">
              <div
                slot="error"
                class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
            <video
              class="image"
              v-else-if="item.type === 'video'"
              :key="i"
              :ref="'videoPlayer' + data.timestamp + i"
              muted
              :src="cdn + item.url"
              type="video/mp4"
              :style="item.style"
              @click="handlerPlayVideo(item, data.timestamp + i)"
              controls />
          </template>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-dialog
      class="preview-fullscreen"
      fullscreen
      :modal="false"
      :show-close="false"
      :close-on-press-escape="false"
      v-if="dialogVisible"
      :visible.sync="dialogVisible">
      <el-page-header
        :title="$t('返回')"
        @back="handlerCloseDialog"
        :content="imageDescribe" />
      <!-- <el-image
        class="preview"
        v-if="currentImage.type === 'image'"
        :src="cdn + currentImage.url"
        :fit="currentImage.fit || 'contain'">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image> -->
      <div
        class="preview"
        v-if="currentImage.type === 'image'">
        <image-viewer
          ref="imageViewer"
          inline
          is-show
          :title="false"
          :fullscreen="false"
          :navbar="false"
          :default-index="0"
          :images="[cdn + currentImage.url]" />
      </div>
      <video
        class="preview"
        v-else-if="currentImage.type === 'video'"
        :src="cdn + currentImage.url"
        autoplay
        controls />
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Memories',
    data() {
        return {
            timelineData: [],
            currentImage: {},
            dialogVisible: false,
        };
    },
    computed: {
        ...mapState([
            'cdn',
        ]),
        i18nName() {
            return this.$i18n.locale;
        },
        imageDescribe() {
            /* eslint-disable */
      const {
        name_Cn,
        name_En,
        describe_Cn,
        describe_En,
        date,
      } = this.currentImage;
      return this.i18nName === 'zh-CN' ? `${name_Cn} - ${describe_Cn} (${date})` : `${name_En} - ${describe_En} (${date})`;
    },
  },
  methods: {
    getMemories() {
      this.$http.get('memories/timelineConfig.json').then(({ data }) => {
        this.timelineData = data && data.list || [];
      });
    },
    handlerPlayVideo(item, str) {
      this.handlerOpenDialog(item);
      const video = this.$refs[`videoPlayer${str}`][0];
      setTimeout(() => {
        video.pause();
      }, 500);
    },
    handlerOpenDialog(item) {
      const element = this.$refs.memories && this.$refs.memories.offsetParent || {};
      this.scrollTop = element.scrollTop || 0;
      this.currentImage = item;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.initView();
      });
    },
    handlerCloseDialog() {
      this.dialogVisible = false;
      this.$nextTick(() => {
        const element = this.$refs.memories && this.$refs.memories.offsetParent || {};
        if (!element.scrollTo) {
          element.scrollTop = this.scrollTop;
        } else {
          element.scrollTo({
            top: this.scrollTop,
            behavior: 'instant',
          });
        }
      });
    },
    initView() {
      this.$refs.imageViewer.destroy();
      this.$refs.imageViewer.init();
      this.$refs.imageViewer.show();
    },
  },
  created() {
    this.getMemories();
  },
};
</script>

<style lang="scss">

.memories {
  flex-direction: column;
  overflow-x: hidden;
  .el-timeline {
    padding: 20px;
    .el-timeline-item__wrapper {
      .el-timeline-item__timestamp {
        color: var(--theme);
        font-size: 20px;
        font-weight: 700;
      }
      .el-timeline-item__content {
        .el-card {
          display: inline-block;
          max-width: 1428px;
          margin-top: 10px;
          .el-card__body {
            background: #f8f8f8;
            .content-title {
              margin-bottom: 10px;
            }
            .image {
              width: 150px;
              height: 150px;
              margin: 2px;
              cursor: pointer;
              .image-slot {
                height: 100%;
                font-size: 40px;
                display: flex;
                color: #999;
                background: #fff;
                border: 1px solid #eee;
                i {
                  margin: auto;
                }
              }
            }
          }
        }
      }
    }
  }
  .preview-fullscreen {
    .el-dialog__body {
      .des-box {
      }
      .preview {
        height: calc(100% - 45px);
        max-width: 100%;
        margin: auto;
        display: block;
        margin-top: 20px;
        .image-slot {
          height: 100%;
          font-size: 100px;
          display: flex;
          background: #f8f8f8;
          color: #999;
          i {
            margin: auto;
          }
        }
      }
    }
  }
}
</style>
