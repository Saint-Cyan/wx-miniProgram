<template>
	<view>
		<form @submit="enroll">
			<input placeholder="请输入您的用户ID" type="text" name="userID"/>
			<input placeholder="请输入您的密码" type="password" name = "password"/>
			<input placeholder="请再此输入您的密码" type="password" name = "passwordAgain"/>
			<input placeholder="请输入您的手机号码" type="text" name = "phoneNumber"/>
			<button form-type="submit">注册</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			enroll:function(e){
				//查询两次密码是否一致
				console.log(e)
				if(e.detail.value.password != e.detail.value.passwordAgain){
					wx.showModal({
						title:"密码输入错误",
						content:"请保证密码一致",
						success:(res)=>{
							if(res.confirm){
								
							}
							if(res.refuse){
								
							}
						}
					})
				}
				
				//发送request请求
				wx.request({
					url:'http://localhost:7788/enroll',
					method:'POST',
					header:{'content-type' : "application/x-www-form-urlencoded"},
					data:{
						userid:e.detail.value.userID,
						password:e.detail.value.password,
						phoneNumber:e.detail.value.phoneNumber
					},
					//response报文处理
					success:(res)=>{
						if(res.statusCode == 200){
							wx.showModal({
								title:"注册成功",
								content:"用户注册成功，请返回登录界面登录",
								success:(res)=>{
									if(res.confirm){
										wx.navigateTo({
											url:"../login/login"
										})
									}
									if(res.cancel){
										
									}
								}
							})
						}
						if(res.statusCode == 500){
							wx.showModal({
								title:"注册失败",
								content:"用户名已经存在.",
								success:(res)=>{
									if(res.confirm){
										
									}
									if(res.cancel){
										
									}
								}
							})
						}
						
						if(res.statusCode == 301){
							wx.showModal({
								title:"注册失败",
								content:"数据库故障，请联系管理人员。",
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
		}
	}
</script>

<style>

</style>
