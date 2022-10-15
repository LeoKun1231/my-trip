/*
 * @Author: hqk
 * @Date: 2022-09-12 15:28:04
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-12 15:48:47
 * @Description: 
 */
export const getImageUrl = (image) => {
  return new URL(`../assets/img/${image}`, import.meta.url).href
}