<template>
	<view>
		<case v-if="PageCur=='case'"></case>
		<book v-if="PageCur=='book'"></book>
		<addcase v-if="PageCur=='addcase'"></addcase>
		<crm v-if="PageCur=='crm'"></crm>
		<my v-if="PageCur=='my'"></my>
		<view class="cu-bar tabbar bg-black shadow foot">
			<view :class="PageCur=='case'?'action text-green':'action'" @click="NavChange" data-cur="case">
				<view class="cuIcon-camerafill"></view>病例
			</view>
			<view :class="PageCur=='book'?'action text-green':'action'" @click="NavChange" data-cur="book">
				<view class="cuIcon-timefill"></view>预约
			</view>
			<view :class="PageCur=='addcase'?'action  add-action text-green':'action  add-action'" @click="NavChange" data-cur="addcase">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				病例
			</view>
			<view :class="PageCur=='crm'?'action text-green':'action'" @click="NavChange" data-cur="crm">
				<view class="cuIcon-group_fill"></view>会员
			</view>
			<view :class="PageCur=='my'?'action text-green':'action'" @click="NavChange" data-cur="my">
				<view class="cuIcon-myfill"></view>我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'case'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
