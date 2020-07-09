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
		<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>复诊病历
				</view>
			</view>
			<view class="flex">
				<view class="flex-sub">
					<view class="grid text-center col-2">
						<view>
							<view class="padding bg-cyan text-black">
								<input placeholder="右上" v-model="right_top" type="number" maxlength="2"></input>
							</view>
							<view class="padding bg-olive text-black">
								<input placeholder="右下" v-model="right_bottom" type="number" maxlength="2"></input>
							</view>
						</view>
						<view>
							<view class="padding bg-olive">
								<input placeholder="左上" v-model="left_top" type="number" maxlength="2"></input>
							</view>
							<view class="padding bg-cyan">
								<input placeholder="左下" v-model="left_bottom" type="number" maxlength="2"></input>
							</view>
						</view>
					</view>
				</view>
				<view class="flex-twice">
					<view class="cu-form-group padding-xs">
						<textarea maxlength="-1" v-model="tooth_diagnosis" placeholder="请输入复诊结果"></textarea>
					</view>
				</view>
			</view>

			<view class="cu-form-group margin-top-sm">
				<view class="title">
					<button class="cu-btn bg-blue round" @tap="bindAddTooth">添加牙位</button>
				</view>
			</view>
			<view class="cu-form-group" v-for="(item,index) in tooth_list" @click="delindex" v-bind:id='index'>
				<view class="flex" style="width: 100%;">
					<view class="flex-sub text-center padding-sm solid-right">{{item.tooth_position}} {{item.tooth_index}}</view>
					<view class="flex-twice text-center padding-sm" style="width: 65%;">
						<view>
							<view class="text-cut">{{item.tooth_diagnosis}}</view>
						</view>
					</view>
					<button class="cu-btn cuIcon bg-red sm fr margin-sm">
						<text class="cuIcon-roundclose"></text>
					</button>
				</view>
			</view>
			
			<view class="cu-form-group margin-top-sm">
				<view class="title">
					<text>备注:</text>
				</view>
				<text>{{remark}}</text>
			</view>
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					病例图片
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
					</view>
			
				</view>
			</view>
		</form>
		<view class="padding flex flex-direction margin-bottom">
				<button class="cu-btn bg-blue margin-tb-sm lg margin-bottom" @tap="bindSaveCase">保存复诊</button>
			</view>
			<view class="text-center text-gray tabbar foot margin">-------已经到底了-------</view>
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
				imgList:[],
				left_top: '',
				right_top: '',
				left_bottom: '',
				right_bottom: '',
				tooth_position: '',
				tooth_index: '',
				tooth_diagnosis: '',
				tooth_list: [],
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
				uni.request({
					url: service.getAjaxUrl + 'NingCaseImage',
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
								this.imgList = [];
								for (var i = 0; i < e.data.data.length; i++) {
									this.imgList.push(e.data.data[i].img_url);
								}
				
							}
						} else {
							this.imgList = [];
							uni.showToast({
								icon: 'none',
								title: '获取病例图片失败,' + e.data.msg
							});
						}
					}
				});

			},
			bindAddTooth() {
				//添加牙位
				if (this.left_top.length < 1 && this.left_bottom.length < 1 && this.right_top.length < 1 && this.right_bottom.length <
					1) {
					uni.showToast({
						icon: 'none',
						title: '当前牙位为空,请输入牙位信息'
					});
					return;
				}
				if (this.tooth_diagnosis.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入复诊结果'
					});
					return;
				}
				if (this.left_top.length > 0) {
					this.tooth_position = '左上';
					this.tooth_index = this.left_top;
				}
				if (this.left_bottom.length > 0) {
					this.tooth_position = '左下';
					this.tooth_index = this.left_bottom;
				}
				if (this.right_top.length > 0) {
					this.tooth_position = '右上';
					this.tooth_index = this.right_top;
				}
				if (this.right_bottom.length > 0) {
					this.tooth_position = '右下';
					this.tooth_index = this.right_bottom;
				}
				const temp_tooth = {};
				temp_tooth["tooth_index"] = this.tooth_index;
				temp_tooth["tooth_position"] = this.tooth_position;
				temp_tooth["tooth_diagnosis"] = this.tooth_diagnosis;
				this.tooth_list.push(temp_tooth);
				//清空
				this.left_top = '';
				this.left_bottom = '';
				this.right_top = '';
				this.right_bottom = '';
				this.tooth_position = '';
				this.tooth_diagnosis = '';
			},
			delindex: function(e) {
				//找到删除的index
				const varcurrentid = e.currentTarget.id;
				//删除行
				this.tooth_list.splice(varcurrentid, 1);
			},
			bindSaveCase() {
				const validUser = service.getUsers();
				if (validUser.username == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请先登录后再保存'
					});
					return;
				}
				if (this.tooth_list.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请添加牙位信息'
					});
					return;
				}
				uni.request({
					url: service.getAjaxUrl + 'NingSaveCaseItem',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						main_uuid: this.main_uuid,
						username: validUser.username,
						tooth_list: JSON.stringify(this.tooth_list)
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							uni.showToast({
								icon: 'none',
								title: '保存成功,即将清空'
							});
							this.tooth_list=[];
							this.bindSearch();
						} else {
							uni.showToast({
								icon: 'none',
								title: '保存失败,' + e.data.msg
							});
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			}
		}
	}
</script>

<style>

</style>
