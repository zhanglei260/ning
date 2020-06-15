<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" url="../index/index?PageCur=my" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的预约</block>
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

		</form>
		<view class="cu-card article" v-for="(item,index) in listbook">
			<view class="cu-item shadow">
				<view class="title">
					<view class="text-cut">
						<view class="fl">{{item.fullname}}</view>
						<view class="fr">{{item.book_time}} </view>
					</view>
				</view>
				<view class="content">
					<view class="text-content">
						<view>手机号码:{{item.mobile}}</view>
						<view>预约内容:{{item.book_content}}</view>
						<view>预计时长:{{item.book_hour_long}} 小时</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				fullname: '',
				time: '12:00',
				date: '2020-06-13',
				listbook: [],
				mobile: ''
			};
		},
		onLoad: function(option) {
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
					url: service.getAjaxUrl + 'NingBookList',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						username: validUser.username,
						fullname: this.fullname,
						mobile: this.mobile,
						book_date: this.date,
						book_time: this.time
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							//遍历结果
							if (e.data.data.length > 0) {
								this.listbook = [];
								for (var i = 0; i < e.data.data.length; i++) {
									var tempdata = {};
									tempdata["mobile"] = e.data.data[i].mobile;
									tempdata["fullname"] = e.data.data[i].fullname;
									tempdata["book_time"] = e.data.data[i].book_time;
									tempdata["book_content"] = e.data.data[i].book_content;
									tempdata["book_hour_long"] = e.data.data[i].book_hour_long;

									this.listbook.push(tempdata);
								}

							}
						} else {
							this.listbook = [];
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
			}
		}
	}
</script>

<style>

</style>
