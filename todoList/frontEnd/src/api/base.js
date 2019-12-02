import axios from 'axios'
import queryString from 'query-string'

const handleResponse = function (response) {
  let data = response.data
  if (data.status == 'success') {
    return Promise.resolve(data)
  } else {
    return Promise.reject(data)
  }
}

const handleCatch = function (error) {
  let msg = ''
  if (typeof error == 'string') {
    msg = error
  } else {
    msg = error.message || '未知错误'
  }
  return Promise.reject({
    status: error.status ? error.status : 'fail',
    message: msg,
    errorCode: error.code || 'UNKNOW_ERROR'
  })
}

const ajaxUtils = {
  get: function (url, data, option) {
    if (data) {
      url = url + '?' + queryString.stringify(data)
    }
    return axios.get(url, option).then(handleResponse).catch(handleCatch)
  },
  post: function (url, data, option) {
    let postData = {
      ...data
    }
    return axios.post(url, postData, option).then(handleResponse).catch(handleCatch)
  },
}

export default ajaxUtils