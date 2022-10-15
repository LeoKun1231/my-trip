/*
 * @Author: hqk
 * @Date: 2022-09-24 15:15:51
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-24 15:38:50
 * @Description: 
 */
import { getDetailInfos } from "@/services";
import { defineStore } from "pinia";

const useDetailStore = defineStore("detailStore", {
  state: () => ({
    detailInfos: {},
    mainPart: [],
    pricePart: []
  }),
  actions: {
    async getDetailInfosAction(houseId) {
      const { data } = await getDetailInfos(houseId)
      this.mainPart = data.mainPart
      this.pricePart = data.pricePart
    }
  }
})

export default useDetailStore