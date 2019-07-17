<template>
    <div class="card bg-white p-3 mt-3">
            <div class="card-header d-flex ai-center pb-3">
                <i class="iconfont fs-md mt-1" :class="`icon-${icon}`"></i>
                <span class="fs-xl px-2 flex-1">{{title}}</span>
                <i class="iconfont icon-moreread"></i>
            </div>
            <div class="card-body mt-4">
                <slot></slot>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        title: {type:String, required: true},
        icon: {type:String, required: true},
    }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
    .card{
        .card-header{
            border-bottom: 1px solid $border-color;
        }
    }
</style>
