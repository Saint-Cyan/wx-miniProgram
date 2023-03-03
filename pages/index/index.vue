<template>
	<view class = 'container'>
		
		<view class="page-section page-section-spacing swiper" @click="toIntroduce">
			<swiper :indicator-dots="true" :autoplay="true" :circular="true">
				<block>
					<swiper-item v-for="(item, index) in swiperList" :key = "index">
						<image :src="item.image"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		
		<view class ="second">
			<view class = "second-show-level">
				用户等级:{{userLevel}}
			</view>
			<view class = "second-show-study">
				
			</view>
		</view>
		
		<view>
			ai问答
		</view>
		
		<view>
			问卷
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				userLevel:"未登录",
				swiperList:[
					{image:"http://localhost:7788/public/gaoxueya.png"},
					{image:"http://localhost:7788/public/gaoxueyaweihai.png"},
					{image:"http://localhost:7788/public/gaoxueyazhuyi.png"}
				]
			}
		},
		onLoad:function(){
			console.log('page load')
		},
		
		onShow:function(){
			try{
				const check = uni.getStorageSync('userStatus')
				//用户未登录
				if(check == 0){
					console.log('用户未登录')
				}
				if(check == 1){
					console.log('用户已登录')
					const testStatus = uni.getStorageSync('is_test')
					const level = uni.getStorageSync('level')
					//用户登录且没有进行问卷检测
					if(testStatus == 0){
						uni.showModal({
							title:"意向调查",
							content:"开始前，请您回答一个小问题",
							confirmText:"现在前往",
							showCancel:false,
							success:(res)=>{
								if(res.confirm){
									//用户前往问卷调查
									wx.navigateTo({
										url:'../test/test'
									})
								}
							}
						})
					}
					if(level == '1'){
						//用户是无意向者
						this.updateUserLevel("无意向者")
					}else if(level == '2'){
						//用户是意向者
						this.updateUserLevel("意向者")
					}else if(level == '3'){
						this.updateUserLevel("行动者")
					}
				}
			}catch(err){
				console.log(err)
			}
			
		},
		methods: {
			updateUserLevel(newLevel){
				this.userLevel = newLevel
			}

		}
	}
</script>

<style>
	.first {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.second {
		height: 150rpx;
	}
	
	.second-show-level {
		margin-left: 60rpx;
		width: 30%;
		height: 150rpx;
		background-color: #8f8f94;
	}
</style>
