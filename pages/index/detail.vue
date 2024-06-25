<template>
	<view class="box-container">
		<!-- <view class="status_bar"></view> -->
		<u-navbar
			:is-fixed="isFixed"
			leftIconColor="#fff"
			bgColor="transparent"
			:border-bottom="false"
			@leftClick="leftClick">
		</u-navbar>
		<view class="detail-header"></view>
		<view class="detail-content">
			<view v-if="Number(detailObj.isMultipleShop)" class="member-box">
				<view class="member-item">
					<view class="item-title">
						<text>本店会员</text>
						<u--image
							:src="arrow"
							width="28rpx"
							height="28rpx"
							shape="circle"
						></u--image>
					</view>
					<view class="item-price">￥<text>{{balanceObj.shopBalance}}</text></view>
					<view class="item-meal">充{{balanceObj.shopRechargeMoney}} 送{{balanceObj.shopGiveMoney}}</view>
				</view>
				<view class="member-item">
					<view class="item-title">
						<text>多店通用会员</text>
						<u--image
							:src="arrow"
							width="28rpx"
							height="28rpx"
							shape="circle"
						></u--image>
					</view>
					<view class="item-price">￥<text>{{balanceObj.multipleShopBalance}}</text></view>
					<view class="item-meal">充{{balanceObj.multipleShopRechargeMoney}} 送{{balanceObj.multipleShopGiveMoney}}</view>
				</view>
			</view>
			<view v-else class="recharge-box">
				<view class="recharge-con">
					<view class="balance-item">
						<view class="item-price">
							<span>余额：￥</span>
							<text>{{balanceObj.shopBalance}}</text>
						</view>
						<view class="item-btn" @click="handleRecharge">
							<u--image :src="czBtn" width="216rpx" height="68rpx"></u--image>
						</view>
					</view>
					<view class="discounts-item">
						<span>充{{balanceObj.shopRechargeMoney_1}} 送{{balanceObj.shopGiveMoney_1}}</span>
						<span style="padding-left: 100rpx;">充{{balanceObj.shopRechargeMoney_2}} 送{{balanceObj.shopGiveMoney_2}}</span>
					</view>
				</view>
			</view>
			<view class="address-box">
				<view class="address-text">
					<view class="d-title">
						<h1>{{detailData.name}}</h1>
						<u-icon :name="isFavorite ? 'star-fill' : 'star'" :color="isFavorite ? '#04A77A' : '#b3b3b3'" @click="handleFavorite"></u-icon>
					</view>
					<u--image :src="dayImg" width="140rpx" height="38rpx"></u--image>
				</view>
				<view class="address-map">
					<u-icon name="map"></u-icon>
					<text>{{detailData.address}}</text>
				</view>
			</view>
			<view class="ball-table">
				<view class="ball-table-top">
					<u--image :src="ballImg" width="48rpx" height="32rpx"></u--image>
					<text>球桌</text>
				</view>
				<view class="ball-table-list">
					<view class="row">
						<view class="item-ball" v-for="(item, index) in ballList" :key="index" @click="goBilliardPage(item)">
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
		<recharge-dialog ref="rechargeDialog" />
	</view>
