<template>
	<view class="index-container">
		<u-swiper :list="list" height="480rpx" :autoplay="false"></u-swiper>
		<view class="bill-list">
			<view class="bill-item" v-for="(item, index) in billData" :key="index" @click="goDetailPage(item.billiardParlorId)">
				<view class="bill-item-img">
					<u--image :src="statusIconDict[item.status]" width="200rpx" height="258rpx"></u--image>
				</view>
				<view class="bill-item-con">
					<view class="item-title">
						<text>{{item.name}}</text>
						<view class="item-tag">
							<u-tag :text="handleStatusDict(item.status)" plain :color="handleStatusColorDict(item.status)" :borderColor="handleStatusColorDict(item.status)" size="mini"></u-tag>
						</view>
						<view>
							<u-tag :text="'闲桌' + item.leisureTableNum + '台'" size="mini" :bgColor="item.status === 3 ? '#cccfcf' : '#04A77A'" :borderColor="item.status === 3 ? '#cccfcf' : '#04A77A'"></u-tag>
						</view>
					</view>
					<view class="item-address">{{item.address}}</view>
					<view class="item-dz">
						<u-icon name="map" color="#333" size="14"></u-icon>
						<text>{{item.distance}}</text>
					</view>
					<view class="item-price">
						<view class="price">￥{{item.lowestFee}}<text>/小时</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { billStatusOption } from '@/utils/dicts'
export default {
	data() {
		return {
			list: [
				require("@/static/banner01.png")
			],
			billData: [{
				"billiardParlorId": '1',
				"name": '龙小球-孝感学院店',
				"address":"湖北省孝感市孝南区分丝南路133号",
				"status":1,
				"leisureTableNum":5,
				"lowestFee":22.96,
				"isMultipleShop":1,
				"locationLng": "320.76",
				"locationLat": "775.26",
				"isShareActivity":1,
				"distance": 900,
				"beginTableWay":"1,2,3,4"
			},{
				"billiardParlorId": '1',
				"name": '龙小球-孝感学院店',
				"address":"湖北省孝感市孝南区分丝南路135号",
				"status":2,
				"leisureTableNum":5,
				"lowestFee":22.96,
				"isMultipleShop":1,
				"locationLng": "320.76",
				"locationLat": "775.26",
				"isShareActivity":1,
				"distance": 1300,
				"beginTableWay":"1,2,3,4"
			},{
				"billiardParlorId": '1',
				"name": '龙小球-孝感学院店',
				"address":"湖北省孝感市孝南区分丝南路135号",
				"status":3,
				"leisureTableNum":0,
				"lowestFee":22.96,
				"isMultipleShop":1,
				"locationLng": "320.76",
				"locationLat": "775.26",
				"isShareActivity":1,
				"distance": 1800,
				"beginTableWay":"1,2,3,4"
			}],
			statusIconDict:{
				1: require("@/static/yyz.png"),
				2: require("@/static/zxz.png"),
				3: require("@/static/syy.png")
			},
			img: require("@/static/zj.png"),
			billStatusOption
		}
	},
	onLoad(options) {},
	methods: {
		...mapMutations(['login']),
		initData() {
			console.log('this.hasLogin', this.hasLogin)
			console.log('this.userInfo', this.userInfo)
		},
		handleStatusDict(val) {
			var _val = Number(val)
			return this.billStatusOption.find(v => Number(v.value) === _val)?.label
		},
		handleStatusColorDict(val) {
			var _val = Number(val)
			return this.billStatusOption.find(v => Number(v.value) === _val)?.color
		},
		goDetailPage(id) {
			uni.navigateTo({
			  url: `/pages/index/detail?id=${id}`
			});
		}
	}
}
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
