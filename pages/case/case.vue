<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">录病例</block>
		</cu-custom>
		<form class="margin-bottom">
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

			<view class="cu-form-group margin-top">
				<view class="title">患者主诉:</view>
				<input placeholder="请输入患者主诉" v-model="chief_complaint" type="text"></input>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>初诊病历
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
						<textarea maxlength="-1" v-model="tooth_diagnosis" placeholder="请输入初诊结果"></textarea>
					</view>
				</view>
			</view>

			<view class="cu-form-group margin-top-sm">
				<view class="title">
					<button class="cu-btn bg-blue round" @tap="bindAddTooth">添加牙位</button>
				</view>
				<input placeholder="请输入备注" v-model="remark" type="text"></input>
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
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction margin-bottom">
				<button class="cu-btn bg-blue margin-tb-sm lg margin-bottom" @tap="bindSaveCase">保存病例</button>
			</view>
			<view class="text-center text-gray tabbar foot margin">-------已经到底了-------</view>
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
				remark: '',
				crm_user_uuid: '',
				left_top: '',
				right_top: '',
				left_bottom: '',
				right_bottom: '',
				tooth_position: '',
				tooth_index: '',
				tooth_diagnosis: '',
				tooth_list: [],
				imgList: [],
				imgUplodList: [],
				chief_complaint: ''
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
						title: '请输入初诊结果'
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
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const validUser = service.getUsers();
						uni.uploadFile({
							url: service.getAjaxUrl + 'NingChangeCaseFileUpload',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'username': validUser.username
							},
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data);
								if (data.code == 0) {
									this.imgList.push(tempFilePaths[0])
									this.imgUplodList.push(data.data);
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
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.imgUplodList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
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
				if (this.crm_user_uuid.length < 1 && (this.fullname.length < 1 || this.mobile.length != 11 || this.age.length < 1)) {
					uni.showToast({
						icon: 'none',
						title: '当前会员为空,无法录入'
					});
					return;
				}
				if (this.chief_complaint.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请输入患者主诉内容'
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
					url: service.getAjaxUrl + 'NingSaveCase',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						crm_user_uuid: this.crm_user_uuid,
						fullname: this.fullname,
						age: this.age,
						username: validUser.username,
						mobile: this.mobile,
						remark: this.remark,
						tooth_list: JSON.stringify(this.tooth_list),
						imgUplodList: JSON.stringify(this.imgUplodList),
						chief_complaint: this.chief_complaint
					},
					method: "POST",
					success: (e) => {
						if (e.data.code === 0) { //登录成功后改变vuex的状态，并退出登录页面  
							uni.showToast({
								icon: 'none',
								title: '保存成功,即将清空'
							});
							this.fullname = '';
							this.mobile = '';
							this.age = '';
							this.crm_user_uuid = '';
							this.left_top = '';
							this.right_top = '';
							this.left_bottom = '';
							this.right_bottom = '';
							this.tooth_position = '';
							this.tooth_index = '';
							this.tooth_diagnosis = '';
							this.tooth_list = [];
							this.imgList = [];
							this.imgUplodList = [];
							this.chief_complaint = '';
						} else {
							this.listcrmuser = [];
							uni.showToast({
								icon: 'none',
								title: '保存失败,' + e.data.msg
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
