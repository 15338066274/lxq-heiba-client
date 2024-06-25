<template>
	<u-popup :show="isShow" :round="10" mode="center" @close="close" closeable>
		<view class="popup-wrap">
			<view class="popup-box">
				
			</view>
		</view>
	</u-popup>
</template>

<script>
import { getMemberRechargeComboList } from "@/api/index";
import {
	mapState,
	mapMutations
} from 'vuex';
export default {
	data() {
		return {
			isShow: false,
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
			}]
		}
	},
	methods: {
		show(row) {
			this.$nextTick(() => {
				this.isShow = true
				// this.getMemberRechargeComboListFn(row)
			})
		},
		close() {
			this.isShow = false
		},
		getMemberRechargeComboListFn(params) {
			getMemberRechargeComboList(params).then(res => {
				this.rechargeComboList = res.data.rechargeComboList
			})
		},
	}
}
</script>
<style lang="scss" scoped>
.popup-wrap{
	padding: 45px 24px;
	.popup-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.popup-logo{
			margin: 0 auto 40px;
			display: flex;
			justify-content: center;
			.dev_image{
				width: 60px;
				height: 60px;
			}
		}
		.popup-btn{
			margin: 0 auto 20px;
			width: 100%;
		}
		.popup-radio{
			margin: 0 auto 20px;
			font-size: 14px;
			.bule{
				color: $uni_color;
			}
		}
	}
}
</style>