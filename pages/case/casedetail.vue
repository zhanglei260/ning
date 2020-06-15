<template>
	<view style="margin-bottom: 100upx;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">病例详情</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">客户姓名:</view>
				<text>{{fullname}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码:</view>
				<text>{{mobile}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">客户年龄:</view>
				<text>{{age}}</text>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">患者主诉:</view>
				<text>{{chief_complaint}}</text>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>初诊病历
				</view>
			</view>
			<view class="flex margin-top-sm" v-for="(item,index) in listcase">
				<view class="flex-sub">
					<view class="grid text-center col-2">
						<view>
							<view class="padding bg-cyan text-black">
								<view v-if="'右上' == item.tooth_position">
									<input :value="item.tooth_index" disabled="disabled" type="number" maxlength="1"></input>
								</view>
								<view v-else>
									<input placeholder="右上" disabled="disabled" type="number" maxlength="1"></input>
								</view>
							</view>
							<view class="padding bg-olive text-black">
								<view v-if="'右下' == item.tooth_position">
									<input :value="item.tooth_index" disabled="disabled" type="number" maxlength="1"></input>
								</view>
								<view v-else>
									<input placeholder="右下" disabled="disabled" type="number" maxlength="1"></input>
								</view>
							</view>
						</view>
						<view>
							<view class="padding bg-olive">
								<view v-if="'左上' == item.tooth_position">
									<input :value="item.tooth_index" disabled="disabled" type="number" maxlength="1"></input>
								</view>
								<view v-else>
									<input placeholder="左上" disabled="disabled" type="number" maxlength="1"></input>
								</view>
							</view>
							<view class="padding bg-cyan">
								<view v-if="'左下' == item.tooth_position">
									<input :value="item.tooth_index" disabled="disabled" type="number" maxlength="1"></input>
								</view>
								<view v-else>
									<input placeholder="左下" disabled="disabled" type="number" maxlength="1"></input>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-twice">
					<view class="cu-form-group padding-xs">
						<textarea maxlength="-1" :value="item.tooth_diagnosis" disabled="disabled" placeholder="请输入初诊结果"></textarea>
					</view>
				</view>
			</view>

			<view class="cu-form-group margin-top-sm">
				<view class="title">
					<text>备注:</text>
				</view>
				<text>{{remark}}</text>
			</view>
		</form>

	</view>
</template>

<script>
		import service from '../../service.js';
	export default {
		data() {
			return {
				main_uuid: '',
				fullname: '',
				mobile: '',
				age: '',
				remark: '',
				chief_complaint: '',
				listcase: []
			}
		},
		onLoad: function(option) {
			this.main_uuid = option.main_uuid;
			this.bindSearch();
		},
		methods: {
			bindSearch() {
				const validUser = service.getUsers();
				if (validUser.username == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请先登录后再查看'
					});
					return;
				}
				uni.request({
					url: service.getAjaxUrl + 'NingCaseDetail',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						username: validUser.username,
						main_uuid: this.main_uuid
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							//遍历结果
							if (e.data.data.length > 0) {
								this.listcase = [];
								for (var i = 0; i < e.data.data.length; i++) {
									var tempdata = {};
									this.mobile = e.data.data[i].mobile;
									this.age = e.data.data[i].age;
									this.fullname = e.data.data[i].fullname;
									this.chief_complaint = e.data.data[i].chief_complaint;
									this.remark = e.data.data[i].remark;
									tempdata["create_time"] = e.data.data[i].create_time;
									tempdata["tooth_position"] = e.data.data[i].tooth_position;
									tempdata["tooth_index"] = e.data.data[i].tooth_index;
									tempdata["tooth_diagnosis"] = e.data.data[i].tooth_diagnosis;

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

			}
		}
	}
</script>

<style>

</style>
