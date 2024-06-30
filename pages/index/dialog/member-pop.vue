<template>
	<u-popup :show="isShow" :round="25" mode="center" closeIconPos="top-right" :closeable="true" :safeAreaInsetBottom="false" @close="close" custom-style="width: 90%;">
		<view class="popup-con">
			<view class="popup-wrap">
				<view class="info-title">提示</view>
				<view class="info-item">
					<p>您的账户余额小于该台押金，无法直接开台，可以选择"会员充值"或者“押金开台”</p>
				</view>
				<view class="sub-btn">
					<u-button text="会员充值" shape="circle" color="#04A77A" size="small" plain style="margin-right: 10px;"></u-button>
					<u-button text="押金开台" shape="circle" color="#04A77A" size="small"></u-button>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import config from "@/common/config";
export default {
	data() {
		return {
			isShow: false
		}
	},
	methods: {
		show() {
			this.$nextTick(() => {
				this.isShow = true
			})
		},
		close() {
			this.isShow = false
		},
		closeFn() {
			this.close();
		},
		onSubmit() {
			this.$emit('handleTips', true)
			this.close()
		}
	}
}
</script>
<style lang="scss" scoped>
.popup-con{
	position: relative;
	z-index: 999;
	width: 100%;
	.popup-wrap{
		width: calc(100% - 40px);
		padding: 20px;
		height: 100%;
		overflow: hidden;
		position: relative;
		z-index: 999;
		display: flex;
		flex-direction: column;
		.info-title{
			width: 100%;
			display: flex;
			justify-content: center;
			color: #000;
			font-size: 16px;
		}
		.info-item{
			width: 100%;
		}
		.sub-btn{
			width: 100%;
			margin-top: 20rpx;
			display: flex;
			flex-wrap: nowrap;
		}
	}
}
::v-deep{
	.u-popup{
		.u-popup__content{
			width: 90%;
			margin: 0 auto;
		}
	}
}
</style>