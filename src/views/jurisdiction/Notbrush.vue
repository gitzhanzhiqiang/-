<template>
    <div class="app-container calendar-list-container ggg_user">
        <!-- 搜索条件 -->
        <el-form :inline="true" :model="params" ref="params" class="demo-form-inline" @keyup.enter.native="getTable('isseach')">
            <el-form-item label="当前页:" prop="pageIndex" v-show="false">
                <el-input v-model="params.pageIndex"></el-input>
            </el-form-item>
            <el-form-item label="行数:" prop="pageSize" v-show="false">
                <el-input v-model="params.pageSize"></el-input>
            </el-form-item>
            <!--<el-form-item label="用户" prop="username">
                <el-input v-model="params.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="params.phone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" @click="getTable('isseach')">查询</el-button>
                <el-button icon="setting" @click="reset('params')">重置</el-button>
            </el-form-item>-->
        </el-form>
        <!--<el-button type="primary" @click="isShowAlert">新增</el-button>-->
        <div class="filter-container">
            <el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 80%">
                <el-table-column align="center" label="产品名称">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="排名">
                    <template slot-scope="scope">
                        {{scope.row.sort}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="上架时间">
                    <template slot-scope="scope">
                        {{scope.row.upTime}}
                    </template>
                </el-table-column>
               
               
            </el-table>
        </div>
        <!-- 分页 -->
        <div v-if="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.pageNum" :page-sizes="[10,20,30, 50]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
      
    </div>
</template>
<script>
import ajax from '@utils/config';
import { validate } from '@src/utils/validation';
export default {
    data() {
       
        return {
            listLoading: true, //列表加载状态
            loading: false, //二次点击
            params: {
                pageNum:1, //搜索条件
                pageSize:10,
               
            },
            total: 0, //总页数
            dataList: [],
            title: '',
           
           
           
        }
    },
    computed: {
    },
    created() {
        this.getTable();
       
    },
    mounted() {
    },
    methods: {
        getTable(isseach) {
            this.listLoading = true;
            if (isseach) {
                	this.params.pageNum = 1;
                }
            ajax({
                url: 'user/getProductNoSJ',
                optionParams: this.params
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        this.dataList = response.data ? response.data : [];
                        this.total = response.total;
                    } else {
                        this.$message.warning(response.msg)
                    }
                    this.listLoading = false;
                })
                .catch(error => {
                    this.listLoading = false;
                })
        },
        // 改变每一页的条数
        handleSizeChange(val) {
            this.params.pageSize = val;
            this.params.pageNum = 1;
            this.getTable(); //更新列表
        },
        // 切换页码
        handleCurrentPageChange(val) {
            this.params.pageNum = val;
            this.getTable(); //更新列表
        },
    },
    filters: {
       

    }
}
</script>
<style lang="less" scoped>

</style>


