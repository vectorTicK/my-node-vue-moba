<template>
    <div class="page-article p-2" v-if="model">
        <div class="d-flex ai-center border-bottom pb-2">
            <i class="iconfont icon-menu"></i>
            <strong class="flex-1 text-info px-2">{{model.title}}</strong>
            <div class="fs-xs text-grey">{{model.createdAt|date}}</div>
        </div>
        <div v-html="model.body" class="body p-2"></div>
        <div class="article-related border-top py-2">
            <i class="iconfont icon-menu"></i>
            <strong class="flex-1 text-info px-2">相关资讯</strong>
            <router-link class="py-1"

                tag="div"
                :to="`/article/${item._id}`"
                v-for="(item) in model.related"
                :key="item._id"
            >{{item.title}}</router-link>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
export default {
    filters: {
        date(val) {
            return dayjs(val).format("MM/DD");
        }
    },
    props: {
        id: { required: true }
    },
    data() {
        return {
            model: null
        };
    },
    methods: {
        async fetchArticle() {
            const res = await this.$http.get(`/article/${this.id}`);
            this.model = res.data;
        }
    },
    created() {
        this.fetchArticle();
    },
    watch: {
        id: "fetchArticle"
    }
};
</script>

<style lang="scss">
.body {
    img {
        max-width: 100%;
        height: auto;
    }
}
</style>
