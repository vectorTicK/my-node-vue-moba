<template>
    <m-card :icon="icon" :title="title">
        <div class="nav jc-between">
            <div
                class="nav-item"
                v-for="(item,index) in categories"
                :key="index"
                :class="{active: (index===active)}"
                @click="active =index"
            >
                <div class="nav-link">{{item.name}}</div>
            </div>
        </div>
        <div class="swiper mt-3">
            <swiper>
                <swiper-slide v-for="(item,index) in categories" :key="index">
                    <slot name="items" :cate="item"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </m-card>
</template>

<script>
export default {
    props: {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        categories: { type: Array, required: true }
    },
    data() {
        return {
            active: 0
        };
    }
};
</script>

<style lang="scss">
</style>

