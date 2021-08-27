<template>
    <div class="tabs-container">
        <p class="tabs-name"  v-for="item in tabs" :key="item.id" :class="{tabs_active:s_active===item.id}" @click="isCheck(item.id,item.name)">{{item.name}}</p>
    </div>
</template>

<script>
export default {
    name:'Tab',
    props:{
        tabs:Array
    },
    methods: {
    isCheck(id,name){
      this.active = id
      this.tagName = name
    },
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';

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