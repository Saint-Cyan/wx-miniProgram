<template>
	<view class = "mine">
		<view class = "header">
			<!-- 登录状态-->
			<template v-if="loginStatus == 1">
				<view>亲爱的用户您好</view>
				<button @click="unLogin" size="mini" type="warn">退出登录</button>
			</template>
			<!-- 未登录-->
			<template v-if="loginStatus == 0">
			<text @click="wxLogin">去登录</text>
			
			</template>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginStatus:0,
			}
		},
		
		onShow:function(){
			console.log('我的页面显示')
			const check = uni.getStorageSync('userStatus')
			this.$set(this.$data,'loginStatus',check)
			console.log('用户状态',check)
		},
		
		methods: {
			unLogin:function(e){
					uni.setStorageSync('userStatus',0)
					uni.setStorageSync('level','0')
					uni.setStorageSync('coin','2000')
					uni.setStorageSync('is_test','0')
					uni.setStorageSync('id','')
					
					uni.showToast({
						title:"退出登录",
						icon:'none'
					})
					uni.reLaunch({
						url:"/pages/index/index"
					})
			},
			
			wxLogin:function(e){
				
				//该函数发生在页面点击事件以后，弹出授权框获取用户信息
				uni.getUserProfile({
					lang:"zh_CN",
					desc:"获取个人信息用于登录",
					//信息获取成功后调用wx.login
					success:(res)=>{
						console.log(res.encryptedData)
						console.log(res.iv)
						uni.login({
							success:(codeData)=>{
								console.log(codeData.code)
								uni.showLoading({
									title:"登录中"
								})
								uni.request({
									url:'http://localhost:7788/login',
									header:{'content-type' : "application/x-www-form-urlencoded"},
									data:{
										code:codeData.code,
										encryptedData:res.encryptedData,
										iv:res.iv
									},
									method:"POST",
									success:(login)=>{
										if(login.statusCode == 200){
											//更新用户状态
											console.log(login.data)
											uni.setStorageSync('userStatus',1)
											uni.setStorageSync('level',login.data.level)
											uni.setStorageSync('coin',login.data.coin)
											uni.setStorageSync('is_test',login.data.is_test)
											uni.setStorageSync('id',login.data.user_id)
										}
										
										uni.showToast({
											title:"登录成功",
											icon:'success'
										})
										
										uni.reLaunch({
											url:"/pages/index/index"
										})
									},
									fail:(err)=>{
										console.log(err)
										uni.showToast({
											title:"登录失败",
											icon:'error',
										})
									}
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
