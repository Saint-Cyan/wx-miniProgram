const httpURL = require("../util/url")

export default() => {
	return new Promise((resolve,reject =>{
		if(uni.getStorageSync('token') != ''){
			resolve(true)
		}
		//token不存在,发送request请求
		uni.login({
			success:(res)=>{
				uni.request({
					url:httpURL.baseUrl + '/login',
					method:"POST",
					data:{
						code:res.code
					},
					success:(reqRes)=>{
						if(reqRes.statusCode == 200){
							
							uni.setStorageSync('userStatus',1)
							uni.setStorageSync('level',login.data.level)
							uni.setStorageSync('coin',login.data.coin)
							uni.setStorageSync('is_test',login.data.is_test)
							uni.setStorageSync('token',login.data.token)
						}
					}
				})
			}
		})
	}))
}