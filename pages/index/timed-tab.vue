<template>
	<view class="box_container">
		<view class="detail-content">
			<view class="detail-intro">
				<view class="intro-title">{{billiardTableObj.name}}</view>
				<view class="intro-billard">{{billiardTableObj.shortName}}</view>
				<view class="intro-btns">
					<view class="sd-btn">
						<view class="sd-price">￥{{billiardTableObj.fee}}<span>/小时</span></view>
					</view>
				</view>
			</view>
			<view class="ball-table">
				<view class="table-list">
				    <view class="row">
							<view class="item-layout" v-for="(item, index) in tableData" :key="index">
							    <view class="hour">{{item.hours}}</view>
							    <span>小时开台</span>
							</view>
						</view>
				</view>
				<view class="ball-table-tips">
					<h1>温馨提示：</h1>
					<span>定时开台为预付费，提前结束不退费</span>
				</view>
			</view>
		</view>
		<view class="footer-button">
			<view class="custom-button">
				<view class="left-section">
					<text>合计: ¥0</text>
					<text class="sub-text">需支付</text>
				</view>
				<view class="right-section">
					立即支付
				</view>
			</view>
		</view>		
	</view>
</template>
<script>
import { getBilliardTableInfo } from "@/api/index";
import storage from "@/utils/storage"
import {
	mapState,
	mapMutations
} from 'vuex';
export default {
	data() {
		return {
			detailObj: {},
			billiardTableObj: {
				"billiardTableId": 14,
				"cashPledge": 120,
				"fee": 30,
				"name": "龙小球-孝感民邦一期店",
				"shortName": "民邦一期店-4号球桌"
			},
			tableData: [
				{
					"hours": 1,
					"serialNumber": 1,
					"money": 25,
					"configId": 131
				},
				{
					"hours": 2,
					"serialNumber": 2,
					"money": 50,
					"configId": 132
				},
				{
					"hours": 3,
					"serialNumber": 3,
					"money": 75,
					"configId": 133
				},
				{
					"hours": 4,
					"serialNumber": 4,
					"money": 100,
					"configId": 134
				},
				{
					"hours": 5,
					"serialNumber": 5,
					"money": 125,
					"configId": 135
				},
				{
					"hours": 6,
					"serialNumber": 6,
					"money": 150,
					"configId": 136
				},
				{
					"hours": 7,
					"serialNumber": 7,
					"money": 175,
					"configId": 137
				},
				{
					"hours": 8,
					"serialNumber": 8,
					"money": 200,
					"configId": 138
				},
				{
					"hours": 9,
					"serialNumber": 9,
					"money": 225,
					"configId": 139
				},
				{
					"hours": 10,
					"serialNumber": 10,
					"money": 250,
					"configId": 140
				}
			]
		}
	},
	components:{},
	onLoad (options) {
		this.detailObj = options;
		this.init()
	},
	methods: {
		init() {
			
		},
		// 2.10开台详情-根据球桌id获取球桌信息
		getBilliardTableInfoFn() {
			let params = {
				billiardTableId: this.detailObj.billiardTableId
			}
			getBilliardTableInfo(params).then(res => {
				this.billiardTableObj = res.data.data
			})
		},
	}
}
</script>
<style lang="scss" scoped>
@import './time.scss';
</style>
