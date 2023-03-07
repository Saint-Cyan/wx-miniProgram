<template>
	<view class="video-container">
		<view class = "video-playbox-section">
			<video class = "video-playbox" :src="videoPath"></video>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoPath:""
			}
		},
		
		onLoad(){
		},
		
		onShow(){
			let srcData = ''
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('acceptDataFromOpenerPage',function(data){
				srcData = data.data
			})
			this.$set(this.$data,'videoPath',srcData)
		},
		
		methods: {
			
		}
	}
</script>

<style>
	
</style>
