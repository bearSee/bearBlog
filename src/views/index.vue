<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="index">
    <div class="title animated infinite bounce delay-2s">熊二、熊二</div>
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
@import "@/assets/scss/theme.scss";

.index {
  min-height: 100%;
  width: 100%;
  border-radius: 10px;
  background: rgba(250, 250, 250, .3);
  display: flex;
  .title {
    margin: auto;
    color: var(--theme);
    font-size: 40px;
  }
}
</style>
