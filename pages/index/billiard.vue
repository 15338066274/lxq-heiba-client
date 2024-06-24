<template>
	<view class="box-container">
		<view class="status_bar"></view>
		<view class="back-box">
			<u-navbar
				:is-fixed="isFixed"
				leftIconColor="#fff"
				bgColor="transparent"
				:border-bottom="false"
				@leftClick="leftClick">
			</u-navbar>
		</view>
		<view class="detail-content" :style="{ marginTop: navTop + 'rpx' }">
			<view class="detail-info">
				<view class="info-left">
					<view class="title">hello 球友1288</view>
					<view class="phone">18565091288</view>
				</view>
				<view class="info-tel">
					<u--image :src="telImg" width="48rpx" height="48rpx"></u--image>
					<span>联系店长</span>
				</view>
			</view>
			<view class="detail-intro">
				<view class="intro-title">龙小球-孝感学院店</view>
				<view class="intro-billard">孝感学院店-1号球桌</view>
				<view class="intro-btns">
					<view class="sd-btn">
						<view class="sd-price">￥22.96<span>/小时</span></view>
						<view class="sd-yh">押金：100</view>
					</view>
					<view class="yh-txt">优惠时段<u-icon name="arrow-right" color="#fff"></u-icon></view>
				</view>
			</view>
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
			<view class="ball-table">
				<view class="ball-table-top">
					<u--image :src="ballImg" width="44rpx" height="44rpx"></u--image>
					<text>开台</text>
				</view>
				<view class="ball-table-content">
					<view class="row">
						<view class="item-ball" v-for="(item, index) in ballTabList" :key="index">
							<view class="item-top">
								<text>{{item.name}}</text>
								<u-icon name="arrow-right"></u-icon>
							</view>
							<view class="item-con">
								<view class="con-text">{{item.desc}}</view>
								<view class="con-img">
									<u--image :src="item.imgUrl" width="101rpx" height="101rpx"></u--image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="activity-box">
				<view class="ball-table-top">
					<u--image :src="activityImg" width="40rpx" height="42rpx"></u--image>
					<text>球房活动</text>
				</view>
				<view class="activity-content">
					<view class="activity-content-top">分享<span>10元</span>给到你的好友</view>
					<view class="activity-list">
						<view class="list-two">
							<view class="two-item">
								<view class="item-me">奖励好友赠额</view>
								<view class="item-num">领取数达到：<span>0/1</span>人</view>
							</view>
							<view class="two-item">
								<view class="item-me">奖励自己赠额</view>
								<view class="item-num">消费数达到：<span>0/100</span>元</view>
							</view>
						</view>
						<view class="list-one">
							<view class="two-item">
								<view class="item-me">奖励自己赠额</view>
								<view class="item-num">好友成功消费：<span>0/1</span>元</view>
							</view>
						</view>
					</view>
					<view class="activity-txt">活动到期：2026-06-01 00:00</view>
					<view class="activity-share">
						<u-button text="分享" color="#FD9033"></u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import storage from "@/utils/storage"
