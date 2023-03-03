<template>
	<view>
		<form @submit = "weixinLogin">
				
				<input placeholder="请输入您的账号" type="text" v-model = "userid" name = "userid"/> 
				<input placeholder="请输入您的密码" type="password" v-model = "password" name = "password"/> 
				
				<button form-type="submit">登录</button>
		</form>
	</view>
	<view>
		<text @click="toEnroll">还没注册？现在开始注册账号</text>   
		</view>
</template>

<script>
	
	export default {
		data() {
			return {
				code: null
			}
		},
		
		onShow:function(){
			const check = uni.getStorageSync('userStatus')
			if(check == null){
				uni.setStorageSync('userStatus',0)
				console.log("生成用户状态")
			}
			if(check == 1){
				console.log("欢迎用户")
			}
			if(check == 0 ){
				console.log('请登录')
			}
		},
		
		methods: {
			//链接跳转
			toEnroll:function(){
				wx.navigateTo({
					url:'../enroll/enroll'
				})
			}, 
			
			//符合微信登录流程的登录函数
			
			weixinLogin:function(e){
				//查询有无token，利用token访问服务器
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
											uni.setStorageSync('userStatus',1)
											uni.setStorageSync('level',login.data.level)
											uni.setStorageSync('coin',login.data.coin)
											uni.setStorageSync('is_test',login.data.is_test)
											uni.setStorageSync('token',login.data.token)
											
											let check_unserStatus = uni.getStorageSync('userStatus')
											let check_level = uni.getStorageSync('level')
											let check_coin = uni.getStorageSync('coin')
											let check_test = uni.getStorageSync('is_test')
											let check_token = uni.getStorageSync('token')
											
											console.log(check_coin,check_level,check_unserStatus,check_test,check_token)
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
			},
			
			//登录函数。
			log:function(e){
				//调用微信
				wx.login({
					timeout:600000,
					success:(res)=>{
						wx.request({
							url:'http://localhost:7788/login',
							method:"POST",
							header:{'content-type' : "application/x-www-form-urlencoded"},
							data:{
								userid:e.detail.value.userid,
								password:e.detail.value.password
							},
							//前端数据处理
							success:(res)=>{
								if(res.statusCode == 200){
									wx.showModal({
										title:"登录成功",
										content:"欢迎回来",
										success:(res)=>{
											if(res.confirm){
												wx.switchTab({
													url:"../index/index"
												})
											}
											if(res.cancel){
												
											}
											
										}
									})
								}
								if(res.statusCode == 401){
									wx.showModal({
										title:"登录失败",
										content:"请检查您的账号和密码",
										success:(res)=>{
											if(res.confirm){
												
											}
											if(res.cancel){
												
											}
										}
									})
								}
								
								
							}
						})
					}
				})
			},
			
			
			
		}
	}
</script>

<style>

</style>
