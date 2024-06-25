<template>
	<view class="index-container">
		<u-swiper :list="list" height="480rpx" :autoplay="false"></u-swiper>
		<view class="bill-list">
			<view class="bill-item" v-for="(item, index) in billData" :key="index" :class="{ blurred: item.status === 2 }" @click="item.status !== 2 && goDetailPage(item)">
				<template v-if="index === 0">
					<view class="special-layout">
						<view class="zuijin">
							<u--image :src="zuijin" width="164rpx" height="164rpx"></u--image>
						</view>
						<view class="bill-item-head">
							<view class="item-title">
								<text>{{item.name}}</text>
								<view class="item-tag">
									<u-tag :text="handleStatusDict(item.status)" plain :color="handleStatusColorDict(item.status)" :borderColor="handleStatusColorDict(item.status)" size="mini"></u-tag>
								</view>
								<view class="item-tag">
									<u-tag :text="'闲桌' + item.leisureTableNum + '台'" size="mini" :bgColor="item.status === 2 ? '#cccfcf' : '#04A77A'" :borderColor="item.status === 2 ? '#cccfcf' : '#04A77A'"></u-tag>
								</view>
							</view>
							<view class="item-address">{{item.address}}</view>
						</view>
						<view class="bill-item-img">
							<u--image :src="img" width="646rpx" height="328rpx"></u--image>
						</view>
						<view class="bill-item-foot">
							<view class="item-price">
								<view class="price">￥{{item.lowestFee}}<text>/小时</text></view>
								<u-icon :name="qiImg"></u-icon>
							</view>
							<view class="item-dz">
								<u-icon name="map" color="#333" size="14"></u-icon>
								<text>距离您{{item.distance}}米</text>
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="bill-item-img">
						<u--image :src="statusIconDict[item.status]" width="200rpx" height="258rpx"></u--image>
					</view>
					<view class="bill-item-con">
						<view class="item-title">
							<text>{{item.name}}</text>
							<view class="item-tag">
								<u-tag :text="handleStatusDict(item.status)" plain :color="handleStatusColorDict(item.status)" :borderColor="handleStatusColorDict(item.status)" size="mini"></u-tag>
							</view>
							<view class="item-tag">
								<u-tag :text="'闲桌' + item.leisureTableNum + '台'" size="mini" :bgColor="item.status === 2 ? '#cccfcf' : '#04A77A'" :borderColor="item.status === 2 ? '#cccfcf' : '#04A77A'"></u-tag>
							</view>
						</view>
						<view class="item-address">{{item.address}}</view>
						<view class="item-dz">
							<u-icon name="map" color="#333" size="14"></u-icon>
							<text>距离您{{item.distance}}米</text>
						</view>
						<view class="item-price">
							<view class="price">￥{{item.lowestFee}}<text>/小时</text></view>
							<u-icon :name="qiImg"></u-icon>
						</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { billStatusOption } from '@/utils/dicts'
import { getBilliardList } from "@/api/index";
export default {
	data() {
		return {
			list: [
				require("@/static/banner01.png")
			],
			billData: [{
				"billiardParlorId": 2,
				"name": "龙小球-孝感民邦一期店",
				"address": "湖北省孝感市孝南区董永路民邦槐荫东岸一期附属商业AA-116、117商铺",
				"status": 3,
				"leisureTableNum": 5,
				"lowestFee": 25,
				"isMultipleShop": 0,
				"locationLng": "113.963491",
				"locationLat": "30.912329",
				"distance": 4.88,
				"isShareActivity": 1,
				"beginTableWay": "1,2,3,4"
			},
			{
				"billiardParlorId": 3,
				"name": "龙小球-孝感安业大厦店",
				"address": "湖北省孝感市高新技术开发区乾坤大道19号安业大厦8楼802",
				"status": 2,
				"leisureTableNum": 1,
				"lowestFee": 25,
				"isMultipleShop": 1,
				"locationLng": "113.944943",
				"locationLat": "30.923651",
				"distance": 6.75,
				"isShareActivity": 0,
				"beginTableWay": "1,2,3,4"
			},
			{
				"billiardParlorId": 1,
				"name": "龙小球-孝感车天地店",
				"address": "湖北省孝感市孝南路澴川南路车天地22栋",
				"status": 3,
				"leisureTableNum": 3,
				"lowestFee": 25,
				"isMultipleShop": 1,
				"locationLng": "113.917127",
				"locationLat": "30.909044",
				"distance": 7.32,
				"isShareActivity": 1,
				"beginTableWay": "1,2,3,4"
			},
			{
				"billiardParlorId": 4,
				"name": "龙小球-孝感学院店",
				"address": "湖北省孝感市孝南区分丝南路133号",
				"status": 1,
				"leisureTableNum": 2,
				"lowestFee": 25,
				"isMultipleShop": 1,
				"locationLng": "113.925736",
				"locationLat": "30.942263",
				"distance": 9.47,
				"isShareActivity": 1,
				"beginTableWay": "1,2"
			},
			{
				"billiardParlorId": 5,
				"name": "龙小球-孝感学院二店",
				"address": "湖北省孝感市孝南区交通西路乾坤广场289号",
				"status": 1,
				"leisureTableNum": 0,
				"lowestFee": 25,
				"isMultipleShop": 0,
				"locationLng": "113.925736",
				"locationLat": "30.942263",
				"distance": 9.47,
				"isShareActivity": 0,
				"beginTableWay": "1,2,3"
			}],
			statusIconDict:{
				1: require("@/static/yyz.png"),
				2: require("@/static/zxz.png"),
				3: require("@/static/syy.png")
			},
			zuijin: require("@/static/zuijin.png"),
			img: require("@/static/zj.png"),
			qiImg: require("@/static/ico_qi.png"),
			billStatusOption,
			locationLng: '',
			locationLat: '',
			pageSize: 10,
			totalCount: 0,
			currentPage: 1,
			totalPage: 0,
			loadingType: 'more', //加载更多状态
		}
	},
	onLoad(options) {},
	onReachBottom() {
		this.loadmore()
	},
	onPullDownRefresh() {
		this.pageCurrent = 1;
		this.billData = [];
		this.getList();
		
		uni.stopPullDownRefresh();
	},
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
		goDetailPage(data) {
			const params = {
				billiardParlorId: data.billiardParlorId,
				locationLng: data.locationLng,
				locationLat: data.locationLat,
				isMultipleShop: data.isMultipleShop,
				isShareActivity: data.isShareActivity,
				beginTableWay: data.beginTableWay
			};
			// 使用模板字符串构建URL
			const queryString = Object.keys(params)
			  .map(key => `${key}=${encodeURIComponent(params[key])}`)
			  .join('&');
			uni.navigateTo({
			  url: `/pages/index/detail?${queryString}`
			});
		},
		getList() {
			this.loadingType = 'loading';
			let params = {
				locationLng: this.locationLng,
				locationLat: this.locationLat,
				current: this.currentPage,
				size: this.pageSize
			}
			getBilliardList(params).then(res => {
				this.loadingType = 'noMore';
				if (this.currentPage === 1) {
					this.billData = res.data.records
				} else {
					this.billData = this.billData.concat(res.data.records)
				}
				this.totalCount = res.data.total
				this.totalPage = res.data.pages
				uni.stopPullDownRefresh();
			})
		},
		loadmore() {
			if (this.currentPage >= this.totalPage) return uni.showToast({
				title: '已经加载完毕!',
				icon: 'none',
				duration: 1500
			})
			this.currentPage++
			this.getList()
		}
	}
}
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
