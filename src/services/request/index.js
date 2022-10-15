/*
 * @Author: hqk
 * @Date: 2022-09-13 21:21:57
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-26 21:28:48
 * @Description: 
 */
import axios from "axios"
import { BASE_URL, TIMEOUT } from "./config"
import useMainStore from "@/stores/modules/main"

const mainStore = useMainStore()

class MyRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    })

    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      return config
    }, err => {
      return err
    })

    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false
      return res
    }, err => {
      mainStore.isLoading = false
      return err
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }


  get(config) {
    return this.request({ ...config, method: "get" })
  }
  post(config) {
    return this.request({ ...config, method: "post" })
  }

}

export default new MyRequest(BASE_URL, TIMEOUT)


