<template>
    <div>
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
    <!-- slides -->
    <swiper-slide>
      <img class="w-100" src="../assets/images/e6ca6c61670f1dd4953cd99a13a08a91.jpeg" alt="">
    </swiper-slide>
    <swiper-slide>
            <img class="w-100" src="../assets/images/74d234dfbfd7d7c1b7ceea8b9e9b88b7.jpeg" alt="">

    </swiper-slide>
    <swiper-slide>
            <img class="w-100" src="../assets/images/6cfb35d71c64ccb688bae49880b4a648.jpeg" alt="">

    </swiper-slide>

    <!-- Optional controls -->
    <div class="swiper-pagination pagination-home text-right pr-3"  slot="pagination"></div>

  </swiper>
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
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
    border-radius:0.2308rem;
  }
}
</style>
