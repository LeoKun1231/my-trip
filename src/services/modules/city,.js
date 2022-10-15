/*
 * @Author: hqk
 * @Date: 2022-09-13 21:22:10
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-17 23:05:18
 * @Description: 
 */
import myRequest from "../request"

export function getAllCity() {
  return myRequest.get({
    url: "/city/all"
  })
}

