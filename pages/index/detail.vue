<template>
	<view class="box-container">
		<!-- <view class="status_bar"></view> -->
		<view class="img-box">
			<u-navbar
				:is-fixed="isFixed"
				leftIconColor="#fff"
				bgColor="transparent"
				:border-bottom="false"
				@leftClick="leftClick">
			</u-navbar>
		</view>
		<view class="detail-content">
			<view class="recharge-box">
				<view class="recharge-con">
					<view class="balance-item">
						<view class="item-price">
							<span>余额：￥</span>
							<text>0.00</text>
						</view>
						<view class="item-btn">
							<u--image :src="czBtn" width="216rpx" height="68rpx"></u--image>
						</view>
					</view>
					<view class="discounts-item">
						<text>充100 送20</text>
					</view>
				</view>
			</view>
			<view class="address-box">
				<view class="address-text">
					<view class="d-title">
						<h1>龙小球-孝感学院店</h1>
						<u-icon name="star"></u-icon>
					</view>
					<u--image :src="dayImg" width="140rpx" height="38rpx"></u--image>
				</view>
				<view class="address-map">
					<u-icon name="map"></u-icon>
					<text>湖北省孝感市孝南区分丝南路133号</text>
				</view>
			</view>
			<view class="ball-table">
				<view class="ball-table-top">
					<u--image :src="ballImg" width="48rpx" height="32rpx"></u--image>
					<text>球桌</text>
				</view>
				<view class="ball-table-list">
					<view class="row">
						<view class="item-ball" v-for="(item, index) in ballList" :key="index">
							<view class="ball-bg" :class="{
								'bg1': item.status === 1,
								'bg2': item.status === 2,
								'bg3': item.status === 3
							}">
								<view class="ball-num">{{ item.serialNumber }}号桌球</view>
								<view class="ball-btn">{{handleStatusDict(item.status)}}</view>
								<u-count-down
									v-if="item.status === 1"
									:time="item.residueDuration*1000*60"
									format="HH:mm:ss"
									autoStart
									millisecond
								>
								</u-count-down>
							</view>
							<view class="ball-price">￥<span>{{ item.fee }}</span>/小时</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer-box">
			<view class="footer-btn">
				<view class="map-box" @click.stop="handleNavigation">导航</view>
				<view class="phone-box" @click="callTel">电话联系</view>
			</view>
		</view>
	</view>
