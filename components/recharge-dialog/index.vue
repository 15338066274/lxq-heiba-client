<template>
	<u-popup :show="isShow" :round="10" mode="center" @close="close" closeable>
		<view class="popup-wrap">
			<view class="popup-box">
				
			</view>
		</view>
	</u-popup>
</template>

<script>
import {
	mapState,
	mapMutations
} from 'vuex';
export default {
	data() {
		return {
			isShow: false
		}
	},
	methods: {
		show(row) {
			this.$nextTick(() => {
				this.isShow = true
			})
		},
		close() {
			this.isShow = false
		}
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