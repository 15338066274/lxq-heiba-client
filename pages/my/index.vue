<template>
	<view class="personal-container">
		<view class="status_bar"></view>
		<u-navbar
			:is-fixed="isFixed"
			bgColor="transparent"
			:border-bottom="false"
		>
		</u-navbar>
		<view class="head-box">
			<u--image
				:showLoading="true"
				:src="avatar"
				width="96rpx"
				height="96rpx"
				shape="circle"
			></u--image>
			<view class="nick-name">球友6274</view>
			<view class="my-edit" @click="editProfile">
				<u-icon name="edit-pen" color="#fff" size="24px"></u-icon>
				<text>编辑</text>
			</view>
		</view>
		<view class="member-box">
			<view class="member-item" @click="toPages('/pages/mine/member')">
				<view class="item-title">
					<text>本店会员</text>
					<u--image
						:src="arrow"
						width="28rpx"
						height="28rpx"
						shape="circle"
					></u--image>
				</view>
				<view class="item-price">￥<text>{{shopTotalBalance}}</text></view>
			</view>
			<view class="member-item" @click="toPages('/pages/mine/member-shop')">
				<view class="item-title">
					<text>多店通用会员</text>
					<u--image
						:src="arrow"
						width="28rpx"
						height="28rpx"
						shape="circle"
					></u--image>
				</view>
				<view class="item-price">￥<text>{{multipleShopTotalBalance}}</text></view>
			</view>
		</view>
		<view class="my-menu">
			<view class="menu-item" v-for="(item, index) in listData" :key="index" @click="goDetail(item.route)">
				<view class="item-left">
					<u--image
						:src="item.imgUrl"
						width="48rpx"
						height="48rpx"
					></u--image>
					<text>{{item.name}}</text>
				</view>
				<view class="item-right">
					<u-icon name="arrow-right" color="#b2b2b2" size="18px"></u-icon>
				</view>
			</view>
		</view>
		<info-pop ref="infoPop" />
	</view>
</template>
<script>
import InfoPop from './dialog/info-pop.vue';
import storage from "@/utils/storage";
import { mapState, mapMutations } from 'vuex';
import { getMemberTotalBalance } from "@/api/my";
export default {
	data() {
		return {
			isFixed: true,
			isBack: false,
			avatar: require("@/static/avatar.png"),
			arrow: require("@/static/arrows.png"),
			imgUrl: '',
			listData: [{
				name: '流水账单',
				imgUrl: require("@/static/icon-bill.png"),
				route: "/pages/mine/bill"
			},{
				name: '我的收藏',
				imgUrl: require("@/static/icon-fav.png"),
				route: "/pages/mine/my-favorite"
			},{
				name: '分享好友',
				imgUrl: require("@/static/icon-share.png"),
				route: ""
			}],
			multipleShopTotalBalance: undefined,
			shopTotalBalance: undefined
		}
	},
	components:{
		InfoPop
	},
	onLoad(options) {
		this.initData();
	},
	onShow(){
		this.initData()
	},
	methods: {
		...mapMutations(['login', 'getUserInfo']),
		initData() {
			console.log('this.hasLogin', this.hasLogin)
			console.log('this.userInfo', this.userInfo)
			/* if(!this.hasLogin) {
				uni.reLaunch({
					url:'/pages/index/index'
				});
			} */
			// 登录状态时调用getMembersFn
			if(this.userInfo){
				this.getMembersFn()
			}
		},
		goDetail(route) {
			uni.navigateTo({
				url: route
			});
		},
		toPages(route) {
			uni.navigateTo({
				url: route
			})
		},
		editProfile() {
			this.$refs['infoPop'].show()
		},
		getList() {
			let params = {
				memberId: '1'
			}
			getMemberTotalBalance(params).then(res => {
				
			})
		},
	}
}
</script>

<style lang="scss" scoped>
	@import '@/common/uni-nvue.css';
	@import './index.scss';
</style>
