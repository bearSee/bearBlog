<template>
  <div
    class="master"
    :style="`background-image: url(${backgroundImage});`">
    <el-container class="master-content">
      <el-header class="master-head">
        <div class="head-left">
          <el-popover
            class="avatar-popover"
            placement="bottom"
            trigger="hover">
            <img
              class="avatar-popover-qr"
              :src="config.qr">
            <div slot="reference">
              <el-avatar :src="config.avatar" />
              <span class="name">{{ config.username }}</span>
            </div>
          </el-popover>
        </div>
        <sib-menu
          mode="horizontal"
          :menus="config.menus"
          :background-color="config.backgroundColor"
          :text-color="config.menuTextColor"
          :active-text-color="themeColor" />
        <div class="head-right">
          <!-- 背景图 -->
          <el-popover
            class="background-popover"
            placement="bottom"
            trigger="click">
            <div class="background-list">
              <div
                class="list"
                v-for="image in config.backgroundImages"
                :key="image.url">
                <el-image
                  fit="cover"
                  :src="image.url"
                  @click="setBackgroundImage(image.url)" />
                <div class="image-name">
                  {{ image.name }}
                </div>
              </div>
            </div>
            <el-image
              slot="reference"
              fit="cover"
              :src="backgroundImage" />
          </el-popover>
          <sib-item
            class="lang-select"
            v-model="lang"
            :props="langProps" />
          <!-- 主题色 -->
          <el-color-picker
            :predefine="config.predefineColors"
            :value="themeColor"
            @change="resetGlobalThemeColor" />
        </div>
      </el-header>
      <el-main
        class="main-content vertical-scroll"
        :class="$route.name + '-container'">
        <router-view class="animated fadeIn delay-0.5s" />
      </el-main>
      <div class="beian-number">
        <a
          href="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank">Copyright © Bearsee 粤ICP备18057546号</a>
      </div>
    </el-container>
    <el-backtop target=".main-content">
      <i class="el-icon-arrow-up go-top" />
    </el-backtop>
  </div>
</template>


<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'Master',
    data() {
        return {
            lang: window.localStorage.getItem('lang') || 'zh-CN',
            langProps: {
                type: 'select',
                size: 'mini',
                clearable: false,
                options: [
                    {
                        key: 'zh-CN',
                        value: '简体中文',
                    },
                    {
                        key: 'en-US',
                        value: 'English',
                    },
                ],
            },
        };
    },
    watch: {
        lang(val) {
            window.localStorage.setItem('lang', val);
            this.$loading({
                lock: true,
                text: `${this.$t('语言切换中')}...`,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });
            setTimeout(() => {
                window.location.reload();
            }, 100);
        },
    },
    computed: {
        ...mapState([
            'config',
            'backgroundImage',
            'themeColor',
        ]),
    },
    methods: {
        ...mapMutations(['setBackgroundImage']),
        ...mapActions(['resetGlobalThemeColor']),
    },
};
</script>

<style lang="scss">
.master {
  height: 100%;
  width: 100%;
  transition: 1s;
  background-size: cover;

  .master-content {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);

    .master-head {
      justify-content: space-between;
      background: var(--bgColor);

      .head-left {
        display: flex;
        min-width: 200px;
        width: 200px;

        .avatar-popover {
          margin: auto 0;
          cursor: pointer;

          .el-popover__reference {
            display: flex;

            .name {
              line-height: 40px;
              margin-left: 10px;
              color: var(--theme);
              font-size: 24px;
              // text-decoration: underline;
            }
          }
        }
      }

      .el-menu {
        display: flex;
        justify-content: center;
        overflow-y: hidden;
        overflow-x: auto;
        flex: 1 1 auto;
        margin: 0 20px;
        border: 0;
        background: transparent;
      }

      .head-right {
        min-width: 210px;
        width: 210px;
        display: flex;
        justify-content: flex-end;

        .background-popover {
          margin: auto 0;
          display: flex;
          .el-image {
            cursor: pointer;
            display: flex;
            width: 45px;
            height: 28px;
          }
        }

        .el-color-picker {
          margin: auto 0;
          display: flex;
          width: 28px;
          height: 28px;
          .el-color-picker__trigger {
            vertical-align: top;
          }

          .el-color-picker__trigger {
            border: 0;
            padding: 0;
            width: 100%;
            height: 100%;

            .el-color-picker__color {
              border: 1px solid #c2ccd5fa;
            }
          }
        }

        .lang-select {
          margin: auto 10px;
          display: flex;
          color: var(--theme);
          width: 100px;
          height: 28px;
          .el-select {
            vertical-align: top;
          }
        }

      }
    }

    .main-content {
      padding: 0 10px;
      margin: 10px 0;
      border-radius: 10px;
      position: relative;
      overflow-x: hidden;

      &>div {
        min-height: 100%;
        width: 100%;
        background: rgba(250, 250, 250, 0.3);
        display: flex;
      }
    }

    .beian-number {
      text-align: center;
      background: var(--bgColor);
      color: var(--theme);
      opacity: 0.8;
      font-size: 14px;
      padding: 6px 0;
    }
  }

  .el-backtop {
    color: var(--theme);
    font-weight: 600;
    background: rgba(0, 0, 0, 0.5);
  }
}

.el-popover {
  background: rgba(250, 250, 250, 0.2);

  .avatar-popover-qr {
    width: 120px;
    margin: auto;
    display: flex;
  }

  .background-list {
    display: flex;
    flex-wrap: wrap;

    .list {
      padding: 0 10px;
      cursor: pointer;

      .el-image__inner {
        width: auto;
        height: 22px;
      }

      .image-name {
        text-align: center;
      }
    }
  }
}
</style>
