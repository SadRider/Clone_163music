<template>
<div class="MVcontainer">
    <p class="title">最新MV</p>
    <div class="mvlist-wrapper">
        <MVCard v-for="mv in MVList" :key="mv.id" :mv="mv" class="MVCard"/>
    </div>
</div>
</template>

<script>
import { getPersonalizedMv } from '../../api/discovery'
import MVCard from '../../components/base/mv-card.vue'
export default {
    name:'NewMV',
    data() {
        return {
            MVList:[]
        }
    },
    components:{
        MVCard
    },
    methods: {
        getPersonalizedMv(){
            getPersonalizedMv().then(res=>{
                const newData = res.result.map(item=>({
                    id:item.id,
                    name:item.name,
                    picUrl:item.picUrl,
                    artistName:item.artistName
                }))
                this.MVList = newData
            })
        },
        PlayMV(id){
            this.$router.push({
                name:'videoplay',
                params:{
                    id
                }
            })
        }
    },
    created() {
        this.getPersonalizedMv()
    },
    computed:{}
}
</script>

<style lang="stylus" scoped>
.title
    font-size 1.5rem
    margin 0.3rem
.mvlist-wrapper
    display flex
    width 100%
    .MVCard
        flex 1
</style>