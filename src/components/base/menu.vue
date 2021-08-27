<template>
  <div class="menu-wrapper">
      <div class="menu-container">
          <div class="menu-element" 
          v-for="(item,index) in list" 
          :key="index" 
          :class="{active:active==index}"
          @click="handleMenuClick(index)"
          >
              <span>{{item}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"Menu",
    data() {
        return {
            active:0,
            isShow:''
        }
    },
    props:{
        list:Array
    },
    methods: {
        handleMenuClick(index){
            this.isShow=this.list[index]
            this.active=index
            this.$emit("isShow",this.isShow)
        }
    },
    created() {
        this.isShow=this.list[0]
    },
    mounted() {
        this.$emit("isShow",this.isShow)
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.menu-wrapper
    width 100%
    height 3rem
    background-color $mainColor
    margin-bottom 1rem
    .menu-container
        width 100%
        height 100%
        .menu-element
            min-width 5rem
            height 3rem
            line-height 3rem
            float left
            text-align center
            color $bgColor
            font-size 1rem
            transition all 0.3s
            cursor pointer
        .active
            background-color #fff
            font-size 1.2rem
            font-weight bold
            border-bottom 0.25rem solid $bgColor

</style>