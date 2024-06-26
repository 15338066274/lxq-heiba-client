<template>
	<u-popup :show="isShow" :round="15" mode="bottom" :closeable="true" :safeAreaInsetBottom="false" @close="close" custom-style="width: 100%;">
		<view class="popup-wrap">
			<view class="popup-box">
				<view class="popup-title">
					<h1>优惠时段</h1>
				</view>
				<view class="list-box">
				    <view class="list-left">
				      <view v-for="item in serialList" 
				            :key="item.serialNumber" 
				            :class="{ selected: selectedSerialNumber === item.serialNumber }"
				            @click="selectSerial(item.serialNumber)">
				        {{ item.week }}
				      </view>
				    </view>
				    <view class="list-right">
				      <view v-if="selectedSerial" class="item-right">
				        <view v-if="selectedSerial.isDiscounts" class="item-li">
									<view v-for="(v, i) in splitTimeFrame(selectedSerial.disTimeFrame)" :key="i">
										{{ v }}
									</view>
				        </view>
				        <view v-else>
				          当前无优惠
				        </view>
				      </view>
				    </view>
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
			serialList: [],
			selectedSerialNumber: 1
		}
	},
	computed: {
		selectedSerial() {
			return this.serialList.find(item => item.serialNumber === this.selectedSerialNumber);
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
		selectSerial(serialNumber) {
			this.selectedSerialNumber = serialNumber;
		},
	 splitTimeFrame(timeFrame) {
		 return timeFrame ? timeFrame.split(',') : [];
	 }
	}
}
</script>
<style lang="scss" scoped>
.popup-wrap{
	padding: 10px 0 0 0;
	width: 100%;
	display: flex;
	justify-content: center;
	.popup-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 400px;
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
		.list-box{
			width: 100%;
			display: flex;
			flex-wrap: nowrap;
			height: 100%;
			.list-left{
				width: 120rpx;
				background-color: #f5f5f5;
				view {
				  padding: 10px;
				  cursor: pointer;
					&.selected {
						background-color: #fff;
						color: #000;
					}
				}
			}
			.list-right{
				flex: 1;
				padding: 15px;
				.item-right{
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					.item-li{
						text-align: center;
					}
				}
			}
		}
	}
}
</style>