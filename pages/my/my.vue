<template>
	<view>
		<br />
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">我的</block>
		</cu-custom>
		<view v-if="valid()" class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg" :style="{backgroundImage: 'url('+head_url+')'}" @tap="changeHeadUrl"></view>
				<view class="content">
					<view class="text-black">{{fullname}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							账号:{{username}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="valid()" class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 基本信息
			</view>
		</view>
		<view v-if="valid()" class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-shop text-green"></text>
					<text class="text-grey padding-right">所属门诊</text>
					<text class="text-grey text-bold">{{shopname}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-yellow"></text>
					<text class="text-grey padding-right">到期时间</text>
					<text class="text-grey text-bold">{{expire_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<navigator class="content" hover-class="none" url="../book/booklist" open-type="redirect">
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
					<text class="text-grey text-bold">V1.2.2</text>
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
					this.username = validUser.username;
					this.shopname = validUser.shopname;
					this.fullname = validUser.fullname;
					this.password = validUser.password;
					this.expire_time = validUser.expire_time;
					this.head_url = validUser.head_url;
					this.hasLogin = validUser.hasLogin;
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
				username: '',
				shopname: '',
				fullname: '',
				password: '',
				expire_time: '',
				head_url: '',
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
					username: '',
					shopname: '',
					fullname: '',
					password: '',
					expire_time: '',
					head_url: '',
					hasLogin: false
				}
				service.setUser(datas);
				uni.navigateTo({
					url: '../index/index?PageCur=my',
				});
			},
			changeHeadUrl(){
				//获取当前登录的用户
				const validUser = service.getUsers();
				if (validUser.username == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请先登录后再查询'
					});
					return;
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，'original', 'compressed'
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: service.getAjaxUrl + 'NingChangeHeadFileUpload',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'username': validUser.username
							},
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data);
								if (data.code == 0) {
									validUser.head_url = data.data;
									service.setUser(validUser);
									this.valid();
								} else {
									uni.showToast({
										icon: 'none',
										title: '上传失败:' + data.msg
									});
								}
							}
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
