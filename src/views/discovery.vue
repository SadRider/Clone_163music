<template>
<!-- 发现音乐页面 -->
<div class="discovery">
    <Banners/>
    <RecommendList/>
    <NewSongsList/>
    <NewMV/>
</div>
</template>

<script>
import Banners from './discovery-children/banner.vue'
import RecommendList from './discovery-children/recommendList.vue'
import NewSongsList from './discovery-children/newSongsList.vue'
import NewMV from './discovery-children/newMV.vue'
export default {
  name:'discovery',
  components:{
    Banners,
    RecommendList,
    NewSongsList,
    NewMV
  }
}
</script>

<style lang="stylus" scoped>
.discovery
  padding 2rem 2rem
  position relative
</style>