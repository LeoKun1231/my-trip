import dayjs from "dayjs";

/**
 * @description:格式化时间
 * @param {*} date
 * @return {*}
 */
export function formateDateTime(date, formatString = "YYYY年MM月DD日") {
  return dayjs(date).format(formatString)
}

/**
 * @description:获得任意两天的间隔天数 
 * @param {*} startDay 开始时间
 * @param {*} endDay 结束时间
 * @return {*}
 */
export function getDiffTwoDay(startDay, endDay) {
  return dayjs(endDay).diff(startDay, "day")
}