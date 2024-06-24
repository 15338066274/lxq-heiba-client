<template>
	<u-popup :show="isShow" :round="25" mode="center" closeIconPos="top-right" :closeable="true" :safeAreaInsetBottom="false" @close="close">
		<view class="popup-con">
			<view class="popup-wrap">
				<view class="info-title">获取头像</view>
				<view class="info-img">
					<button class="avatar-btn" type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
						<u-avatar size="48" bg-color='#000' :src="avatar" style="position: absolute;right: 35px;top:12px;"></u-avatar>
					</button>
				</view>
				<view class="info-item">
					<u--input
					    placeholder="请输入内容"
					    border="surround"
					    v-model="value"
					  ></u--input>
				</view>
				<view class="sub-btn">
					<u-button text="确认修改" shape="circle" color="#04A77A" size="small"></u-button>
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
			isShow: false,
			avatar: '',
			value: '球友1288'
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
		},
		// 微信修改头像
		onChooseavatar(e) {
			// this.userData.avatar = 'data:image/jpeg;base64,' + uni.getFileSystemManager().readFileSync(e.detail.avatarUrl,'base64')
			uni.showLoading({
				title: '加载中'
			});
			uni.uploadFile({
					url: config.baseUrl,
					filePath: e.detail.avatarUrl,
					name: 'files',
					success: res => {
						let data = JSON.parse(res.data);
						if(data.success) {
							this.userData.avatar = config.ossUrl + data.result.data
						}
					},
					fail: (error) => {
						uni.showToast({
							title: error,
							duration: 2000
						});
					},
					complete: () => {
						uni.hideLoading();
					}
				});
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
		.info-img{
			width: 100%;
			display: flex;
			justify-content: center;
			margin: 20px 0;
			button{
				background-color: transparent !important;
				&::after{
					border: none !important;
				}
			}
		}
		.info-item{
			width: 100%;
		}
		.sub-btn{
			width: 100%;
			margin-top: 20rpx;
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