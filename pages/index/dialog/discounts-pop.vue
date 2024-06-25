<template>
	<u-popup :show="isShow" :round="25" mode="bottom" :closeable="true" :safeAreaInsetBottom="false" @close="close" custom-style="width: 100%;">
		<view class="popup-wrap">
			<view class="popup-box">
				<view class="popup-title">
					<h1>优惠时段</h1>
				</view>
				<view class="list-box">
					
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
			serialList: []
		}
	},
	methods: {
		show(row) {
			this.$nextTick(() => {
				this.isShow = true
				this.serialList = row
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
		}
	}
}
</style>