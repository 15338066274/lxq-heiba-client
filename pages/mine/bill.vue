<template>
	<view class="bill-wrap">
		<view class="status_bar"></view>
		<u-navbar
			leftText="流水账单"
			:is-fixed="isFixed"
			leftIconColor="#fff"
			bgColor="transparent"
			:border-bottom="false"
			@leftClick="leftClick"
		>
		</u-navbar>
		<view class="bill-head">
			<view class="bill-balance">
				<view class="item">门店余额<span>￥{{shopTotalBalance}}</span></view>
				<view class="item">通店余额<span>￥{{multipleShopTotalBalance}}</span></view>
			</view>
			<view class="recharge-box">
				<view class="item">
					<u--image
						:src="days"
						width="36rpx"
						height="36rpx"
					></u--image>
					<view class="days-box">今日充值：<span>￥{{todayRechargeMoney}}</span></view>
				</view>
				<view class="item">
					<u--image
						:src="totals"
						width="36rpx"
						height="36rpx"
					></u--image>
					<view class="days-box">累计充值：<span>￥{{totalRechargeMoney}}</span></view>
				</view>
			</view>
		</view>
		<view class="tabs-con">
			<u-sticky bgColor="#ffffff">
				<u-tabs
					:list="items"
					:current="current"
					:scrollable="false"
					lineColor="#04A77A"
					@click="onClickItem"
					></u-tabs>
			</u-sticky>
			<view class="ztab-box" v-show="current === 0">
				<view class="tabs-list" v-for="(item, index) in rechargeList" :key="index"></view>
				
				<u-empty
					v-if="rechargeList.length === 0"
					:mode="mode"
					:icon="iconUrl"
				>
				</u-empty>
			</view>
			<view class="ztab-box" v-show="current === 1">
				<u-empty
					v-if="rechargeList.length === 0"
					:mode="mode"
					:icon="iconUrl"
				>
				</u-empty>
			</view>
			<view class="ztab-box" v-show="current === 2">
				<u-empty
					v-if="rechargeList3.length === 0"
					:mode="mode"
					:icon="iconUrl"
				>
				</u-empty>
			</view>
		</view>
	</view>
</template>

<script>
import storage from "@/utils/storage";
import { mapState, mapMutations } from 'vuex';
import { getMemberWaterBillHeader, getMemberWaterBillList, getMemberWaterBillConsumeList } from "@/api/my";
export default {
	data() {
		return {
			isFixed: true,
			days: require("@/static/days.svg"),
			totals: require("@/static/totals.svg"),
			items: [
				{
					name: '门店会员充值'
				},{
					name: '通店会员充值'
				},{
					name: '消费'
				}
			],
			current: 0,
			rechargeList: [],
			rechargeList2: [],
			rechargeList3: [],
			mode: 'data',
			iconUrl: 'http://cdn.uviewui.com/uview/empty/data.png',
			multipleShopTotalBalance: 0,
			todayRechargeMoney: 0,
			totalRechargeMoney: 0,
			shopTotalBalance: 0,
			pageSize: 10,
			totalCount: 0,
			currentPage: 1,
			totalPage: 0,
			loadingType: 'more', //加载更多状态
		};
	},
	onReachBottom() {
		this.loadmore()
	},
	onPullDownRefresh() {
		if (this.current === 0 || this.current === 1) {
			this.pageCurrent = 1;
			this.rechargeList = [];
			this.getWaterBillList();
			
			uni.stopPullDownRefresh();
		} else if (this.current === 2) {
			this.pageCurrent = 1;
			this.rechargeList = [];
			this.getWaterBillConsumeList();
			
			uni.stopPullDownRefresh();
		}
		
	},
	components:{},
	onLoad() {
		this.initData();
	},
	onShow() {
		this.initData();
	},
	methods: {
		// 初始化数据
		initData() {},
		// 返回上一页
		leftClick() {
			uni.navigateBack({
				delta: 1
			})
		},
		onClickItem(e) {
			if (this.current !== e.index) {
				this.current = e.index
			}
			if (this.current === 0 || this.current === 1) {
				this.getWaterBillList();
			} else if (this.current === 2) {
				this.getWaterBillConsumeList();
			}
		},
		getBillHeader() {
			let params = {
				memberId: '1'
			}
			getMemberWaterBillHeader(params).then(res => {
				
			})
		},
		getWaterBillList() {
			let params = {
				memberId: '1',
				type: this.current + 1,
				current: this.currentPage,
				size: this.pageSize
			}
			getMemberWaterBillList(params).then(res => {
				this.loadingType = 'noMore';
				if (this.currentPage === 1) {
					this.rechargeList = res.data.records
				} else {
					this.rechargeList = this.rechargeList.concat(res.data.records)
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
			if (this.current === 0 || this.current === 1) {
				this.getWaterBillList();
			} else if (this.current === 2) {
				this.getWaterBillConsumeList();
			}
		},
		getWaterBillConsumeList() {
			let params = {
				memberId: '1',
				current: this.currentPage,
				size: this.pageSize
			}
			getMemberWaterBillConsumeList(params).then(res => {
				this.loadingType = 'noMore';
				if (this.currentPage === 1) {
					this.rechargeList3 = res.data.records
				} else {
					this.rechargeList3 = this.rechargeList3.concat(res.data.records)
				}
				this.totalCount = res.data.total
				this.totalPage = res.data.pages
				uni.stopPullDownRefresh();
			})
		},
	}
};
</script>

<style lang="scss" scoped>
.bill-wrap {
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	background: var(--my-bg) no-repeat #fff;
	background-size: contain;
	.bill-head{
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 150rpx 0 10px 32rpx;
		.bill-balance{
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			margin-bottom: 10px;
			.item{
				color: #fff;
				font-size: 16px;
				span{
					padding-left: 12rpx;
				}
				&:last-child{
					padding-left: 10px;
				}
			}
		}
		.recharge-box{
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			.item{
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				color: #fff;
				.days-box{
					padding-left: 16rpx;
				}
				&:last-child{
					padding-left: 10px;
				}
			}
		}
	}
	.tabs-con{
		width: 100%;
		display: flex;
		flex-direction: column;
		.ztab-box{
			width: 100%;
		}
	}
}
</style>