<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">客户</block>
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
				<view class="title">会员年龄:</view>
				<input placeholder="请输入年龄数字" v-model="birthday" type="number" maxlength="3"></input>
			</view>
		</form>
		<view class="cu-card article" v-for="(item,index) in listcrmuser">
			<view class="cu-item shadow">
				<view class="title">
					<view class="text-cut">
						<view class="fl">{{item.fullname}}</view>
						<view class="fr">{{item.create_time}} </view>
					</view>
				</view>
				<view class="content">
					<view class="text-content">
						<view>手机号码:{{item.mobile}}</view>
						<view>会员年龄:{{item.age}}</view>
						<view>会员类型:{{item.crm_user_type_name}}</view>
					</view>
				</view>
			</view>
			<view v-if="index == (listcrmuser.length-1)" class="text-center text-gray tabbar foot margin">-------已经到底了-------</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				fullname: '',
				birthday: '',
				listcrmuser: [],
				mobile: ''
			};
		},
		onLoad: function(option) {
			//开始下拉刷新
			this.bindSearch();
		},
		methods: {
			bindSearch() {
				uni.request({
					url: service.getAjaxUrl + 'NingCRMUser',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						fullname: this.fullname,
						mobile: this.mobile,
						birthday: this.birthday
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							//遍历结果
							if (e.data.data.length > 0) {
								this.listcrmuser = [];
								for (var i = 0; i < e.data.data.length; i++) {
									var tempdata = {};
									tempdata["mobile"] = e.data.data[i].mobile;
									tempdata["fullname"] = e.data.data[i].fullname;
									tempdata["age"] = e.data.data[i].age;
									tempdata["create_time"] = e.data.data[i].create_time;
									tempdata["crm_user_type_name"] = e.data.data[i].crm_user_type_name;
							
									this.listcrmuser.push(tempdata);
								}
							
							}
						} else {
							this.listcrmuser = [];
							uni.showToast({
								icon: 'none',
								title: '查询失败,' + e.data.msg
							});
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
