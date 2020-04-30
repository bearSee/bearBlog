<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user-center">
    <div class="title animated infinite bounce delay-2s">正在开发...</div>
  </div>
</template>

<script>


export default {
  name: 'userCenter',
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.user-center {
  .title {
    width: 100%;
    height: 1500px;
    line-height: 500px;
    text-align: center;
    color: var(--theme);
  }
}
</style>
