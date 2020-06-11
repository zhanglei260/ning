<template>
	<view class="box">
		<cu-custom bgColor="bg-gradual-blue" style="height: 30rpx;" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的</block>
		</cu-custom>
		<view class="cu-list menu-avatar">
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

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 基本信息
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-shop text-green"></text>
					<text class="text-grey">所属门诊  中岳口腔{{shopname}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-yellow"></text>
					<text class="text-grey">到期时间  2020-06-11 13:14:15{{expire_time}}</text>
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
					<text class="text-grey">系统版本 V1.0.521</text>
				</view>
			</view>
			<view class="cu-item">
				<button class="cu-btn content" open-type="contact">
					<text class="text-black" style="text-align: center;width: 100%;">退出登录</text>
				</button>
			</view>
			<view class="cu-item">
				<button class="cu-btn content" open-type="contact">
					<text class="text-black" style="text-align: center;width: 100%;">登录</text>
				</button>
			</view>
		</view>




		<view v-if="valid()">
			<label>基本信息:</label>
		</view>
		<view v-if="valid()" class="input-group">
			<view class="input-row border">
				<text class="titleleft">用户姓名:</text>
				<text class="">{{fullname}}</text>
			</view>
			<view class="input-row border">
				<text class="titleleft">所属门店:</text>
				<text class="">{{shopname}}</text>
			</view>
			<view class="input-row border">
				<text class="titleleft">登录账号:</text>
				<text class="">{{account}}</text>
			</view>
			<view class="input-row border">
				<text class="titleleft">客服微信:</text>
				<text class="">jllbs168</text>
			</view>
			<view class="input-row border">
				<text class="titleleft">到期时间:</text>
				<text class="">{{expire_time}}</text>
			</view>
			<view class="input-row border">
				<text class="titleleft">系统版本:</text>
				<text class="">V1.0.521</text>
			</view>
		</view>
		<view class="btn-row">
			<button v-if="valid()" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="valid()" type="default" @tap="bindLogout">退出登录</button>
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
					url: '../login/login',
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
				service.addUser(datas);
				uni.reLaunch({
					url: '../login/login',
				});
			}
		}
	}
</script>

<style>

</style>
