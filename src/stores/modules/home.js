/*
 * @Author: hqk
 * @Date: 2022-09-17 23:10:16
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-21 20:39:32
 * @Description: 
 */
import { getHomeCategories, getHomeHotSuggests, getHouseList } from "@/services/modules/home";
import { defineStore } from "pinia";

const useHomeStore = defineStore("homeStore", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houseList: [],
    currentPage: 1,
  }),
  actions: {
    async getHotSuggestsAction() {
      const { data } = await getHomeHotSuggests()
      this.hotSuggests = data
    },
    async getHomeCategoriesAction() {
      const { data } = await getHomeCategories()
      this.categories = data
    },
    async getHomeHouseListAction() {
      const { data } = await getHouseList(this.currentPage)
      this.houseList = [...this.houseList, ...data]
      this.currentPage++
    }
  }
})


export default useHomeStore