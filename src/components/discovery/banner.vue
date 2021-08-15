<template>
  <el-carousel :interval="4000" type="card" class="banner-carousel">
    <el-carousel-item v-for="banner in banners" :key="banner.scm">
      <img :src="banner.imageUrl" class="banner-img">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import {getBanner} from '../../api/discovery'
export default {
  name:'banner',
  data() {
    return {
      banners:[]
    }
  },
  // async created() {
  //   const { banners } = await getBanner()
  //   this.banners = banners
  // },
methods: {
  getBanners(){
    getBanner().then(res=>{
      // console.log(res)
      this.banners = res.banners
    })
  }
},
created() {
  this.getBanners()
},
}
</script>

<style lang="stylus" scoped>
.banner-carousel
  /deep/.el-carousel__container//深度选择器，修改elementui样式
    height 12.5rem

  .banner-img
    width 100%
    height 100%
    border-radius 0.25rem
</style>