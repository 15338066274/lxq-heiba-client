<template>
	<view class="info-wrap">
		<view class="bill-list">
			<view class="bill-item" v-for="(item, index) in billData" :key="index">
				<view class="bill-item-img">
					<u--image :src="statusIconDict[item.status]" width="200rpx" height="258rpx"></u--image>
				</view>
				<view class="bill-item-con">
					<view class="item-title">
						<text>{{item.name}}</text>
						<view class="item-tag">
							<u-tag :text="handleStatusDict(item.status)" plain :color="handleStatusColorDict(item.status)" :borderColor="handleStatusColorDict(item.status)" size="mini"></u-tag>
						</view>
						<view>
							<u-tag :text="'闲桌' + item.leisureTableNum + '台'" size="mini" :bgColor="item.status === 3 ? '#cccfcf' : '#04A77A'" :borderColor="item.status === 3 ? '#cccfcf' : '#04A77A'"></u-tag>
						</view>
					</view>
					<view class="item-address">{{item.address}}</view>
					<view class="item-dz">
						<u-icon name="map" color="#333" size="14"></u-icon>
						<text>{{item.distance}}</text>
					</view>
					<view class="item-price">
						<view class="price">￥{{item.lowestFee}}<text>/小时</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import storage from "@/utils/storage";
import { mapState, mapMutations } from 'vuex';
import { billStatusOption } from '@/utils/dicts'
export default {
	data() {
		return {
			billData: [{
				"billiardParlorId": '1',
				"name": '龙小球-孝感学院店',
				"address":"湖北省孝感市孝南区分丝南路133号",
				"status":1,
				"leisureTableNum":5,
				"lowestFee":22.96,
				"isMultipleShop":1,
				"locationLng": "320.76",
				"locationLat": "775.26",
				"isShareActivity":1,
				"distance": 900,
				"beginTableWay":"1,2,3,4"
			},{
				"billiardParlorId": '1',
				"name": '龙小球-孝感学院店',
				"address":"湖北省孝感市孝南区分丝南路135号",
				"status":2,
				"leisureTableNum":5,
				"lowestFee":22.96,
				"isMultipleShop":1,
				"locationLng": "320.76",
				"locationLat": "775.26",
				"isShareActivity":1,
				"distance": 1300,
				"beginTableWay":"1,2,3,4"
			},{
				"billiardParlorId": '1',
				"name": '龙小球-孝感学院店',
				"address":"湖北省孝感市孝南区分丝南路135号",
				"status":3,
				"leisureTableNum":0,
				"lowestFee":22.96,
				"isMultipleShop":1,
				"locationLng": "320.76",
				"locationLat": "775.26",
				"isShareActivity":1,
				"distance": 1800,
				"beginTableWay":"1,2,3,4"
			}],
			statusIconDict:{
				1: require("@/static/yyz.png"),
				2: require("@/static/zxz.png"),
				3: require("@/static/syy.png")
			},
			billStatusOption
		};
	},
	components:{},
	onLoad() {
		this.initData();
	},
	onShow() {
		this.initData();
	},
	methods: {
		// 初始化数据
		initData() {},
		handleStatusDict(val) {
			var _val = Number(val)
			return this.billStatusOption.find(v => Number(v.value) === _val)?.label
		},
		handleStatusColorDict(val) {
			var _val = Number(val)
			return this.billStatusOption.find(v => Number(v.value) === _val)?.color
		}
	}
};
</script>

<style lang="scss" scoped>
.info-wrap{
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	background: #BACAC6;
	.bill-list {
		width: calc(100% - 40rpx);
		display: flex;
		flex-direction: column;
		padding: 32rpx 20rpx;
		.bill-item{
			width: calc(100% -  40rpx);
			background: rgba(255,255,255,0.8);
			border-radius: 30rpx;
			border: 1rpx solid #FFFFFF;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
			margin-bottom: 30rpx;
			.bill-item-img{
				width: 200rpx;
			}
			.bill-item-con{
				flex: 1;
				padding-left: 10px;
				display: flex;
				flex-direction: column;
				.item-title{
					display: flex;
					flex-wrap: nowrap;
					margin-bottom: 10px;
					text{
						font-weight: bold;
						color: #000;
						margin-right: 10rpx;
						font-size: 13px;
					}
					.item-tag{
						display: flex;
						margin-right: 10rpx;
					}
				}
				.item-address{
					color: rgba(0,0,0,0.9);
					margin-bottom: 15rpx;
				}
				.item-dz{
					display: flex;
					flex-wrap: nowrap;
					color: rgba(0,0,0,0.9);
					margin-bottom: 15rpx;
					text{
						padding-left: 10rpx;
					}
				}
				.item-price{
					display: flex;
					flex-wrap: nowrap;
					.price{
						color: #FA5151;
						font-family: PingFangSC, PingFang SC;
						font-weight: 600;
						font-size: 38rpx;
						text{
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}
}
</style>