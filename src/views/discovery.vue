<template>
<div class="discovery">
    <Banners/>
    <RecommendList/>
    <NewSongsList/>
    <NewMV/>
</div>
</template>

<script>
import Banners from '../components/discovery/banner.vue'
import RecommendList from '../components/discovery/recommendList.vue'
import NewSongsList from '../components/discovery/newSongsList.vue'
import NewMV from '../components/discovery/newMV.vue'
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
</style>