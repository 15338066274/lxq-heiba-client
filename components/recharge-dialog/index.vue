<template>
	<u-popup :show="isShow" :round="10" mode="center" @close="close" :closeable="true" :safeAreaInsetBottom="false" custom-style="width: 80%;">
		<view class="popup-wrap">
			<view class="popup-box">
				<view class="popup-title">
					<h1>充值优惠</h1>
					<span>特价优惠大酬宾！充的多赠的多！</span>
				</view>
				<view class="list-box">
					<view
						class="list-item"
						v-for="(item, index) in rechargeComboList"
						:key="index"
						:class="{ selected: selectedComboId === item.rechargeComboId }"
						@click="selectCombo(item)"
						>
						<text>充{{item.rechargeMoney}}送{{item.giveMoney}}</text>
					</view>
				</view>
				<view class="popup-btn">
					<u-button text="确认充值" color="#04A77A" @click="submitFn"></u-button>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import { getMemberRechargeComboList, getMemberRecharge } from "@/api/index";
import {
	mapState,
	mapMutations
} from 'vuex';
export default {
	data() {
		return {
			isShow: false,
			rechargObj: {},
			form: {},
			rechargeComboList: [{
				"rechargeComboId": 6,
				"comboSerialNumber": 1,
				"rechargeMoney": 100,
				"giveMoney": 40
			},
			{
				"rechargeComboId": 7,
				"comboSerialNumber": 2,
				"rechargeMoney": 200,
				"giveMoney": 100
			},
			{
				"rechargeComboId": 8,
				"comboSerialNumber": 3,
				"rechargeMoney": 500,
				"giveMoney": 300
			},
			{
				"rechargeComboId": 9,
				"comboSerialNumber": 4,
				"rechargeMoney": 1000,
				"giveMoney": 700
			},
			{
				"rechargeComboId": 10,
				"comboSerialNumber": 5,
				"rechargeMoney": 3000,
				"giveMoney": 3000
			}],
			selectedComboId: null
		}
	},
	methods: {
		show(row) {
			this.$nextTick(() => {
				this.isShow = true
				this.rechargObj = row
			})
		},
		close() {
			this.isShow = false
		},
		getMemberRechargeComboListFn() {
			const params = {
				billiardParlorId: this.rechargObj.billiardParlorId,
				type: this.rechargObj.type,
			}
			getMemberRechargeComboList(params).then(res => {
				this.rechargeComboList = res.data.rechargeComboList
			})
		},
		selectCombo(data) {
			this.selectedComboId = data.rechargeComboId
			this.form = data
		},
		submitFn() {
			if(!this.form.rechargeMoney){
				uni.showToast({
					title: '请选择充值金额!',
					icon: 'none',
					duration: 1500
				})
				return false
			}
			
			const params = {
				memberId: '1',
				billiardParlorId: this.rechargObj.billiardParlorId,
				type: this.rechargObj.type,
				rechargeComboId: this.form.rechargeComboId,
				rechargeMoney: this.form.rechargeMoney,
				giveMoney: this.form.giveMoney
			}
			getMemberRecharge(params).then(res => {
				
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.popup-wrap{
	padding: 10px 30px;
	 width: calc(100% - 60px);
	display: flex;
	justify-content: center;
	.popup-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		.popup-title{
			margin: 0 auto;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			h1{
				color: #000;
				font-weight: bold;
				font-size: 20px;
			}
			span{
				color: #666;
				font-size: 14px;
				line-height: 24px;
			}
		}
		.list-box{
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 20px 0;
			.list-item{
				background: #e5f6f1;
				width: 100%;
				padding: 10px 0;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;
				border-radius: 10px;
				&.selected {
				  background-color: #04A77A;
					text{
						color: #fff;
						font-size: 16px;
						line-height: 24px;
					}
				}
				text{
					color: #04A77A;
					font-size: 16px;
					line-height: 24px;
				}
			}
		}
		.popup-btn{
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}
}
</style>