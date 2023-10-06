<template>
  
  <router-view/>
</template>

<style>
@font-face {
  font-family: 'trumpSoftPro'; /* Nom de la police */
  src: url('./assets/fonts/TrumpSoftPro.ttf') format('truetype');
}
@font-face {
  font-family: 'catamaran'; /* Nom de la police */
  src: url('./assets/fonts/catamaran.ttf') format('truetype');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}

select.form-input{
  cursor: pointer;
}
input:focus{
  outline: none;
}
button:focus{
  outline: none;
}
input[type=date]::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
input[type=time]::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
/* Spinner */
.lds-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #c90200;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #c90200 transparent transparent transparent;
  z-index: 9998;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.on {
  opacity: 0.3;
  transition: 400ms;
}

.star{
  color: #c90200;
  margin-left: 3px;
  font-weight: bold;
  font-size: 1.2em;
}

/* Error */
.error{
  text-align: center;
  font-family: 'catamaran', sans-serif;
  font-size: 1.1em;
  line-height: 100%;
  letter-spacing: 0;
}
.empty{
  border: solid 2px #c90200!important;
}
</style>
