/*
 * @Author: hqk
 * @Date: 2022-09-17 23:06:17
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-20 20:58:47
 * @Description: 
 */
import myRequest from "../request/index"

export function getHomeHotSuggests() {
  return myRequest.get({
    url: "/home/hotSuggests"
  })
}


export function getHomeCategories() {
  return myRequest.get({
    url: "/home/categories"
  })
}

export function getHouseList(currentPage) {
  return myRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}