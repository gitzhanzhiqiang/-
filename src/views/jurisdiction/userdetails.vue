<template>
	<div class="app-container calendar-list-container ggg_user">
		<!-- 搜索条件 -->
		<el-form :inline="true" :model="params" ref="params" class="demo-form-inline" @keyup.enter.native="getTable('isseach')">
			<el-form-item label="当前页:" prop="pageNum" v-show="false">
				<el-input v-model="params.pageNum"></el-input>
			</el-form-item>
			<el-form-item label="行数:" prop="pageSize" v-show="false">
				<el-input v-model="params.pageSize"></el-input>
			</el-form-item>
			<el-form-item label="时间" prop="time">
				<el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
			</el-form-item>
			<div v-show="false">
				<el-form-item label="开始时间" prop="dateFrom">
					<el-input v-model="params.dateFrom" placeholder="开始"></el-input>
				</el-form-item>
				<el-form-item label="结束时间" prop="dateTo">
					<el-input v-model="params.dateTo" placeholder="结束"></el-input>
				</el-form-item>
			</div>
			<el-form-item label="产品" prop="productId">
				<el-select v-model="params.productId" placeholder="请选择">
					<el-option v-for="item in product" :key="item.id" :label="item.product" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="getTable('isseach')">查询</el-button>
				<el-button icon="setting" @click="reset('params')">重置</el-button>
			</el-form-item>
		</el-form>
		<!--<el-button type="primary" @click="isShowAlert">新增</el-button>-->
		<div class="filter-container">
			<el-table :data="dataList" v-loading="listLoading" border fit highlight-current-row style="width: 80%">
				<el-table-column align="center" label="时间">
					<template slot-scope="scope">
						{{scope.row.createTime}}
					</template>
				</el-table-column>
				<el-table-column align="center" label="产品">
					<template slot-scope="scope">
						{{scope.row.product}}
					</template>
				</el-table-column>
				<el-table-column align="center" label="注册账户">
					<template slot-scope="scope">
						{{scope.row.phone}}
					</template>
				</el-table-column>
				<el-table-column align="center" label="注册密码">
					<template slot-scope="scope">
						{{scope.row.pwd}}
					</template>
				</el-table-column>

			</el-table>
		</div>
		<!-- 分页 -->
		<div v-if="total" class="pagination-container">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="params.pageNum" :page-sizes="[10,20,30, 50]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

	</div>
</template>
<script>
	import ajax from '@utils/config';
	import { parseTime } from '@src/filters';
	import { validate } from '@src/utils/validation';
	export default {
		data() {

			return {
				listLoading: true, //列表加载状态
				loading: false, //二次点击
				params: {
					pageNum: 1, //搜索条件
					pageSize: 10,
					dateFrom: '', // 筛选时间 不传或同时传
					dateTo: "",
					productId: '', // getProducts接口获取的产品id
				},
				time: '',
				total: 0, //总页数
				dataList: [],//列表
				product:[],//产品
				title: '',

			}
		},
		computed: {},
		created() {
			this.getTable();
			this.products()
		},
		mounted() {},
		methods: {
			getTable(isseach) {
				this.listLoading = true;
                if (isseach) {
                	this.params.pageNum = 1;
                }
                let time = this.time ? this.time : [];
                this.params.dateFrom = parseTime(time[0], '{y}-{m}-{d}');
                this.params.dateTo = parseTime(time[1], '{y}-{m}-{d}');
				ajax({
						url: 'user/getUserDetail',
						optionParams: this.params
					}).post()
					.then(response => {
						if(response.code === 200) {
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
			products() {
				ajax({
						url: 'user/getProducts',
						optionParams: {
							
						}
					}).post()
					.then(response => {
						if(response.code === 200) {
							this.product = response.data ? response.data : [];
						} else {
							this.$message.warning(response.msg)
						}
						this.listLoading = false;
					})
					.catch(error => {
						this.listLoading = false;
					})
			},
			 reset(formName) {
	            this.time = '';
	            this.$refs[formName].resetFields(); //恢复表单及数据初始化状态
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