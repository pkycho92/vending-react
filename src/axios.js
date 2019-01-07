import axios from 'axios'

const instance =  axios.create({
    baseURL: 'https://vending-react.firebaseio.com/'
})

export default instance;