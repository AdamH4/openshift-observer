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

<style scoped lang="scss">
    $textColor: #9d9d9d;
    $white: #ffffff;
    .list__item{
        padding: 6px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        column-gap: 3em;
    }
    .list__item:hover{
        opacity: 0.7;
        cursor: pointer;
    }
    .item__name{
        flex: 1;
        border-radius: 3px;
        padding: 5px;
        color: $textColor;
    }
    .item__value{
        display: block;
        flex: 4;
        padding: 5px;
        text-align: end;
        color: $white;
        & a {
            color: $white;
        }
    }
</style>