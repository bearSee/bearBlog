<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 13:42:05
 * @LastEditTime: 2020-03-20 13:56:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="charts">
    <div class="main" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'charts',
  props: {
    id: {
      type: [Number, String],
      default: Math.random(),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.creatCanvas();
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.creatCanvas();
  },
  methods: {
    creatCanvas() {
      setTimeout(() => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById(this.id));
        myChart.setOption(this.options, true);
      }, 0);
    },
  },
};
</script>

<style lang="scss">
.charts {
  height: 100%;
  .main {
    height: 100%;
  }
}
</style>
