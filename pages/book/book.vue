<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">预约</block>
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
				<view class="title">客户年龄:</view>
				<input placeholder="请输入客户年龄" v-model="age" type="number" maxlength="3"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">预约日期</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">预约时间</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">预约内容:</view>
				<input placeholder="请输入预约内容" v-model="book_content"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">预计时长:</view>
				<input placeholder="请输入预计时长" v-model="book_hour_long" type="number" maxlength="3"></input>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue margin-tb-sm lg" @tap="bindSaveBook">保存预约</button>
			</view>
		</form>

	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				fullname: '',
				mobile: '',
				age: '',
				time: '12:00',
				date: '2020-06-13',
				book_content: '',
				book_hour_long: '',
				crm_user_uuid: ''
			};
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
				if (this.mobile.length < 1 && this.fullname.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入查询条件'
					});
					return;
				}
				if (this.mobile.length > 0 && this.mobile.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					});
					return;
				}

				uni.request({
					url: service.getAjaxUrl + 'NingCRMUser',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						fullname: this.fullname,
						mobile: this.mobile
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							//遍历结果
							if (e.data.data.length > 1) {
								uni.showToast({
									icon: 'none',
									title: '查询到多个人员,默认匹配第一个,请确认是否正确.'
								});
							}
							this.mobile = e.data.data[0].mobile;
							this.fullname = e.data.data[0].fullname;
							this.crm_user_uuid = e.data.data[0].uuid;
							this.age = e.data.data[0].age;
						} else {
							this.listcrmuser = [];
							uni.showToast({
								icon: 'none',
								title: '查询失败,' + e.data.msg
							});
						}
					}
				});
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			bindSaveBook() {
				const validUser = service.getUsers();
				if (validUser.username == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请先登录后再查询'
					});
					return;
				}
				if (this.crm_user_uuid.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入客户信息'
					});
					return;
				}
				if (this.book_content.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入预约内容'
					});
					return;
				}
				if (this.book_hour_long.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入预计时长'
					});
					return;
				}

				uni.request({
					url: service.getAjaxUrl + 'NingBook',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						username: validUser.username,
						crm_user_uuid: this.crm_user_uuid,
						book_time: this.date + ' ' + this.time + ':00',
						book_content: this.book_content,
						book_hour_long: this.book_hour_long
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							uni.showToast({
								icon: 'none',
								title: '预约成功,即将清空数据'
							});
							this.crm_user_uuid = '';
							this.fullname = '';
							this.mobile = '';
							this.age = '';
							this.book_content = '';
							this.book_hour_long = '';
						} else {
							this.listcrmuser = [];
							uni.showToast({
								icon: 'none',
								title: '预约失败,' + e.data.msg
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
