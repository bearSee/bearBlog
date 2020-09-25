<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="index">
    <my-earth v-if="earthOptions && mapOptions" ref="earth" id="earth" :earthOptions="earthOptions" :mapOptions="mapOptions" :mapbgColor="mapbgColor"></my-earth>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import myEarth from '@/components/earth';

const starfield = require('../assets/image/starfield.jpg');

export default {
  name: 'index',
  components: {
    myEarth,
  },
  data() {
    const mapbgColor = window.localStorage.getItem('theme-color');
    return {
      mapbgColor,
      earthOptions: null,
      mapOptions: null,
      timer: null,
    };
  },
  computed: {
    ...mapState([
      'themeColor',
    ]),
  },
  watch: {
    themeColor(val) {
      this.mapbgColor = val;
    },
  },
  methods: {
    // 调用划线方法
    rodamData() {
      // let name = '随机点' + Math.random().toFixed(5) * 100000
      // let longitude = Math.random() * 62 + 73
      const longitude = 105.18;
      const longitude2 = Math.random() * 360 - 180;
      // let latitude = Math.random() * 50 + 3.52
      const latitude = 37.51;
      const latitude2 = Math.random() * 180 - 90;
      return {
        coords: [
          [longitude2, latitude2],
          [longitude, latitude],
        ],
        value: (Math.random() * 3000).toFixed(2),
      };
    },
    initEarth() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.earth.mapChart.dispose();
        this.$refs.earth.earthChart.dispose();
        this.$refs.earth.initEarth();
      }, 300);
    },
  },
  created() {
    this.$http.get('index/earthConfig.json').then(({ data }) => {
      const { earthOptions = {}, mapOptions = {} } = data || {};
      // 划多条线
      // eslint-disable-next-line
      earthOptions.series[0].data = Array.apply(null, Array(150)).map(() => this.rodamData());
      earthOptions.globe.environment = starfield;
      mapOptions.backgroundColor = this.mapbgColor;
      this.earthOptions = earthOptions;
      this.mapOptions = mapOptions;
    });
  },
  mounted() {
    window.addEventListener('resize', this.initEarth);
  },
  destroyed() {
    window.removeEventListener('resize', this.initEarth);
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.index {
  height: 100%;
  #earth {
    height: 100%;
    width: 100%;
  }
}
</style>
