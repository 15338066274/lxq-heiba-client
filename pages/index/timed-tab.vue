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
			}
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
.box_container{
	background: #fff;
	background-size: contain;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
	position: relative;
	.detail-content{
		padding: 10px;
		display: flex;
		flex-direction: column;
		.detail-intro{
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
						padding-left: 10px;
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
		.ball-table{
			width: 100%;
			margin-top: 16px;
			.ball-table-content{
				display: flex;
				flex-direction: column;
				margin-top: 16px;
			}
		}
	}
}
</style>
