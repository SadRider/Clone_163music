<template>
  <div class="desc-wrapper">
      <div class="desc-container">
          <div class="desc-content">
              <div class="title"><span>简介</span></div>
              <div class="content" v-for="(txt,index) in briefDesc" :key="index"><span>{{txt}}</span></div>
          </div>
          <div class="desc-content" v-for="item in desclist" :key="item.ti">
              <div class="title"><span>{{item.ti}}</span></div>
              <div class="content" v-for="(txt,index) in item.txt" :key="index"><span>{{txt}}</span></div>
          </div>
      </div>
  </div>
</template>

<script>
import {getArtistDesc} from '../../api/artist'
export default {
    name:'ArtistDesc',
    props:{
        id:Number
    },
    data() {
        return {
            briefDesc:[],
            desclist:[]
        }
    },
    methods: {
        getArtistDesc(){
            getArtistDesc(this.id).then(res=>{
                console.log(res)
                this.briefDesc=(res.briefDesc||'').split('\n')
                this.desclist=res.introduction.map(item=>({
                    ti:item.ti,
                    txt:(item.txt||'').split('\n')
                }))
            })
        },
    },
    created() {
        this.getArtistDesc()
    },
}
</script>

<style lang="stylus" scoped>
.desc-wrapper
    width 100%
    .desc-container
        width 100%
        padding 1rem
        box-sizing border-box
        .desc-content
            width 100%
            margin-bottom 5rem
            .title
                width 100%
                height 2rem
                padding 0 1rem
                font-size 1.2rem
                box-sizing border-box
                font-weight bold
            .content
                font-size 1rem
                text-indent 2em
                white-space pre-wrap
</style>