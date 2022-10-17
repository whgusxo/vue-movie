import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js' //index-> 가장 기본적인 파일이름이기 때문에 index.js는 생략가능 index가 아니라 내가 원하는 이름이라면 명시해줘야함
import store from './store/index.js' //index-> 가장 기본적인 파일이름이기 때문에 index.js는 생략가능 index가 아니라 내가 원하는 이름이라면 명시해줘야함
import loadImage from './plugins/loadImage.js'

createApp(App)
  .use(router) // $route, $router
  .use(store) //$store
  .use(loadImage) // $loadImage
  .mount('#app')