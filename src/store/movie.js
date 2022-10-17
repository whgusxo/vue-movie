// 영화 검색과 관련된 데이터 취급 용도
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  namespaced: true, // namespaced -> movie.js가 하나의 store에서 module화 되서 사용될 수 있는 것을 명시
  state: () => ({ // 각각의 데이터를 의미 -> 상태를 의미 화살표함수로 정의함 중괄호와 return은 제거해도 됨
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  getters: { // computed(계산된 상태를 만듬)
  }, 
  mutations: { //methods와 비슷 -> mutations 통해서 관리하는 데이터를 변경을 시키는 역할
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  }, 
  actions: { //methods와 비슷 -> actions에서는 특정한 데이터를 직접적으로 수정이 불가능, 비동기로 동작한다.
    async searchMovies({ state, commit }, payload) {
      if(state.loading) return // return만 존재하여 중괄호는 생략 가능
      

      commit('updateState', {
        message: '',
        loading: true
      })

      try{
        const res = await _ferchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults)
        console.log(typeof totalResults)
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
  
      //추가 요청
        if(pageLength > 1) {
          for(let page = 2; page <= pageLength; page += 1) {
            if(page > (payload.number / 10)) break // break 라는 키워드 밖에 없기 때문에 중괄호 생략했음
              const res = await _ferchMovie({
                ...payload,
                page
              })
              const { Search } = res.data
              commit('updateState', {
               movies: [
                  ...state.movies, 
                  ..._uniqBy(Search, 'imdbID')
                ]
             })
           }
         }
      } catch(message) {
        commit('updateState', {
          movies: [],
          message
        })
      }finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if(state.loading) return

      commit('updateState', {
        theMovie:{},
        loading: true
      })
      //const { id } = payload
      try{
        const res= await _ferchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally{
        commit('updateState', {
          loading: false
        })
      }
    }
  } 
} 

function _ferchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY ='7035c60c'
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise ((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if(res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}