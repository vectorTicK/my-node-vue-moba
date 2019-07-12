<template>
    <div class="category">
        <h1>{{id?'编辑':'新建'}}用户</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="model.password"></el-input>
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
                await this.$http.put(`rest/admin_user/${this.id}`, this.model);
                this.$router.push("/admin_user/list");
                this.$message({
                    type: "success",
                    message: "修改成功"
                });
            } else {
                await this.$http.post("/rest/admin_user", this.model);
                this.$router.push("/admin_user/list");
                this.$message({
                    type: "success",
                    message: "保存成功"
                });
            }
        },
        async fetch() {
            const res = await this.$http.get(`rest/admin_user/${this.id}`);
            this.model = res.data;
        }

    },
    created() {
        this.id && this.fetch();
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

