<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="master" :style="`background-image: url(${cdn + currentBackground});${bgStyle}`">
    <el-container class="master-content">
      <el-header class="master-head">
        <div class="head-left">
          <el-popover
            class="avatar-popover"
            placement="bottom"
            trigger="hover">
            <img class="avatar-popover-qr" :src="cdn + 'qr.jpg'">
            <div slot="reference">
              <el-avatar :src="cdn + 'avatar.jpg'"></el-avatar>
              <span class="name">{{ $t('Bear See') }}</span>
            </div>
          </el-popover>
        </div>
        <el-menu
          mode="horizontal"
          router
          background-color="#545c64"
          text-color="#fff"
          :active-text-color="color"
          :default-active="menus && menus[0] && menus[0].path || null">
          <template v-for="(menu, i) of menus">
            <el-submenu
              v-if="menu.children && menu.children.length"
              :index="menu.name"
              :key="i">
              <template slot="title">
                <i v-if="menu.icon" :class="menu.icon"></i>
                <span>{{ menu.name }}</span>
              </template>
              <el-menu-item
                v-for="child of menu.children"
                :index="child.path"
                :key="child.name">
                {{ child.name }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :index="menu.path"
              :key="i">
              <i v-if="menu.icon" :class="menu.icon"></i>
              <span>{{ menu.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
        <div class="head-right">
          <!-- 背景图 -->
          <el-popover
            class="background-popover"
            placement="bottom"
            trigger="click"
            v-model="popoverVisible">
            <div class="background-list">
              <div class="list" v-for="img in backgroundList" :key="img.url">
                <el-image class="img" :src="cdn + img.url" fit="contain" @click="changeBackground(img.url)"></el-image>
                <div class="img-name">{{ img.name }}</div>
              </div>
            </div>
            <el-image slot="reference" :src="cdn + currentBackground" fit="contain"></el-image>
          </el-popover>
          <div @click="changeLang" class="lang-btn">{{ $t('切换语言') }}<i class="el-icon-caret-left"></i></div>
          <!-- 主题色 -->
          <el-color-picker v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
        </div>
      </el-header>
      <el-main class="main-content">
        <keep-alive>
          <router-view class="animated bounceInUp delay-0.5s" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view class="animated bounceInUp delay-0.5s" v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
    <el-backtop target=".main-content">
      <i class="el-icon-arrow-up go-top"></i>
    </el-backtop>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import i18n from '@/mixins/i18n';
import themeConfig from '@/utils/themeConfig';

const {
  color,
  backgroundList,
  currentBackground,
  predefineColors,
} = themeConfig;

export default {
  name: 'master',
  mixins: [i18n],
  data() {
    return {
      bgStyle: '',
      backgroundList,
      currentBackground: currentBackground || backgroundList[0].url,
      color,
      predefineColors,
      popoverVisible: false,
      // 导航菜单
      menus: [
        {
          name: '首页',
          path: 'index',
          icon: 'el-icon-menu',
        },
        {
          name: '导航2',
          icon: 'el-icon-menu',
          children: [
            {
              name: '导航2-1',
              path: 'userCenter',
            },
            {
              name: '导航2-2',
              path: 'userCenter',
            },
          ],
        },
        {
          name: '我的',
          path: 'userCenter',
          icon: 'el-icon-menu',
          children: [],
        },
      ],
    };
  },
  watch: {
    color: {
      immediate: true,
      handler(val) {
        this.changeTheme(val);
      },
    },
  },
  computed: {
    ...mapState([
      'cdn',
    ]),
  },
  methods: {
    ...mapMutations([
      'setThemeColor',
    ]),
    changeBackground(img) {
      this.currentBackground = img;
      window.localStorage.setItem('current-background', img);
      this.popoverVisible = false;
    },
    changeTheme(val) {
      window.localStorage.setItem('theme-color', val);
      this.setThemeColor(val);
      const componentStyle = document.createElement('style');
      componentStyle.innerText = `:root {--theme:${val}!important;}`;
      document.head.appendChild(componentStyle);
    },
    changeLang() {
      const lange = this.$i18n.locale === 'zh-CN' ? 'en-US' : 'zh-CN';
      this.toSwitchLanguage(lange);
    },
    // 监听视口尺寸变化
    clientChange() {
      const { clientWidth, clientHeight } = document.documentElement;
      if (clientWidth / clientHeight > 1.6) {
        this.bgStyle = 'background-size: 100% auto';
        return;
      }
      this.bgStyle = 'background-size: auto 100%';
    },
  },
  mounted() {
    this.clientChange();
    window.onresize = () => {
      this.clientChange();
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
@import "@/assets/scss/theme.scss";

.master {
  height: 100%;
  width: 100%;
  transition: 2s;
  .master-content {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .2);
    .master-head {
      justify-content: space-between;
      .head-left {
        display: flex;
        .avatar-popover {
          margin: auto;
          cursor: pointer;
          .el-popover__reference {
            display: flex;
            .name {
              line-height: 40px;
              margin-left: 10px;
              color: var(--theme);
              font-size: 24px;
              text-decoration: underline;
            }
          }
        }
      }
      .head-right {
        display: flex;
        .background-popover {
          display: flex;
          margin: auto 0;
        }
        .el-color-picker {
          margin: auto 0;
          &.el-color-picker {
            .el-color-picker__trigger {
              border: 0;
              .el-color-picker__color {
                border: 1px solid #c2ccd5fa;
              }
            }
          }
        }
        .lang-btn {
          margin: auto 10px;
          color: var(--theme);
          border: 1px solid var(--theme);
          border-radius: 3px;
          padding: 3px 10px;
          width: 100px;
          text-align: right;
          cursor: pointer;
        }
        .el-image {
          display: flex;
          cursor: pointer;
          .el-image__inner {
            width: auto;
            height: 22px;
            margin: auto 10px;
          }
        }
      }
    }
    .main-content {
      padding: 0 20px;
      margin-bottom: 20px;
      margin-top: 10px;
      height: calc(100% - 30px);
      &>div {
        min-height: 100%;
        height: 100%;
        width: 100%;
        border-radius: 10px;
        background: rgba(250, 250, 250, .3);
        display: flex;
        position: relative;
      }
    }
  }
  .el-backtop {
    color: var(--theme);
    font-weight: 600;
    background: rgba(0, 0, 0, .5);
  }
}
/*滚动条样式*/
.main-content::-webkit-scrollbar {
  width: 4px;
  background: #f8f8f8;
}
.main-content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #f8f8f8;
}
.main-content::-webkit-scrollbar-track {/*滚动条里面轨道*/
  border-radius: 4px;
  background: var(--theme);
}
.el-popover {
  background: rgba(250, 250, 250, .2);
  .avatar-popover-qr {
    width: 100px;
    margin: auto;
    display: flex;
  }
  .background-list {
    display: flex;
    flex-wrap: wrap;
    .list {
      // width: 70px;
      padding: 0 10px;
      .el-image__inner {
        width: auto;
        height: 22px;
      }
      .img-name {
        text-align: center;
      }
    }
  }
}
</style>