</template>
<script>
import { ballStatusOption } from '@/utils/dicts'
import storage from "@/utils/storage";
import { getMemberBalance, getBilliardParlorInfo, getMemberIsFavorite, getMemberFavorite, getBilliardTableList } from "@/api/index";
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
			arrow: require("@/static/arrows.png"),
			detailObj: {},
			detailData: {
				"billiardParlorId": 2,
				"locationLat": "30.912329",
				"address": "湖北省孝感市孝南区董永路民邦槐荫东岸一期附属商业AA-116、117商铺",
				"name": "龙小球-孝感民邦一期店",
				"serviceHotline": "18674225550",
				"locationLng": "113.963491",
				"shopManagerMobile": "15323365456",
				"joiningHotline": "18674225558"
			},
			ballStatusOption,
			balanceObj: {
				shopBalance: 235,
				shopRechargeMoney_1: 100,
				shopGiveMoney_1: 40,
				shopRechargeMoney_2: 200,
				shopGiveMoney_2: 100,
			},
			ballList: [{
			"billiardTableId": 11,
			"serialNumber": 1,
			"status": 2,
			"residueDuration": null,
			"fee": 30,
			"cashPledge": 120
		},
		{
			"billiardTableId": 12,
			"serialNumber": 2,
			"status": 2,
			"residueDuration": null,
			"fee": 30,
			"cashPledge": 120
		},
		{
			"billiardTableId": 13,
			"serialNumber": 3,
			"status": 2,
			"residueDuration": null,
			"fee": 30,
			"cashPledge": 120
		},
		{
			"billiardTableId": 14,
			"serialNumber": 4,
			"status": 3,
			"residueDuration": null,
			"fee": 30,
			"cashPledge": 120
		},
		{
			"billiardTableId": 15,
			"serialNumber": 5,
			"status": 3,
			"residueDuration": null,
			"fee": 30,
			"cashPledge": 120
		},
		{
			"billiardTableId": 16,
			"serialNumber": 6,
			"status": 3,
			"residueDuration": null,
			"fee": 30,
			"cashPledge": 120
		},
		{
			"billiardTableId": 17,
			"serialNumber": 7,
			"status": 3,
			"residueDuration": null,
			"fee": 30,
			"cashPledge": 120
		},
		{
			"billiardTableId": 18,
			"serialNumber": 8,
			"status": 3,
			"residueDuration": null,
			"fee": 25,
			"cashPledge": 100
		},
		{
			"billiardTableId": 19,
			"serialNumber": 9,
			"status": 2,
			"residueDuration": null,
			"fee": 30,
			"cashPledge": 120
		},
		{
			"billiardTableId": 20,
			"serialNumber": 10,
			"status": 2,
			"residueDuration": null,
			"fee": 30,
			"cashPledge": 120
		}],
			isFavorite: 0 // 是否收藏(0:未收藏,1:已收藏)
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
		// 地图导航
		handleNavigation () {
			const _this = this
		if (!this.detailData.locationLat || !this.detailData.locationLng || !this.detailData.name) return
		// 微信
		// #ifdef MP-WEIXIN
		let _obj = {
				latitude: parseFloat(this.detailData.locationLat),
				longitude: parseFloat(this.detailData.locationLng),
				name: this.detailData.name,
		}
		if (this.address) {
				_obj['address'] = this.detailData.address
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
		// 打电话
		callTel(){
		  this.$tools.callPhone(this.detailData.shopManagerMobile)
		},
		// 跳转开台界面
		goBilliardPage(data) {			
			const params = {
				billiardTableId: data.billiardTableId,
				billiardParlorId: this.detailObj.billiardParlorId,
				isMultipleShop: this.detailObj.isMultipleShop,
				shopManagerMobile: this.detailData.shopManagerMobile
			};
			// 使用模板字符串构建URL
			const queryString = Object.keys(params)
			  .map(key => `${key}=${encodeURIComponent(params[key])}`)
			  .join('&');
			uni.navigateTo({
			  url: `/pages/index/billiard?${queryString}`
			});
		},
		// 获取会员余额
		getMemberBalanceFn() {
			let params = {
				memberId: '1',
				billiardParlorId: this.detailObj.billiardParlorId,
				isMultipleShop: this.detailObj.isMultipleShop
			}
			getMemberBalance(params).then(res => {
				this.balanceObj = res.data.data
			})
		},
		// 根据球房id获取球房信息
		getBilliardParlorInfoFn() {
			let params = {
				billiardParlorId: this.detailObj.billiardParlorId
			}
			getBilliardParlorInfo(params).then(res => {
				this.detailData = res.data.data
			})
		},
		// 是否收藏
		getMemberIsFavoriteFn() {
			let params = {
				memberId: '1',
				billiardParlorId: this.detailObj.billiardParlorId
			}
			getMemberIsFavorite(params).then(res => {
				this.isFavorite = res.data.isFavorite
			})
		},
		// 点击收藏
		handleFavorite() {
			let params = {
				memberId: '1',
				billiardParlorId: this.detailObj.billiardParlorId,
				operateType: this.isFavorite
			}
			getMemberFavorite(params).then(res => {
				this.isFavorite = res.data.isFavorite
			})
		},
		// 获取球桌列表
		getBilliardTableListFn() {
			let params = {
				billiardParlorId: this.detailObj.billiardParlorId
			}
			getBilliardTableList(params).then(res => {
				this.ballList = res.data.isFavorite
			})
		},
		handleRecharge() {
			const params = {
				billiardParlorId: this.detailObj.billiardParlorId,
				type: this.detailObj.isMultipleShop
			}
			this.$refs['rechargeDialog'].show(params)
		}
	}
}
</script>
<style lang="scss" scoped>
.box-container{
	background: var(--detail-bg) no-repeat #BACAC6;
	background-size: contain;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
	position: relative;
	.detail-header{
		width: 100%;
		display: flex;
		height: 460rpx;
	}
	.detail-content{
		padding: 10px 10px 80px 10px;
		display: flex;
		flex-direction: column;
		.recharge-box{
			margin: 20rpx 0;
			width: 100%;
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
		.member-box{
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			gap: 10px;
			.member-item{
				background: var(--member-bg) no-repeat;
				background-size: contain;
				min-height: 224rpx;
				width: calc(50% - 5rpx);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.item-title{
					display: flex;
					flex-wrap: nowrap;
					align-items: center;
					text{
						padding-right: 10rpx;
					}
				}
				.item-price{
					color: #000;
					font-size: 14px;
					text{
						font-size: 24px;
					}
				}
				.item-meal{
					background: rgba(255, 255, 255, .7);
					border-radius: 10px;
					color: #973E00;
					padding: 0 20px;
					margin-bottom: 10px;
				}
			}
		}
		.address-box{
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
			margin-top: 10px;
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
