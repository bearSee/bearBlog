<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="index">
    <!-- <div class="title animated infinite bounce delay-2s">熊二、熊二</div> -->
    <my-earth ref="earth" id="earth" :earthOptions="earthOptions" :mapOptions="mapOptions" :mapbgColor="mapbgColor"></my-earth>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import myEarth from '@/components/earth';

const starfield = require('../assets/image/starfield.jpg');
const world = require('../assets/image/world.jpg');

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
          heightTexture: world, // 地球的整个纹路
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
        backgroundColor: mapbgColor, // 当和立体球形贴图是海洋的颜色
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
    };
  },
  created() {
    // 随机划多条线
    for (let i = 0; i < 150; i++) {
      this.earthOptions.series[0].data = this.earthOptions.series[0].data.concat(this.rodamData());
    }
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
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
@import "@/assets/scss/theme.scss";

.index {
  min-height: 100%;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: rgba(250, 250, 250, .3);
  display: flex;
  .title {
    margin: auto;
    color: var(--theme);
    font-size: 40px;
  }
  #earth {
    height: 100%;
  }
}
</style>
