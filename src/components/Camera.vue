<template>
  <div class="camera-box">
    <video ref="video" autoplay></video>
    <button @click="takePhoto()" class="photo-button"></button>
    <button @click="stopCamera()" class="stop-photo-button"></button>
    <canvas ref="canvas" style="display:none;"></canvas>
  </div>
</template>

<script>
export default {
    name: 'CameraPhoto',
    data() {
        return {
            photo: null,
            stream: null
        };
    },
    mounted() {
        this.initializeCamera();
    },
    methods: {
        async initializeCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                this.$refs.video.srcObject = stream;
                this.stream = stream;
            } catch (error) {
                console.error('Error accessing the camera:', error);
            }
        },
        takePhoto() {
            const video = this.$refs.video;
            const canvas = this.$refs.canvas;
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            this.photo = canvas.toDataURL('image/png');

            const byteCharacters = atob(this.photo.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            const blob = new Blob([byteArray], { type: 'image/png' });
            const file = new File([blob], 'photo.png', { type: 'image/png' });
            this.$emit('photo-captured', file);

            this.$store.state.actualPhoto = this.photo
            this.stopCamera()
        },
        stopCamera() {
            if (this.stream) {
                const tracks = this.stream.getTracks();
                tracks.forEach(track => track.stop());
                this.$store.state.camera = false
            }
        }
    }
};
</script>

<style scoped>
.camera-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 12;
}
video{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.photo-button{
    position: absolute;
    bottom: 5%;
    left: 48%;
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 30px;
    cursor: pointer;
}
.stop-photo-button{
  position: absolute;
  bottom: 5%;
  left: 10%;
  width: 50px;
  height: 50px;
  background: red;
  border-radius: 30px;
  cursor: pointer;
}
</style>
