<template>
    <div class="mv-wrapper">
        <div class="mv-container">
            <MVCard v-for="item in mvlist" :key="item.id" :mv="item"/>
        </div>
    </div>
</template>

<script>
import MVCard from '../../components/base/mv-card.vue'
import {getArtistMV} from '../../api/artist'
export default {
    name:'ArtistMV',
    components:{
        MVCard
    },
    props:{
        id:Number
    },
    data() {
        return {
            mvlist:[]
        }
    },
    methods: {
        getArtistMV(){
            getArtistMV(this.id).then(res=>{
                console.log(res)
                this.mvlist=res.mvs
            })
        }
    },
    created() {
        this.getArtistMV()
    },
}
</script>

<style lang="stylus" scoped>
.mv-wrapper
    width 100%
    display flex
    flex-direction column
    .mv-container
        width 100%
        padding 1rem
</style>