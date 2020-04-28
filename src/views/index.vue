<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="index">
    <my-earth ref="earth" id="earth" :earthOptions="earthOptions" :mapOptions="mapOptions" :mapbgColor="mapbgColor" @dblclick="handlerClick"></my-earth>
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
      earthOptions: {
        globe: {
          globeRadius: 83,
          baseTexture: '', // 贴图 球形和平面的吻合
          silent: true,
          environment: starfield, // 背景
          // heightTexture: starfield, // 地球的整个纹路
          shading: 'realistic',
          light: {
            main: {
              color: '#fff',
              intensity: 0,
              shadow: false,
              shadowQuality: 'high',
              alpha: 55,
              beta: 10,
            },
            ambient: {
              color: '#fff',
              intensity: 1,
            },
          },
          postEffect: {
            enable: false,
            SSAO: {
              enable: true,
              radius: 10,
            },
          },

          // 地球是否自己转动 autoRotate为true时自己转动
          viewControl: {
            autoRotate: true,
            animationDurationUpdate: 2000,
            targetCoord: '',
          },
        },
        series: [
          // {
          //   type: 'scatter3D',
          //   coordinateSystem: 'globe',
          //   blendMode: 'lighter',
          //   symbolSize: 20,
          //   symbol: 'pin',
          //   silent: false,
          //   itemStyle: {
          //     color(params) {
          //       const colorList = ['rgb(246, 153, 180)', 'rgb(118,77,209)'];
          //       if (params.dataIndex % 2 !== 0) {
          //         return colorList[0];
          //       }
          //       return colorList[1];
          //     },
          //     opacity: 1,
          //   },
          //   label: {
          //     show: true,
          //     textStyle: {
          //       fontSize: 20,
          //     },
          //     formatter(params) {
          //       if (params.dataIndex % 2 !== 0) {
          //         return `Destination:\n${params.name}`;
          //       }
          //       return `Departure:\n${params.name}`;
          //     },
          //     position: 'top',
          //   },
          // },
          {
            name: 'lines3D',
            type: 'lines3D',
            coordinateSystem: 'globe',
            effect: {
              show: true,
              period: 2,
              trailWidth: 3,
              trailLength: 0.5,
              trailOpacity: 1,
              trailColor: '#0087f4',
            },
            blendMode: 'lighter',
            lineStyle: {
              width: 1,
              color: '#0087f4',
              opacity: 0,
            },
            data: [],
            silent: false,
          },
        ],
      },
      mapOptions: {
        backgroundColor: mapbgColor, // 立体球形贴图的颜色
        visualMap: {
          show: false,
          min: 0,
          max: 100000,
        },
        series: [
          {
            type: 'map',
            map: 'world',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            environment: 'rgba(0,0,0,0)',
            boundingCoords: [
              [-180, 90],
              [180, -90],
            ],
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: 'rgb(0,232,232)', // 地球纹路的颜色
                areaColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  // 相邻每个板块 从上到下的颜色变化
                  colorStops: [{
                    offset: 0.2, color: 'rgb(0,48,62)', // 0% 处的颜色
                  }, {
                    offset: 0.8, color: 'rgba(0,179,188,0.8)', // 100% 处的颜色
                  }],
                  global: false, // 缺省为 false
                },
              },
            },
          },
        ],
      },
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
    // test() {
    //   this.$http.get('configData.json').then(({ data }) => {
    //     console.log('tag', data);
    //   });
    // },
    handlerClick(a, b) {
      console.log('aabb', a, b);
    },
  },
  created() {
    // 划多条线
    // eslint-disable-next-line
    this.earthOptions.series[0].data = Array.apply(null, Array(150)).map(() => this.rodamData());
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
  #earth {
    height: 100%;
    width: 100%;
  }
}
</style>
