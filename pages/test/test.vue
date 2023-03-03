<template>
	<view>
		<view>
			<view class = "title">这是一个小问题</view>
			<view >
							<radio-group @change="handleRadio">
								<label  v-for="item in items" :key="item.value">
									<view>
										<radio :value="item.value" ></radio>
										<view >{{item.name}}</view>
									</view>
								</label>
							</radio-group>
			</view>

		</view>
		<form class = "testForm" @submit="formSubmit">
			<button form-type="submit" size="mini">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [
				    {value: 'opt_1', name: '没有，且我不打算开始'},
				    {value: 'opt_2', name: '没有，但我正在考虑'},
				    {value: 'opt_3', name: '没有，但我认真打算开始'},
				    {value: 'opt_4', name: '是的，但是只是开始一段时间'},
				    {value: 'opt_5', name: '是的，已经持续很长时间'},
				    ]
				
			}
		},
		methods: {
			formSubmit:function(e){
				const test_data = uni.getStorageSync('test')
				console.log(uni.getStorageSync('id'))
				//检查用户登录状态
				if(uni.getStorageSync('id') != ''){
					uni.request({
						url:"http://localhost:7788/test",
						header:{'content-type' : "application/x-www-form-urlencoded"},
						method:'POST',
						data:{
							id:uni.getStorageSync('id'),
							test:uni.getStorageSync('test')
						},
						success:(res)=>{
							if(res.statusCode == 200){
								console.log('问卷登入成功')
								uni.setStorageSync('is_test','1')
								
								uni.showToast({
									icon:'success',
									title:"谢谢您的回答",
								})
								
								uni.switchTab({
									url:'/pages/index/index'
								})
							}else if(res.statusCode == 301){
								console.log('登录过期，请重新登录')
								
								uni.showToast({
									icon:'error',
									title:"登录过期"
								})
								
								uni.setStorageSync('userStatus',0)
								uni.removeStorageSync('level')
								uni.removeStorageSync('coin')
								uni.removeStorageSync('is_test')
								uni.removeStorageSync('id')
								uni.removeStorageSync('test')
								
								uni.reLaunch({
									url:"/pages/index/index"
								})
							}else if(res.statusCode == 500){
								
								uni.showToast({
									icon:'error',
									title:"服务器出错，稍后再试"
								})
							}
						}
					})
				}
				console.log('提交表单')
			},
			handleRadio:function(e){
				uni.setStorageSync('test',e.detail.value)
				console.log(uni.getStorageSync('test'))
			}
		}
	}
</script>

<style>

</style>