import {
	mapState,
	mapMutations
} from 'vuex';
export default {
	data() {
		return {
			telImg: require("@/static/icon_tel.png"),
			czBtn: require("@/static/icon_cz.png"),
			ballImg: require("@/static/icon_tq.png"),
			activityImg: require("@/static/icon_qq.png"),
			navTop: 0,
			ballTabList: [{
				name: '会员开台',
				desc: '会员余额≥押金, 直接开台。',
				imgUrl: require("@/static/icon_kt1.png")
			},{
				name: '押金开台',
				desc: '押金100元，关灯结账后退回',
				imgUrl: require("@/static/icon_kt2.png")
			},{
				name: '定时开台',
				desc: '自选时长，无押金。',
				imgUrl: require("@/static/icon_kt3.png")
			},{
				name: '限时特惠',
				desc: '门店限时 促销优惠',
				imgUrl: require("@/static/icon_kt4.png")
			}]
		}
	},
	components:{},
	onShow() {
		this.setTabsPosition();
	},
	onLoad (options) {
		this.init()
	},
	methods: {
		setTabsPosition() {
			// 获取系统信息，计算胶囊按钮的位置
			uni.getSystemInfo({
				success: (res) => {
					const { statusBarHeight } = res;
					const capsuleButton = wx.getMenuButtonBoundingClientRect();
					const navTop = statusBarHeight + (capsuleButton.top - statusBarHeight) / 2;
					this.navTop = navTop + 44;
					console.log('navTop', this.navTop)
				}
			});
		},
		init() {
			
		},
		// 返回上一页
		leftClick() {
			uni.navigateBack({
				delta: 1
			})
		},
	}
}
</script>
<style lang="scss" scoped>
.box-container{
	background: var(--billiard-bg) no-repeat #BACAC6;
	background-size: contain;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
	position: relative;
	.back-box{
		width: 100%;
		display: flex;
		position: relative;
		flex-direction: column;
	}
	.detail-content{
		padding: 10px;
		display: flex;
		flex-direction: column;
		.detail-info{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.info-left{
				display: flex;
				flex-direction: column;
				.title{
					font-family: PingFangSC, PingFang SC;
					font-weight: 500;
					font-size: 16px;
					color: #000;
					line-height: 24px;
				}
				.phone{
					color: #333;
					font-size: 14px;
					line-height: 24px;
				}
			}
			.info-tel{
				font-size: 16px;
				color: #000;
				line-height: 24px;
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				span{
					padding-left: 5px;
				}
			}
		}
		.detail-intro{
			margin-top: 15px;
			background: var(--store-bg) no-repeat;
			background-size: contain;
			display: flex;
			flex-direction: column;
			width: calc(100% - 40rpx);
			height: calc(302rpx - 40rpx);
			padding: 20rpx;
			.intro-title{
				color: #fff;
				font-size: 12px;
				line-height: 24px;
			}
			.intro-billard{
				padding-top: 10rpx;
				color: #fff;
				font-size: 20px;
				font-weight: bold;
				line-height: 24px;
			}
			.intro-btns{
				display: flex;
				flex-wrap: nowrap;
				margin-top: 10px;
				align-items: center;
				.sd-btn{
					padding: 5px 10px;
					background: rgba(255,255,255,0.9);
					border-radius: 10px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.sd-price{
						color: #FA5151;
						font-size: 20px;
						span{
							font-size: 14px;
						}
					}
					.sd-yh{
						color: #FA5151;
						font-size: 14px;
					}
				}
				.yh-txt{
					color: #fff;
					font-size: 14px;
					padding: 0 10px;
					display: flex;
					flex-wrap: nowrap;
				}
			}
		}
		.recharge-box{
			width: 100%;
			margin-top: 30rpx;
			background: var(--yue-bg) no-repeat;
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
			.ball-table-content{
				display: flex;
				flex-direction: column;
				margin-top: 16px;
				.row{
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 10px;
					margin-bottom: 16px;
					.item-ball{
						display: flex;
						flex-direction: column;
						background: rgba(255,255,255,0.8);
						border-radius: 15px;
						border: 1rpx solid #FFFFFF;
						padding: 10px;
						min-height: 100px;
						.item-top{
							display: flex;
							justify-content: space-between;
							padding-bottom: 20rpx;
							text{
								color: #000;
								font-size: 16px;
								font-weight: bold;
							}
						}
						.item-con{
							display: flex;
							justify-content: space-between;
							.con-text{
								font-size: 14px;
								color: #666;
								line-height: 24px;
							}
						}
					}
				}
			}
		}
		.activity-box{
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
			.activity-content{
				margin-top: 16px;
				display: flex;
				flex-direction: column;
				background: rgba(255,255,255,0.8);
				border-radius: 15px;
				border: 1rpx solid #FFFFFF;
				display: flex;
				flex-direction: column;
				padding: 0 10px 10px;
				.activity-content-top{
					width: 100%;
					display: flex;
					height: 66rpx;
					justify-content: center;
					background: url(@/static/share-top.png) no-repeat center;
					background-size: contain;
					align-items: center;
					color: #333;
					font-size: 14px;
					span{
						color: #fc953e;
					}
				}
				.activity-list{
					width: 100%;
					display: flex;
					flex-direction: column;
					padding: 20px 0;
					.list-two{
						display: flex;
						justify-content: space-between;
					}
					.list-one{
						display: flex;
						justify-content: center;
					}
					.two-item{
						width: 50%;
						display: flex;
						height: 222rpx;
						justify-content: center;
						background: url(@/static/kk.png) no-repeat center;
						background-size: contain;
						display: flex;
						flex-direction: column;
						.item-me{
							padding-top: 30px;
							font-size: 12px;
							display: flex;
							color: #7D4E1E;
							justify-content: center;
						}
						.item-num{
							padding-top: 8rpx;
							font-size: 10px;
							display: flex;
							justify-content: center;
							color: #fff;
							span{
								color: #FD9033;
							}
						}
					}
				}
				.activity-txt{
					color: #666;
					font-size: 14px;
					line-height: 24px;
					width: 100%;
					display: flex;
					justify-content: flex-start;
					margin-top: 16px;
				}
				.activity-share{
					width: 100%;
					display: flex;
					justify-content: center;
					margin-top: 16px;
				}
			}
		}
	}
}
</style>
