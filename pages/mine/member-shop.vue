<template>
	<view class="info-wrap">
		<view class="bill-list">
			<view class="bill-item" v-for="(item, index) in billData" :key="index">
				<view class="bill-item-between">
					<view class="bill-item-img">
						<u--image :src="iconUrl" width="200rpx" height="258rpx"></u--image>
					</view>
					<view class="bill-item-con">
						<view class="list-item" v-for="(item2, index2) in item.list" :key="index2">
							<view class="item-title">
								<text>{{item2.name}}</text>
							</view>
							<view class="item-tags">
								<view class="tag">
									<u-tag :text="'闲桌' + item2.leisureTableNum + '台'" size="mini" bgColor="#04A77A" borderColor="#04A77A"></u-tag>
								</view>
								<view class="item-dz">
									<text>距您{{item2.distance}}KM</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bill-balance">
					<view class="balance">余额：<span>0</span></view>
					<view class="recharge">
						<view class="recharge-btn">
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
	</view>
</template>

<script>
import storage from "@/utils/storage";
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			billData: [{
				"billiardParlorId": '1',
				"list": [{
					"name": '龙小球-孝感学院店',
					"distance":5.1,
					"leisureTableNum": 4
				},{
					"name": '龙小球-孝感学院店2',
					"distance":5.2,
					"leisureTableNum": 4
				},{
					"name": '龙小球-孝感学院店3',
					"distance":5.3,
					"leisureTableNum": 4
				}]
			},
			{
				"billiardParlorId": '1',
				"list": [{
					"name": '龙小球-孝感学',
					"distance":4.5,
					"leisureTableNum": 4
				},{
					"name": '龙小球-孝感店',
					"distance":5.2,
					"leisureTableNum": 4
				}]
			}],
			iconUrl: require("@/static/yyz.png")
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
					.list-item{
						display: flex;
						flex-direction: column;
						margin-bottom: 10rpx;
						border-bottom: 1rpx solid #ddd;
						padding-bottom: 10rpx;
						&:last-child{
							margin-bottom: 0;
							padding-bottom: 0;
							border-bottom: none;
						}
						.item-title{
							display: flex;
							flex-wrap: nowrap;
							text{
								font-weight: bold;
								color: #000;
								margin-right: 10rpx;
								font-size: 13px;
							}
						}
						.item-tags{
							display: flex;
							justify-content: space-between;
							align-items: center;
							width: 100%;
							.item-dz{
								display: flex;
								flex-wrap: nowrap;
								color: rgba(0,0,0,0.9);
								font-size: 12px;
								margin-top: auto;
							}
						}
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