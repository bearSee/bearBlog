<template>
  <div
    class="charts earth"
    :id="id" />
</template>

<script>
import echarts from 'echarts';

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
        mapbgColor: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            mapChart: {},
            earthChart: {},
        };
    },
    watch: {
        mapbgColor() {
            this.resetEarth();
        },
    },
    mounted() {
        this.initEarth();
    },
    methods: {
        initEarth() {
            this.mapChart = echarts.init(document.createElement('canvas'), null, {
                width: 3086,
                height: 3048,
            });
            this.mapOptions.backgroundColor = this.mapbgColor || this.mapOptions.backgroundColor;
            // 获取容器并对其初始化
            this.earthChart = echarts.init(document.getElementById(this.id));

            // 将平面地球和立体球形的纹路重叠
            this.mapChart.setOption(this.mapOptions);
            this.earthOptions.globe.baseTexture = this.mapChart;

            this.earthChart.setOption(this.earthOptions);
            // this.earthChart.setOption(this.mapOptions);// 平面展开图
        },
        resetEarth() {
            this.mapOptions.backgroundColor = this.mapbgColor || this.mapOptions.backgroundColor;
            this.earthChart.setOption(this.earthOptions);
            this.mapChart.setOption(this.mapOptions);
        },
    },
};

</script>

<style>
  .earth{
    width: 100%;
    min-height: 700px;
  }
</style>
