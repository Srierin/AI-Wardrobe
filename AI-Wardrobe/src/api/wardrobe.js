import axios from './config'

export const getImages = (page) => {
  return axios.get('/api/images',{
    params:{page}
  })
}