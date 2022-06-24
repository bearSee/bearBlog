<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="index">
    <earth
      ref="earth"
      id="earth"
      v-if="earthOptions && mapOptions"
      :earth-options="earthOptions"
      :map-options="mapOptions"
      :mapbg-color="themeColor" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import earth from '@/components/earth';

const starfield = require('@/assets/image/starfield.jpg');

export default {
    name: 'Index',
    components: {
        earth,
    },
    data() {
        return {
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
    methods: {
        getEarthConfig() {
            this.$http.get('index/earthConfig.json').then(({ data }) => {
                const { earthOptions = {}, mapOptions = {} } = data || {};
                earthOptions.series[0].data = Array(150).fill().map(() => this.rodamData());
                earthOptions.globe.environment = starfield;
                mapOptions.backgroundColor = this.themeColor;
                this.earthOptions = earthOptions;
                this.mapOptions = mapOptions;
            });
        },
        // 划线方法
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
        this.getEarthConfig();
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
.index-container {
    overflow: hidden;
    .index {
        height: 100%;
        background-image: url(../assets/image/starfield.jpg)!important;
        background-size: cover!important;
        #earth {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
