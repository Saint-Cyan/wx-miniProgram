<script>
	export default {
		globalData: {
			userStatus:0,
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.setStorageSync('userStatus',0)
			console.log('用户状态码初始化')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			uni.removeStorageSync('userStatus')
			uni.removeStorageSync('level')
			uni.removeStorageSync('coin')
			uni.removeStorageSync('is_test')
			uni.removeStorageSync('id')
			uni.removeStorageSync('test')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
