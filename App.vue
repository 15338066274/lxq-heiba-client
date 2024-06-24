<script>
import storage from "@/utils/storage.js"; //缓存
import { mapMutations } from 'vuex'
import config from "@/common/config";
export default {
	onLaunch: function() {
		this.autoUpdate();
	},
	methods:{
		...mapMutations(["login", "getUserInfo"]),
		autoUpdate:function() {
			var self=this
			// 获取小程序更新机制兼容
			if (wx.canIUse('getUpdateManager')) {
			  const updateManager = wx.getUpdateManager()
			  //1. 检查小程序是否有新版本发布
			  updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
				  //2. 小程序有新版本，则静默下载新版本，做好更新准备
				  updateManager.onUpdateReady(function () {
					console.log('new Date()', new Date())
					wx.showModal({
					  title: '更新提示',
					  content: '新版本已经准备好，是否重启应用？',
					  success: function (res) {
						if (res.confirm) {
						  //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						  updateManager.applyUpdate()
						} else if (res.cancel) {
						  //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
						  wx.showModal({
							title: '温馨提示~',
							content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
							success: function (res) {     
							  self.autoUpdate()
							  return;                 
							  //第二次提示后，强制更新                      
							  if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate()
							  } else if (res.cancel) {
								//重新回到版本更新提示
								self.autoUpdate()
							  }
							}
						  })
						}
					  }
					})
				  })
				  updateManager.onUpdateFailed(function () {
					// 新的版本下载失败
					wx.showModal({
					  title: '已经有新版本了哟~',
					  content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
					})
				  })
				}
			  })
			} else {
			  // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
			  wx.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			  })
			}
		}
	}
}
</script>

<style>
    /* #ifndef APP-PLUS-NVUE */
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
    @import './common/uni.css';

	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		body{
			overflow-y: scroll;
		}
	}

	uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	}

	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}

	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}
	/* #endif */
	
	/* 以下样式用于 hello uni-app 演示所需 */
	    page {
	        height: 100%;
	        font-size: 28rpx;
	        line-height: 1.8;
	    }
	    /* #endif*/
</style>
<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
</style>