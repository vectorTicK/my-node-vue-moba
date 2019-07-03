<template>
    <div>
        <h1>英雄列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240"></el-table-column>
            <el-table-column prop="name" label="英雄名称"></el-table-column>
            <el-table-column prop="category.name" label="英雄类型"></el-table-column>

            <el-table-column prop="avatar" label="英雄头像">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="" style="width:3rem;height:auto">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="$router.push(`/hero/edit/${scope.row._id}`)"
                    >编辑</el-button>
                    <el-button type="warning" size="small" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: []
        };
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("rest/hero");
            this.items = res.data;
        },
        async remove(row) {
            this.$confirm(`是否继续删除 "${row.name}"`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await this.$http.delete(`rest/hero/${row._id}`);
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    this.fetch();
                })
                .catch(err => {
                    this.$message({
                        type: "success",
                        message: err
                    });
                });
        }
    },
    created() {
        this.fetch();
    }
};
</script>

