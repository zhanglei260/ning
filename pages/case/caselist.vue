<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">病例列表</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">客户姓名:</view>
				<input placeholder="请输入客户姓名" v-model="fullname" name="input"></input>
				<button class='cu-btn bg-blue shadow' @tap="bindSearch">
					<text class="cuIcon-search"></text> 查询
				</button>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码:</view>
				<input placeholder="请输入手机号码" v-model="mobile" type="number" maxlength="11"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">开始日期</view>
				<picker mode="date" :value="start_date" start="2015-09-01" end="2020-09-01" @change="StartDateChange">
					<view class="picker">
						{{start_date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">截止日期</view>
				<picker mode="date" :value="end_date" start="2015-09-01" end="2020-09-01" @change="EndDateChange">
					<view class="picker">
						{{end_date}}
					</view>
				</picker>
			</view>
		</form>
		<view class="cu-card article" v-for="(item,index) in listcase" @click="bindDetails(item.uuid)" v-bind:id='index' >
			<view class="cu-item shadow margin-bottom">
				<view class="title">
					<view class="text-cut">
						<view class="fl">{{item.fullname}}</view>
						<view class="fr">{{item.create_time}} </view>
					</view>
				</view>
				<view class="content">
					<view class="text-content" style="width: 100%;">
						<view>手机号码:{{item.mobile}}</view>
						<view>主诉:{{item.chief_complaint}}
						<button class="cu-btn bg-blue fr">查看详情</button>
						</view>
						<view>
							诊断:{{item.short_content}} 
						</view>
					</view>
				</view>
			</view>
			<view v-if="index == (listcase.length-1)" class="text-center text-gray tabbar foot margin">-------已经到底了-------</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				fullname: '',
				start_date: '2020-06-12',
				end_date: '2020-06-13',
				listcase: [],
				mobile: ''
			};
		},
		onLoad: function(option) {
			//初始化时间
			//this.start_date = this.DateFormat();
			this.end_date = this.DateFormat();
			//开始下拉刷新
			this.bindSearch();
		},
		methods: {
			bindSearch() {
				const validUser = service.getUsers();
				if (validUser.username == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请先登录后再查询'
					});
					return;
				}
				uni.request({
					url: service.getAjaxUrl + 'NingCaseList',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						username: validUser.username,
						fullname: this.fullname,
						mobile: this.mobile,
						start_date: this.start_date,
						end_date: this.end_date
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							//遍历结果
							if (e.data.data.length > 0) {
								this.listcase = [];
								for (var i = 0; i < e.data.data.length; i++) {
									var tempdata = {};
									tempdata["mobile"] = e.data.data[i].mobile;
									tempdata["fullname"] = e.data.data[i].fullname;
									tempdata["create_time"] = e.data.data[i].create_time;
									tempdata["chief_complaint"] = e.data.data[i].chief_complaint;
									tempdata["short_content"] = e.data.data[i].short_content;
									tempdata["uuid"] = e.data.data[i].uuid;

									this.listcase.push(tempdata);
								}

							}
						} else {
							this.listcase = [];
							uni.showToast({
								icon: 'none',
								title: '查询失败,' + e.data.msg
							});
						}
					}
				});
			},
			StartDateChange(e) {
				this.start_date = e.detail.value
			},
			EndDateChange(e) {
				this.end_date = e.detail.value
			},
			bindDetails(e) {
				const validUser = service.getUsers();
				if (validUser.username == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请先登录后再查询'
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/case/casedetail?main_uuid=' + e,
				});
			},
			DateFormat() {
				const date = new Date();
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				
				if(month < 10 &&day.length < 10){
					return year + '-0' + month + '-0' + day;
				}
				else if(month< 10 ){
					return year + '-0' + month + '-' + day;
				}
				else if(day.length < 10){
					return year + '-' + month + '-0' + day;
				}
				else{
					return year + '-' + month + '-' + day;
				}
			}
		}
	}
</script>

<style>

</style>
