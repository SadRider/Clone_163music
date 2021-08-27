<template>
    <div class="playlist-content">
        <el-table
            :data="songslist"
            stripe
            style="width: 100%"
            @row-click="OnclickSong"
            >
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column
            label="音乐标题"
            width="300"
            >
                <template slot-scope="scope"><span class="content">{{scope.row.name}}</span></template>
            </el-table-column>
            <el-table-column
            label="歌手"
            width="180"
            >
                <template slot-scope="scope"><span class="content">{{scope.row.artist}}</span></template>
            </el-table-column>
            <el-table-column
                prop="albumName"
                label="专辑"
                >
                    <template slot-scope="scope"><span @click="toAlbum(scope.row.albumID)" class="content">{{scope.row.albumName}}</span></template>
                </el-table-column>
            <el-table-column
            prop="time"
            label="时长">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:'SongListTable',
    props:{
        songslist:Array
    },
    methods: {
        OnclickSong(row){
            this.$store.commit({
                type:'player/selectSongByIndex',
                id:row.id,
                list:this.songslist
            })
        },
        toAlbum(id){
            // console.log(id)
            this.$router.push({
                name:'albums',
                params:{id}
            })
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/mixins.styl';

.playlist-content
    width 100%
    .content
        ellipsis()
</style>