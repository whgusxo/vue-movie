import { createStore } from 'vuex'
import movie from './movie'
import about from './about'

export default createStore({
  modules: {
    movie, // 데이터이름과 속성의 이름은 같아서 생략함
    about // 데이터이름과 속성의 이름은 같아서 생략함
  }
}) 