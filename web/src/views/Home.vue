<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide>
                <img class="w-100" src="../assets/images/e6ca6c61670f1dd4953cd99a13a08a91.jpeg" alt />
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/74d234dfbfd7d7c1b7ceea8b9e9b88b7.jpeg" alt />
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/6cfb35d71c64ccb688bae49880b4a648.jpeg" alt />
            </swiper-slide>

            <!-- Optional controls -->
            <div class="swiper-pagination pagination-home text-right pr-3" slot="pagination"></div>
        </swiper>
        <!-- end of swiper-->
        <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
            <div class="d-flex flex-wrap">
                <div class="nav-item mb-3 py-2" v-for="n in 10" :key="n">
                    <i class="sprite sprite-news"></i>
                    <div class="fs-sm">爆料站</div>
                </div>
            </div>
            <div class="bg-light py-2">
                <i class="sprite sprite-arrow mr-1"></i>
                <span class="fs-sm">收起</span>
            </div>
        </div>
        <!-- end of nav-icons-->
        <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
            <template #items="{cate}">
                <router-link tag="div" :to="`/article/${news._id}`" class="d-flex py-2 ai-center" v-for="(news,index) in cate.newsList" :key="index">
                    <span class="fs-xs text-info">[{{news.categoryName}}]</span>
                    <span class="px-1">|</span>
                    <span class="title flex-1 text-ellipsis text-dark-1">{{news.title}}</span>
                    <span class="date pl-3 fs-xs text-grey">{{news.createdAt | date}} </span>
                </router-link>
            </template>
        </m-list-card>

        <m-card icon="menu" title="英雄列表"></m-card>
    </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
        filters: {
        date(val) {
            return dayjs(val).format('MM/DD')
        }
    },
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: ".pagination-home"
                }
            },
            newsCats: [
            ]
        };
    },
    created() {
        this.fetchNewsCats()
    },
    methods: {
        async fetchNewsCats() {
            const res = await this.$http.get('news/list')
            this.newsCats = res.data
        }
    }
    
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.pagination-home {
    .swiper-pagination-bullet {
        opacity: 1;
        background: #fff;
        &.swiper-pagination-bullet-active {
            background: map-get($colors, "info");
        }
        border-radius: 0.2308rem;
    }
}

.nav-icons {
    .nav-item {
        width: 25%;
        border-right: 1px solid $border-color;
        &:nth-child(4n) {
            border-right: none;
        }
    }
}
</style>
