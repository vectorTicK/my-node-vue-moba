<template>
    <div class="category">
        <h1>{{id?'编辑':'新建'}}文章</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-form-item label="类型">
                <el-select v-model="model.categories" multiple>
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="正文">
                <vue-editor
                    v-model="model.body"
                    useCustomImageHandler
                    @imageAdded="handleImageAdded"
                ></vue-editor>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
    components: {
        VueEditor
    },
    props: {
        id: {}
    },
    data() {
        return {
            model: {},
            categories: []
        };
    },
    methods: {
        async save() {
            if (this.id) {
                await this.$http.put(`rest/article/${this.id}`, this.model);
                this.$router.push("/article/list");
                this.$message({
                    type: "success",
                    message: "修改成功"
                });
            } else {
                await this.$http.post("/rest/article", this.model);
                this.$router.push("/article/list");
                this.$message({
                    type: "success",
                    message: "保存成功"
                });
            }
        },
        async fetch() {
            const res = await this.$http.get(`rest/article/${this.id}`);
            this.model = res.data;
        },
        // 获取新闻分类
        async fetchCategories() {
            const res = await this.$http.get(
                `rest/categories/article_categories`
            );
            this.categories = res.data;
        },

        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)

            let formData = new FormData();
            formData.append("file", file);
            const res = await this.$http.post("upload", formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        },

        afterUpload(res) {
            this.$set(this.model, "icon", res.url);
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