</template>
<script>
import { ballStatusOption } from '@/utils/dicts'
import storage from "@/utils/storage";
import { updateReadCounts } from "@/api/index";
import {
	mapState,
	mapMutations
} from 'vuex';
export default {
	data() {
		return {
			czBtn: require("@/static/icon_cz.png"),
			dayImg: require("@/static/24.png"),
			ballImg: require("@/static/icon-qz.png"),
			detailId: '',
			detailData: {},
			ballStatusOption,
			// 目标纬度
			latitude: '28.228700',
			// 目标经度
			longitude: '112.939000',
			name: '东方美地',
			ballList: [{
				billiardTableId: 1,
				serialNumber: 1,
				status: 1,
				fee: 22,
				cashPledge: 20,
				residueDuration: 45
			},
			{
				billiardTableId: 2,
				serialNumber: 2,
				status: 2,
				fee: 22,
				cashPledge: 20
			},
			{
				billiardTableId: 3,
				serialNumber: 3,
				status: 3,
				fee: 22,
				cashPledge: 20
			}]
		}
	},
	components:{},
	onLoad (options) {
		this.detailId = options.id;
		this.init()
	},
	methods: {
		init() {
			
		},
		handleStatusDict(val) {
			var _val = Number(val)
			return this.ballStatusOption.find(v => Number(v.value) === _val)?.label
		},
		// 返回上一页
		leftClick() {
			uni.navigateBack({
				delta: 1
			})
		},
		handleNavigation () {
			const _this = this
		if (!this.latitude || !this.longitude || !this.name) return
		// 微信
		// #ifdef MP-WEIXIN
		let _obj = {
				latitude: parseFloat(this.latitude),
				longitude: parseFloat(this.longitude),
				name: this.name,
		}
		if (this.address) {
				_obj['address'] = this.address
		}
		uni.openLocation({
				..._obj,
				success: function (res) {
				console.log('打开系统位置地图成功')
				},
				fail: function (error) {
				console.log(error)
				}
		})
		// #endif
		},
		callTel(){
		  this.$tools.callPhone(this.tel)
		}
	}
}
</script>
<style lang="scss" scoped>
.box-container{
	background: url(@/static/detailbg.png) no-repeat #BACAC6;
	background-size: contain;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
	.img-box{
		width: 100%;
		display: flex;
		position: relative;
		flex-direction: column;
		z-index: 99;
		.tel-box{
			position: absolute;
			bottom: 40px;
			left: 90px;
			z-index: 98;
			.item-tel{
				color: #000;
				line-height: 24px;
				padding-bottom: 10px;
			}
			.item-tel2{
				color: #000;
				line-height: 24px;
			}
		}
		.imgs{
			z-index: 80;
		}
	}
	.detail-content{
		padding: 10px 10px 80px 10px;
		display: flex;
		flex-direction: column;
		.recharge-box{
			width: 100%;
			margin-top: 500rpx;
			background: url(@/static/yue_bg.png) no-repeat;
			background-size: contain;
			min-height: 216rpx;
			.recharge-con{
				padding: 10px 16px;
				display: flex;
				flex-direction: column;
				.balance-item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.item-price{
						color: #000;
						font-size: 14px;
						text{
							font-size: 32px;
						}
					}
				}
				.discounts-item{
					background: rgba(255, 255, 255, .7);
					border-radius: 10px;
					color: #973E00;
					padding: 5px 20px;
				}
			}
		}
		.address-box{
			margin-top: 16px;
			background: rgba(255,255,255,0.8);
			border-radius: 15px;
			border: 1rpx solid #FFFFFF;
			padding: 16px;
			display: flex;
			flex-direction: column;
			.address-text{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.d-title{
					display: flex;
					flex-wrap: nowrap;
					h1{
						font-size: 18px;
						color: #000;
						font-weight: normal;
						line-height: 24px;
						margin-right: 10px;
					}
				}
			}
			.address-map{
				display: flex;
				flex-wrap: nowrap;
				padding-top: 10px;
				text{
					font-size: 14px;
					color: #333;
					line-height: 24px;
				}
			}
		}
		.ball-table{
			width: 100%;
			margin-top: 16px;
			.ball-table-top{
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				text{
					padding-left: 10rpx;
					color: #000;
					font-size: 16px;
					font-weight: bold;
					line-height: 24px;
				}
			}
			.ball-table-list{
				background: rgba(255,255,255,0.8);
				border-radius: 15px;
				border: 1rpx solid #FFFFFF;
				padding: 15px;
				margin-top: 10px;
				display: flex;
				flex-direction: column;
				.row{
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 10px;
					margin-bottom: 16px;
					.item-ball{
						display: flex;
						flex-direction: column;
						.ball-bg{
							width: 100%;
							min-height: 160rpx;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
						}
						.bg1{
							background: url(@/static/item_.png) no-repeat;
							background-size: cover;
							color: #04A77A;
							.ball-num{
								font-family: PingFangSC, PingFang SC;
								font-weight: 600;
								font-size: 13px;
								color: #04A77A;
								line-height: 24px;
							}
							.ball-btn{
								font-size: 12px;
								color: #04A77A;
								display: flex;
								align-items: center;
								justify-content: center;
							}
							::v-deep .u-count-down__text{
								color: #22EDB5;
							}
						}
						.bg2{
							background: url(@/static/item_.png) no-repeat;
							background-size: cover;
							.ball-num{
								font-family: PingFangSC, PingFang SC;
								font-weight: 600;
								font-size: 13px;
								color: #04A77A;
								line-height: 24px;
							}
							.ball-btn{
								font-size: 12px;
								color: #04A77A;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.bg3{
							background: url(@/static/item.png) no-repeat;
							background-size: cover;
							.ball-num{
								font-family: PingFangSC, PingFang SC;
								font-weight: 600;
								font-size: 13px;
								color: #FFFFFF;
								line-height: 24px;
							}
							.ball-btn{
								background: #FFFFFF;
								border-radius: 10px;
								width: 60px;
								height: 20px;
								font-size: 12px;
								color: #04A77A;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						.ball-price{
							padding-top: 10px;
							font-family: PingFangSC, PingFang SC;
							font-weight: 600;
							font-size: 16px;
							color: #FA5151;
							line-height: 26px;
							span{
								font-size: 20px;
							}
						}
					}
				}
			}
		}
	}
	
	.footer-box{
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
		display: flex;
		justify-content: center;
		.footer-btn{
			width: 100%;
			display: flex;
			justify-content: center;
			flex-wrap: nowrap;
			padding: 10px;
			.map-box{
				background: #e5f6f1;
				color: #04A77A;
				width: 40%;
				padding: 10px;
				border-radius: 5px;
				display: flex;
				justify-content: center;
			}
			.phone-box{
				background: #04A77A;
				color: #fff;
				margin-left: 10px;
				width: 40%;
				padding: 10px;
				border-radius: 5px;
				display: flex;
				justify-content: center;
			}
		}
	}
}
</style>
