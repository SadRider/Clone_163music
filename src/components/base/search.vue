<template>
  <div class="search-wrapper">
      <div class="search-container">
          <el-input v-model="keyword" class="input" @focus="focus" placeholder="搜索" @keyup.enter.native="toResult(keyword)"></el-input>
      </div>
      <div v-show="!isHidden">
        <HotSearch v-show="!isSearch"/>
        <Suggest v-show="isSearch" :keyword="keyword" @hidden="colse"/>
      </div>
  </div>
</template>

<script>
import HotSearch from './search-children/hot-search.vue'
import Suggest from './search-children/suggest.vue'
export default {
    name:'Search',
    components:{
         HotSearch,
         Suggest
    },
    data() {
        return {
            keyword:'',
            isSearch:false,
            isHidden:true
        }
    },
    methods: {
        colse(){
        //失去焦点时隐藏建议栏
            this.isHidden=true
        },
        blur(){
            setTimeout(() => {
                this.isHidden=true
            }, 100.);
        },
        //获取焦点时显示建议栏
        focus(){
            this.isHidden=false
        },
        toResult(keyword){
            const re = new RegExp("^[ ]+$")//判断是否输入空格
            if(keyword!==undefined && keyword.length!==0 && keyword!==null&&!re.test(keyword)){
                this.$router.push({
                    name:'search',
                    params:{keyword}
                })
            }
        this.isHidden=true
        }
    },
    watch:{
        //监听keyword，切换热搜和建议的显示隐藏
        keyword(){
            if(this.keyword!=''&&!this.isSearch){
                this.isSearch=true
            }
            if(this.keyword==''&&this.isSearch){
                this.isSearch=false
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.search-wrapper
    width 15rem
    height 100%
    .search-container
        width 100%
        height 100%
        padding 0.5rem
        box-sizing border-box
        position relative
        .input
            position absolute
            width 90%
            top 50%
            transform translateY(-50%)
</style>