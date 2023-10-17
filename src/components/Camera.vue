<template>
  <div class="camera-box" id="camera-box">
    <div id="spinner" class="spinner-off">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <video ref="video" autoplay></video>
    <img src="../assets/Icons/photo.svg" alt="" @click="takePhoto()" id="photo-button" class="hide" />
    <img src="../assets/Icons/cancel.svg" alt="" @click="stopCamera()" id="stop-photo-button" class="hide" />
    <canvas ref="canvas"></canvas>
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
        this.initializeCamera()
        .then(() => {
            this.hideSpinner()
        })
    },
    methods: {
        async initializeCamera() {
            try {
                this.showSpinner()
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                this.$refs.video.srcObject = stream;
                this.stream = stream;
                this.showButtons()
            } catch (error) {
                console.error('Error accessing the camera:', error);
                this.hideSpinner()
            }
        },
        takePhoto() {
            const video = this.$refs.video;
            const canvas = this.$refs.canvas;
            const context = canvas.getContext('2d');
            const videoProportion = video.videoWidth / video.videoHeight;
            const captureWidth = video.videoWidth;
            const captureHeight = captureWidth / videoProportion;
            const canvasWidth = captureWidth;
            const canvasHeight = captureHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            const captureX = (video.videoWidth - captureWidth) / 2;
            const captureY = (video.videoHeight - captureHeight) / 2;
            context.drawImage(video, captureX, captureY, captureWidth, captureHeight, 0, 0, canvasWidth, canvasHeight);
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
        },
        showSpinner() {
            const spinner = document.getElementById('spinner');
            spinner.classList.replace('spinner-off', 'lds-ring');
            const body = document.getElementById('camera-box');
            body.classList.add('on');
        },
        hideSpinner() {
            const spinner = document.getElementById('spinner');
            spinner.classList.replace('lds-ring', 'spinner-off');
            const body = document.getElementById('camera-box');
            body.classList.remove('on');
        },
        showButtons() {
            document.getElementById('photo-button').classList.remove('hide')
            document.getElementById('stop-photo-button').classList.remove('hide')
        }
    },
    beforeUnmount() {
        this.stopCamera()
    }
};
</script>

<style scoped>
.camera-box{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
    overflow: hidden;
    background: black;
}
video{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
canvas{
    display: none; /* Cache le canvas par défaut */
}
#photo-button{
    position: absolute;
    bottom: 5%;
    right: 10%;
    width: 70px;
    
    cursor: pointer;
}
.hide{
    display: none;
}
#stop-photo-button{
  position: absolute;
  bottom: 5%;
  left: 10%;
  width: 70px;
  
  cursor: pointer;
}
.on{
    opacity: 0.5;
}
</style>
