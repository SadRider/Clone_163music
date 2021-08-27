<template>
<div class="newsong-wra">
  <div class="newsong-container">
    <div class="newsong-tabs-wrapper">
      <div class="tabs-container">
        <p class="tabs-name"  v-for="item in tabs" :key="item.id" :class="{tabs_active:active===item.id}" @click="isCheck(item.id,item.type)">{{item.name}}</p>
      </div>
    </div>
    <div class="newsong-list-wrapper">
        <div class="playlist-content">
          <el-table
              :data="songsList"
              stripe
              style="width: 100%"
              @row-click="OnclickSong"
              >
              <el-table-column
              type="index"
              width="50">
              </el-table-column>
              <el-table-column
              label=""
              width="96">
                  <template slot-scope="scope"><img v-lazy="scope.row.picUrl" style="width:3rem;border-radius:0.5rem;"></template>
              </el-table-column>
              <el-table-column
              prop="name"
              label="音乐标题"
              width="300"
              >
              </el-table-column>
              <el-table-column
              prop="artist"
              label="歌手"
              width="180"
              >
              </el-table-column>
              <el-table-column
              prop="albumName"
              label="专辑"
              >
              </el-table-column>
              <el-table-column
              prop="time"
              label="时长">
              </el-table-column>
          </el-table>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import {getNewSongList} from '../api/newsongs'
export default {
  name:'NewSongs',
  data() {
    return {
        tabs:[
        {
          id:0,
          name:'全部',
          type:0
        },
        {
          id:1,
          name:'华语',
          type:7
        },
        {
          id:2,
          name:'欧美',
          type:96
        },
        {
          id:3,
          name:'日本',
          type:8
        },
        {
          id:4,
          name:'韩国',
          type:16
        },
      ],
      active:0,
      songsList:[]
    }
  },
  methods: {
    isCheck(id,type){
      this.active = id
      this.getNewSongList(type)
    },
    getNewSongList(type){
      getNewSongList(type).then(res=>{
        console.log(res)
        const newData = res.data.map(item=>({
          id:item.id,
          name:item.name,
          artist:item.artists.map(artItem=>artItem.name).join('/'),
          albumName:item.album.name,
          time:item.duration,
          picUrl:item.album.picUrl
        }))
        this.songsList = newData
      })
    },
    OnclickSong(row){
      this.$store.commit({
          type:'player/selectSongByIndex',
          id:row.id,
          list:this.songsList
      })
    }
  },
  created() {
    this.getNewSongList(0)
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.newsong-wra
  width 100%
  padding 1rem
  box-sizing border-box
  // background-color green
  .newsong-container
    width 100%
    .newsong-tabs-wrapper
      width 100%
      height 2rem
      .tabs-container
        width 100%
        height 100%
        line-height 2rem
        display flex
        .tabs-name
          margin 0 1rem
          cursor pointer
        .tabs_active
          color $bgColor
</style>
