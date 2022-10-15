/*
 * @Author: hqk
 * @Date: 2022-09-21 22:22:18
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-25 15:06:32
 * @Description: 
 */
import { defineStore } from "pinia";

const startDate = new Date();
const endDate = new Date(new Date().setDate(new Date().getDate() + 1));
const useMainStore = defineStore("mainStore", {
  state: () => ({
    startDate,
    endDate,
    isLoading: false,
    isFirstLogin: true,
    position: { longitude: 116.38, latitude: 39.90 }
  })
})

export default useMainStore