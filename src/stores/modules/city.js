/*
 * @Author: hqk
 * @Date: 2022-09-13 22:46:16
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-25 10:51:39
 * @Description: 
 */
import { getAllCity } from "@/services";
import { defineStore } from "pinia";


const useCityStore = defineStore("cityStore", {
  state: () => {
    return {
      allCities: [],
      currentCity: { cityName: "北京" }
    }
  },

  actions: {
    async fetchAllCitiesAction() {
      const res = await getAllCity()
      this.allCities = res.data
    }
  }
})


export default useCityStore