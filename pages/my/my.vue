<template>
	<view class="box">
		<br />
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的</block>
		</cu-custom>
		<view v-if="!valid()" class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-black">杨宁{{fullname}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							账号:yangning{{account}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="!valid()" class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 基本信息
			</view>
		</view>
		<view v-if="!valid()" class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-shop text-green"></text>
					<text class="text-grey padding-right">所属门诊</text>
					<text class="text-grey text-bold">中岳口腔 {{shopname}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-yellow"></text>
					<text class="text-grey padding-right">到期时间</text>
					<text class="text-grey text-bold">2020-06-11 13:14:15{{expire_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-remind text-orange"></text>
					<text class="text-grey">我的预约</text>
				</navigator>
				<view class="action">
					<text class="cuIcon-right text-olive"></text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-fork text-blue"></text>
					<text class="text-grey padding-right">系统版本</text>
					<text class="text-grey text-bold">V1.0.521</text>
				</view>
			</view>
			<view class="cu-item">
				<button class="cu-btn content" open-type="contact" @tap="bindLogout">
					<text class="text-black" style="text-align: center;width: 100%;">退出登录</text>
				</button>
			</view>

		</view>
		<view v-if="!valid()" class="cu-list menu">
			<view class="cu-item">
				<button class="cu-btn content" open-type="contact" @tap="bindLogin">
					<text class="text-black" style="text-align: center;width: 100%;">登录</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		computed: {
			valid: function() {
				return function(val) {
					const validUser = service.getUsers();
					this.account = validUser.account;
					this.shopname = validUser.shopname;
					this.fullname = validUser.fullname;
					this.password = validUser.password;
					this.hasLogin = validUser.hasLogin;
					this.expire_time = validUser.expire_time;
					if (this.hasLogin) {
						//hasLoginstatus = true;
						return true;
					} else {
						return false;
					}
				}
			}
		},
		data() {
			return {
				fullname: '',
				shopname: '',
				account: '',
				password: '',
				expire_time: '',
				hasLogin: false
			}
		},
		methods: {
			bindLogin() {
				uni.navigateTo({
					url: '../my/login',
				});
			},
			bindLogout() {
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				const datas = {
					account: '',
					password: '',
					fullname: '',
					shopname: '',
					hasLogin: false
				}
				service.setUser(datas);
				uni.reLaunch({
					url: '../index/ning',
				});
			}
		}
	}
</script>

<style>

</style>
