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
        <div class="card bg-white mt-3">
          <div class="card-header p-3">
            <i class="iconfont icon-menu fs-sm"></i>
            <span class="fs-xl px-2">新闻资讯</span>
          </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: ".pagination-home"
                }
            }
        };
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
