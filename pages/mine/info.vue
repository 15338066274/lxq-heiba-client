<template>
	<view class="info-wrap">
		<u-cell-group>
			<u-cell title="头像" isLink>
				<view slot="value">
					<button class="avatar-btn" type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
						<u-avatar size="36" bg-color='#000' :src="userData.avatar || avatar" style="position: absolute;right: 35px;top:12px;"></u-avatar>
					</button>
				</view>
			</u-cell>
			<u-cell title="昵称">
				<view slot="value" class="u-slot-value" style="display: flex; flex-wrap: wrap;">
					<u--input border="none" v-model="userData.nickName" :maxlength="10"></u--input>
					<view class="nick-btn" @click="editNickName()">
						<u-button type="primary" size="mini" text="修改昵称"></u-button>
					</view>
				</view>
			</u-cell>
			<!-- <u-cell title="姓名" isLink>
				<view slot="value" class="u-slot-value">
					<u--input border="none" v-model="userData.name" :maxlength="5"></u--input>
				</view>
			</u-cell> -->
			<u-cell title="性别" :value="userData.sex" isLink @click="changeSex"></u-cell>
			<u-cell title="手机号" :value="userData.mobile" isLink></u-cell>
			<u-cell
				title="所属地区"
				isLink>
				<view slot="value" class="u-slot-value">
					<picker mode="region" :range="region"
						@change="setAddress">
						<view :class="region ? 'region-box' : 'region-box'">{{region ? region : '请选择'}}</view>
					</picker>
				</view>
			</u-cell>
			<u-cell title="喜欢看的内容">
				<!-- <view slot="value">
					<view class="label-btn" @click="onOpen">
						<u-button icon="edit-pen-fill" type="primary" size="mini" text="设置标签"></u-button>
					</view>
				</view> -->
			</u-cell>
			<view class="uni-tag-box">
				<view class="uni-item-tag">
					<view class="item-tag" v-for="(item, index) in tagsList" :key="index"># {{item}}</view>
				</view>
				<view class="label-btn" @click="onOpen">
					<u-button icon="plus" size="mini" text="添加标签"></u-button>
				</view>
			</view>
		</u-cell-group>
		<view class="sub-block">
			<u-button
				text="保存"
				size="normal"
				type="primary"
				@click="onSubmit"
			></u-button>
		</view>
		<u-picker
			:show="sexShow"
			:columns="columns"
			@cancel="sexShow = false"
			@confirm="confirm"
		></u-picker>
	</view>
</template>

<script>
import storage from "@/utils/storage";
import { mapState, mapMutations } from 'vuex';
import config from "@/common/config";
export default {
	data() {
		return {
			avatar: '',
			userData: {},
			nickName: '微信用户',
			tagsList: [],
			sexShow: false,
			region: '',
			columns: [
				['男', '女']
			]
		};
	},
	components:{},
	onLoad() {
		this.initData();
	},
	onShow() {
		this.initData();
	},
	methods: {
		...mapMutations(['login', 'getUserInfo']),
		// 初始化数据
		initData() {
			let tagsList = []
			let params = '?id=' + this.userInfo.id
			this.$u.api.getMembers(params).then(res => {
				this.userData = res.result;
				this.userData.sex = res.result.sex ? '男' : '女'
				storage.setUserInfo(res.result);
				this.getUserInfo(res.result)
				if(this.userData?.tags?.includes(',')) {
					tagsList = this.userData.tags.split(',')
				} else {
					tagsList.push(this.userData.tags)
				}
				this.tagsList = tagsList
				if(this.userData.province && this.userData.city && this.userData.district) {
					this.region = this.userData.province + ',' + this.userData.city + ',' + this.userData.district
				}
			});
		},
		// 打开感兴趣弹框
		onOpen() {
			this.$refs['labelPop'].show('article')
		},
		handleSuccess(data) {
			if(data){
				this.tagsList = data.split(',')
				this.userData.tags = data
			}
		},
		changeSex() {
			this.sexShow = true
		},
		confirm(e) {
			this.sexShow = false
			this.userData.sex =  e.value[0]
		},
		onSubmit() {
			if (!this.userData.nickName) return this.$pub.msg('请输入昵称');
			if (this.userData.nickName.length < 2) return this.$pub.msg('请输入昵称长度不能小于两个字');
			// if (!this.userData.name) return this.$pub.msg('请输入姓名');
			// if (this.userData.name.length < 2) return this.$pub.msg('请输入姓名长度不能小于两个字');
			// if (!this.userData.mobile) return this.$pub.msg('请输入手机号');
			// if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.userData.mobile)) return this.$pub.msg('手机号输入不正确！');
			this.$u.api.getMembersUpdate(this.userData).then(res => {
				if(res.success){
					if(res.result){
						this.initData();
						this.$pub.msg('保存成功!')
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/my/index'
							});
						}, 500);
					} else {
						this.$pub.msg(res.result.message)
					}
				}
			});
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
		},
		editNickName() {
			this.$u.api.getRankNickName().then(res => {
				if(res.success) {
					this.userData.nickName = res.result + this.userData.mobile.slice(-4)
				}
			})
		},
		setAddress(e) {
			this.region = e.detail.value.join(',')
			this.userData.province = e.detail.value[0]
			this.userData.city = e.detail.value[1]
			this.userData.district = e.detail.value[2]
		}
	}
};
</script>

<style lang="scss">
page{
	background: #fff;
}
.info-wrap{
	position: relative;
	height: 100%;
	/deep/.u-cell__title-text{
		color: #8A919F !important;
	}
	/deep/.u-line{
		border-color: #F5F5F9 !important;
	}
	.uni-tag-box{
		display: flex;
		padding: 20px 10px 0;
	}
	.uni-item-tag{
		display: flex;
		flex-wrap: wrap;
	}
	.item-tag{
		height: 24px;
		color: #1684FC;
		text-align: center;
		margin-right: 10px;
		margin-bottom: 10px;
		border-radius: 5px;
		font-size: 12px;
		padding: 0 10px;
		height: 48rpx;
		background: rgba(22,132,252,0.08);
	}
	.label-btn{
		/deep/.u-button{
			height: 24px;
			color: #333;
			text-align: center;
			line-height: 24px;
			background: #fff;
			border-radius: 5px;
			font-size: 12px;
			padding: 0 10px;
			display: flex;
		}
	}
	.sub-block{
		width: 90%;
		margin: 50px auto 0;
		/deep/.u-button{
			background: #1684FC;
			border-radius: 16rpx;
		}
	}
	.u-input__content__field-wrapper__field{
		text-align: right !important;
	}
	.avatar-btn{
		background: transparent !important;
		padding: 0;
		&::after{
			border: none !important;
		}
	}
	.nick-btn{
		margin-left: 10rpx;
	}
	.region-box{
		color: #303133;
		font-size: 15px;
	}
	.region_box{
		color: #666;
		font-size: 15px;
	}
}
</style>