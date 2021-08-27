<template>
<div class="newMV">
  <div class="tabs-wrapper">
    <div class="tabs-container">
      <p class="tabs-name"  v-for="item in areaTab" :key="item.id" :class="{tabs_active:areaActive===item.id}" @click="isCheck(item.id,item.name,item.type)">{{item.name}}</p>
    </div>
    <div class="tabs-container">
      <p class="tabs-name"  v-for="item in typeTab" :key="item.id" :class="{tabs_active:typeActive===item.id}" @click="isCheck(item.id,item.name,item.type)">{{item.name}}</p>
    </div>
    <div class="tabs-container">
      <p class="tabs-name"  v-for="item in sortTab" :key="item.id" :class="{tabs_active:orderActive===item.id}" @click="isCheck(item.id,item.name,item.type)">{{item.name}}</p>
    </div>
  </div>
  <div class="mv-list-wrapper">
    <MVCard  v-for="mv in MVList" :key="mv.id" :mv="mv" class="MVCard"/>
  </div>
  <div class="block">
    <el-pagination
      layout="prev, pager, next"
      :current-page.sync="offset"
      :page-count="getPageCount"
      @current-change="onPageChange">
    </el-pagination>
  </div>
</div>
</template>

<script>
import MVCard from '../components/base/mv-card.vue'
import {getAllMV} from '../api/newMV'
export default {
  name:"NewMV",
  components:{
    MVCard
  },
  data() {
    return {
      areaTab:[
        {
          id:0,
          name:'全部',
          type:0
        },
        {
          id:1,
          name:'内地',
          type:0
        },
        {
          id:2,
          name:'港台',
          type:0
        },
        {
          id:3,
          name:'欧美',
          type:0
        },
        {
          id:4,
          name:'日本',
          type:0
        },
        {
          id:5,
          name:'韩国',
          type:0
        }
      ],
      typeTab:[
        {
          id:0,
          name:'全部',
          type:1
        },
        {
          id:1,
          name:'官方版',
          type:1
        },
        {
          id:2,
          name:'原声',
          type:1
        },
        {
          id:3,
          name:'现场版',
          type:1
        },
        {
          id:4,
          name:'网易出品',
          type:1
        }
      ],
      sortTab:[
        {
          id:0,
          name:'上升最快',
          type:2
        },
        {
          id:1,
          name:'最热',
          type:2
        },
        {
          id:2,
          name:'最新',
          type:2
        }
      ],
      areaActive:0,
      typeActive:0,
      orderActive:0,
      area:'全部',
      type:'全部',
      order:'上升最快',
      limit:40,
      offset:1,
      MVList:[],
      total:0
    }
  },
  methods: {
      isCheck(id,name,type){
        if(type===0){
          this.areaActive=id
          this.area=name
        }else if(type===1){
          this.typeActive=id
          this.type=name
        }else{
          this.orderActive=id
          this.order=name
        }
        this.offset = 1
        this.getAllMV(this.area,this.type,this.order,this.limit,this.getOffset)
    },
    getAllMV(area,type,order,limit,offset){
      getAllMV(area,type,order,limit,offset).then(res=>{
        console.log(res)
        this.MVList = res.data
        if(res.count){
          this.total = res.count
        }
      })
    },
    onPageChange(){
      // console.log(this.getOffset)
        this.getAllMV(this.area,this.type,this.order,this.limit,this.getOffset)
    },  
  },
  computed:{
    getOffset(){
      return (this.offset-1)*this.limit
    },
    getPageCount(){
      return Math.ceil(this.total/this.limit)
    }
  },
  created() {
      this.getAllMV(this.area,this.type,this.order,this.limit,this.getOffset)
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.newMV
  width 100%
  padding 1rem
  box-sizing border-box
  display flex
  flex-direction column
  .tabs-wrapper
      width 100%
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
  .mv-list-wrapper
    width 100%
</style>