<template>
    <div class="hero">
        <h1>{{id?'编辑':'新建'}}英雄</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="称号">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="model.categories" multiple>
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers = "getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="afterUpload"
                    :before-upload="beforeUpload"
                >
                    <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="难度">
                <el-rate style="margin-top:0.75rem" v-model="model.scores.difficult"></el-rate>
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
            model: {
                scores: {difficult:1}
            },
            categories: []
        };
    },
    methods: {
        async save() {
            if (this.id) {
                await this.$http.put(`rest/hero/${this.id}`, this.model);
                this.$router.push("/hero/list");
                this.$message({
                    type: "success",
                    message: "修改成功"
                });
            } else {
                await this.$http.post("/rest/hero", this.model);
                this.$router.push("/hero/list");
                this.$message({
                    type: "success",
                    message: "保存成功"
                });
            }
        },
        async fetch() {
            const res = await this.$http.get(`rest/hero/${this.id}`);
            this.model = Object.assign({}, this.model,res.data);
        },
        async fetchCategories() {
            const res = await this.$http.get(`rest/categories/hero_categories`);
            this.categories = res.data;
        },
        afterUpload(res) {
            this.$set(this.model, "avatar", res.url);
        },

        beforeUpload() {}
    },
    created() {
        this.id && this.fetch();
        this.fetchCategories();
    }
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

