/*
 * @Author: hqk
 * @Date: 2022-09-21 08:31:35
 * @LastEditors: hqk
 * @LastEditTime: 2022-10-03 10:25:28
 * @Description: 
 */
import { onActivated, onDeactivated, onMounted, onUnmounted } from "vue";
import { ref } from "vue"
import _ from "loadsh"
export function useScroll(elRef) {
  let el = window
  const isReachBottom = ref(false)
  const scrollHeight = ref(0)
  const scrollTop = ref(0)
  const clientHeight = ref(0)

  const scrollFn = _.throttle(() => {
    if (el == window) {
      scrollHeight.value = document.documentElement.scrollHeight
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
    } else {
      scrollHeight.value = el.scrollHeight
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
    }
    if (Math.ceil(scrollTop.value + clientHeight.value) >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, 100);
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollFn)
  })
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollFn)
  })
  return {
    isReachBottom,
    scrollHeight,
    scrollTop,
    clientHeight,
  }
}