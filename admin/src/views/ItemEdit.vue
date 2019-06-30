<template>
    <div class="category">
        <h1>{{id?'编辑':'新建'}}物品</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            
            <el-form-item label="物品名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="物品图标">
                <el-input v-model="model.icon"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: {}
    },
    data() {
        return {
            model: {},
        };
    },
    methods: {
        async save() {
            if (this.id) {
                await this.$http.put(`item/${this.id}`, this.model);
                this.$router.push("/item/list");
                this.$message({
                    type: "success",
                    message: "修改成功"
                });
            } else {
                await this.$http.post("item", this.model);
                this.$router.push("/item/list");
                this.$message({
                    type: "success",
                    message: "保存成功"
                });
            }
        },
        async fetch() {
            const res = await this.$http.get(`item/${this.id}`);
            this.model = res.data;
        },
        async fetchParents() {
            const res = await this.$http.get("item");
        }
    },
    created() {
        this.id && this.fetch();
    }
};
</script>

