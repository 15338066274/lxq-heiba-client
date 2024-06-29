<template>
	<view class="info-wrap">
		<view class="bill-list">
			<view class="bill-item" v-for="(item, index) in billData" :key="index">
				<view class="bill-item-between">
					<view class="bill-item-img">
						<u--image :src="imgUrl" width="200rpx" height="258rpx"></u--image>
					</view>
					<view class="bill-item-con">
						<view class="item-title">
							<text>{{item.name}}</text>
						</view>
						<view class="item-tags">
							<u-tag :text="'闲桌' + item.leisureTableNum + '台'" size="mini" :bgColor="item.status === 3 ? '#cccfcf' : '#04A77A'" :borderColor="item.status === 3 ? '#cccfcf' : '#04A77A'"></u-tag>
						</view>
						<view class="item-dz">
							<text>距您{{item.distance}}KM</text>
						</view>
					</view>
				</view>
				<view class="bill-balance">
					<view class="balance">余额：<span>{{item.shopBalance}}</span></view>
					<view class="recharge">
						<view class="recharge-btn" @click="handleRecharge(item)">
							<u-button text="充值" shape="circle" color="#04A77A" size="small"></u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer-balance">
			<view class="balance">总余额：</view>
			<view class="recharge">20</view>
		</view>
		<recharge-dialog ref="rechargeDialog" />
	</view>
</template>

<script>
import storage from "@/utils/storage";
import { mapState, mapMutations } from 'vuex';
import { billStatusOption } from '@/utils/dicts'
import { getMemberBalanceList } from "@/api/my";
export default {
	data() {
		return {
			billData: [{
				"billiardParlorId": 2,
				"name": "龙小球-孝感民邦一期店",
				"leisureTableNum": 5,
				"locationLng": "113.963491",
				"locationLat": "30.912329",
				"distance": 4.88,
				"shopBalance": 235
			}],
			imgUrl: require("@/static/yyz.png"),
			billStatusOption
		};
	},
	components:{},
	onLoad() {
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
		},
		getList() {
			this.loadingType = 'loading';
			let params = {
				memberId: '1',
				locationLng: this.locationLng,
				locationLat: this.locationLat
			}
			getMemberBalanceList(params).then(res => {
				
			})
		},
		handleRecharge(data) {
			const params = {
				billiardParlorId: data.billiardParlorId,
				type: 0
			}
			this.$refs['rechargeDialog'].show(params)
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
		padding: 32rpx 20rpx 100rpx;
		.bill-item{
			width: calc(100% -  40rpx);
			background: rgba(255,255,255,0.8);
			border-radius: 30rpx;
			border: 1rpx solid #FFFFFF;
			padding: 20rpx;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			margin-bottom: 30rpx;
			.bill-item-between{
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				.bill-item-img{
					width: 200rpx;
				}
				.bill-item-con{
					flex: 1;
					padding-left: 10px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
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
					}
					.item-tags{
						display: flex;
						margin-bottom: 15rpx;
					}
					.item-dz{
						display: flex;
						flex-wrap: nowrap;
						color: rgba(0,0,0,0.9);
						font-size: 13px;
						margin-top: auto;
					}
				}
			}
			.bill-balance{
				width: calc(100% - 40rpx);
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				padding: 20rpx;
				border-radius: 5px;
				position: relative;
				&::before {
				    content: '';
				    position: absolute;
				    top: 10%;
				    bottom: 10%;
				    left: 50%;
				    width: 1px;
				    background-color: #d3d3d3;
				    transform: translateX(-50%);
				}
				.balance{
					width: 50%;
					display: flex;
					justify-content: center;
					color: #000;
					align-items: center;
					font-size: 14px;
					span{
						color: #04A77A;
						font-size: 20px;
					}
				}
				.recharge{
					width: 50%;
					display: flex;
					justify-content: center;
					.recharge-btn{
						display: flex;
						justify-content: center;
					}
				}
			}
		}
	}
	.footer-balance{
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 20rpx;
		&::before {
		    content: '';
		    position: absolute;
		    top: 10%;
		    bottom: 10%;
		    left: 50%;
		    width: 1px;
		    background-color: #d3d3d3;
		    transform: translateX(-50%);
		}
		.balance{
			width: 50%;
			display: flex;
			justify-content: center;
			color: #000;
			align-items: center;
			font-size: 14px;
			span{
				
			}
		}
		.recharge{
			width: 50%;
			display: flex;
			justify-content: center;
			color: #04A77A;
			font-size: 20px;
		}
	}
}
</style>