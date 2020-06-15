<template>
	<view >
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
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
			<view class="bg-white solids-top padding-sm">
				<view class="flex">
					<view class="flex-twice bg-blue text-lg text-center padding-sm" @tap="bindLogin">
						登录
					</view>
					<view class="flex-sub">
						<view class="cu-btn bg-white text-blue lg" @tap="bindRegister">注册账号</view>
					</view>
				</view>
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
				password: ''
			};
		},
		methods: {
			bindLogin() {
				if (this.username.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入账号'
					});
					return;
				}
				if (this.password.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				uni.request({
					url: service.getAjaxUrl + 'NingLogin',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						username: this.username,
						password: this.password
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							const validUser = {
								username: e.data.data.username,
								password: e.data.data.password,
								fullname: e.data.data.fullname,
								shopname: e.data.data.shopname,
								expire_time: e.data.data.expire_time
							}
							validUser.hasLogin = true;
							service.setUser(validUser);
							uni.navigateTo({
								url: '../index/index?PageCur=my'
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
			bindRegister() {
				uni.navigateTo({
					url: 'reg'
				});
			}
		}
	}
</script>

<style>

</style>
