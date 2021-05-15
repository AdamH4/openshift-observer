<template>
    <div class="list__item">
        <div class="item__name">{{ label }}</div>
        <div class="item__value">
            <a v-if="isLink" target="_blank" :href="value">{{ value }}</a>
            <span v-else>{{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        label: String,
        value: String,
    },
    computed: {
        isLink(){
            try{
                new URL(this.value)
                return true
            }catch(_){
                return false
            }
        }
    }
}
</script>

<style scoped>
    .list__item{
        padding: 6px 0;
        border-bottom: 1px solid rgb(216, 216, 216);
        display: flex;
        column-gap: 3em;
    }
    .list__item:hover{
        background-color: rgb(216, 216, 216);
        opacity: 0.7;
    }
    .item__name{
        flex: 1;
        border-radius: 3px;
        padding: 5px;
    }
    .item__value{
        display: block;
        flex: 4;
        padding: 5px;
        text-align: end;
    }
</style>