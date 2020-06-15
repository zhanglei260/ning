<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">注册</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">登录用户:</view>
				<input placeholder="请输入登录用户" v-model="username" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">登录密码:</view>
				<input placeholder="请输入登录密码" v-model="password" type="password"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">用户姓名:</view>
				<input placeholder="请输入用户姓名" v-model="fullname" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">门诊名称:</view>
				<input placeholder="请输入门诊名称" v-model="shopname" name="input"></input>
			</view>
			<view class="padding flex flex-direction bg-white solids-top">
				<button class="cu-btn bg-blue lg" @tap="bindLogin">注册</button>
			</view>
		</form>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				username: '',
				fullname: '',
				shopname: '',
				password: ''
			};
		},
		methods: {
			bindLogin() {
				if (this.username.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.fullname.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户姓名'
					});
					return;
				}
				if (this.shopname.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入门诊名称'
					});
					return;
				}
				uni.request({
					url: service.getAjaxUrl + 'NingRegister',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						username: this.username,
						password: this.password,
						fullname: this.fullname,
						shopname: this.shopname
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							uni.navigateTo({
								url: 'login'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '登录失败,' + e.data.msg
							});
						}
					}
				});
			},

		}
	}
</script>

<style>

</style>
