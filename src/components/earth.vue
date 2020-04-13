<template>
  <div class="charts earth" :id="id"></div>
</template>

<script>
import echarts from 'echarts';
// eslint-disable-next-line
import 'echarts/map/js/world.js';
import 'echarts-gl';

export default {
  props: {
    id: {
      type: [Number, String],
      default: Math.random(),
    },
    // 立体球形纹路
    earthOptions: {
      type: Object,
      default: () => ({}),
    },
    // 平面地球的样式
    mapOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      mapChart: {},
      earthChart: {},
    };
  },
  mounted() {
    this.initEearth();
  },
  methods: {
    initEearth() {
      this.mapChart = echarts.init(document.createElement('canvas'), null, {
        width: 3086,
        height: 3048,
      });
      // 获取容器并对其初始化
      this.earthChart = echarts.init(document.getElementById(this.id));

      // 将平面地球和立体球形的纹路重叠
      this.mapChart.setOption(this.mapOptions);
      this.earthOptions.globe.baseTexture = this.mapChart;

      this.earthChart.setOption(this.earthOptions);
      // this.earthChart.setOption(this.mapOptions);// 平面展开图
    },
  },
};

</script>

<style>
  .earth{
    width: 100%;
    height: 700px;
    background: rgba(16, 167, 202, 0.39);
  }
</style>
