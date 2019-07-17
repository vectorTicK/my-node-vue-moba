<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img height="30" src="../assets/logo.png" alt />
            <div class="flex-1 px-3">
                <div class="text-white">王者荣耀</div>
                <div class="text-grey-1 fs-xs">团队成就更多</div>
            </div>
            <button type="button" class="btn bg-primary p-2 fs-xs">立即下载</button>
        </div>
        <div class="bg-primary py-3">
            <div class="nav d-flex jc-around text-light">
                <div class="nav-item active">
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
                </div>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>
<script>
export default {};
</script>

<style>
</style>
