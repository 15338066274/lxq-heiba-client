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
				<view class="ball-table-top">可使用</view>
				<view class="ball-table-content">
					<view class="coupon" v-for="(item, index) in tableData" :key="index">
						<view class="coupon-left">
							<view class="price">
								<text class="current-price">¥{{item.money}}</text>
								<text class="original-price">¥50</text>
							</view>
							<view class="details">
								<text>使用时间：{{item.hours}}小时</text>
							</view>
						</view>
						<button class="use-button">去使用</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { getBilliardTableInfo, getBilliardTableBeginConfigList } from "@/api/index";
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
					"hours": 2,
					"serialNumber": 1,
					"money": 45,
					"configId": 515
				},
				{
					"hours": 3,
					"serialNumber": 2,
					"money": 65,
					"configId": 516
				},
				{
					"hours": 4,
					"serialNumber": 3,
					"money": 85,
					"configId": 517
				},
				{
					"hours": 5,
					"serialNumber": 4,
					"money": 105,
					"configId": 518
				},
				{
					"hours": 6,
					"serialNumber": 5,
					"money": 120,
					"configId": 519
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
		getBilliardTableBeginConfigListFn() {
			let params = {
				billiardTableId: this.detailObj.billiardTableId,
				type: 4
			}
			getBilliardTableBeginConfigList(params).then(res => {
				this.billiardTableObj = res.data.data
			})
		},
	}
}
</script>
<style lang="scss" scoped>
@import './time.scss';
</style>
