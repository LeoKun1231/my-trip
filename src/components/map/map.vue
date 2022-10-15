<!--
 * @Author: hqk
 * @Date: 2022-09-24 21:43:21
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-26 08:23:22
 * @Description: 
-->
<template>
  <div class="map" id="map"></div>
</template>

<script setup>
import { onMounted, shallowRef, ref, onUnmounted } from "vue";
import { initMap } from "@/utils/map";
import localCache from "@/utils/cache";
import useMainStore from "@/stores/modules/main";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
const { position } = storeToRefs(mainStore);

const map = shallowRef(null);
onMounted(async () => {
  initMap({ plugin: [] }, (AMap) => {
    //防止刷新,失去经纬度
    const res = localCache.getCache("position");
    const { longitude, latitude } = res || { longitude: 116.38, latitude: 39.9 };
    map.value = new AMap.Map("map", {
      viewMode: "3D", //是否为3D地图模式
      zoom: 14, //初始化地图级别
      center: [longitude, latitude], //初始化地图中心点位置
    });
    const marker = new AMap.Marker({
      position: [longitude, latitude], //位置
    });
    map.value.add(marker); //添加到地图

    // 同时引入工具条插件，比例尺插件和鹰眼插件
    AMap.plugin(
      ["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye", "AMap.MapType", "AMap.Geolocation"],
      function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.value.addControl(
          new AMap.ToolBar({
            position: "RT",
          })
        );
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.value.addControl(new AMap.Scale());
        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        const Geolocation = new AMap.Geolocation();
        map.value.addControl(Geolocation);

        //监听定位按钮的点击,更新地理位置以及大头针位置
        const geolocation = document.querySelector(".amap-geolocation");
        geolocation.addEventListener("click", () => {
          Geolocation.getCurrentPosition(function (status, result) {
            if (status == "complete") {
              const {
                position: { lng: longitude, lat: latitude },
              } = result;
              localCache.setCache("position", { longitude, latitude });
              marker.setPosition([longitude, latitude]); //更新点标记位置
              position.value = {
                longitude,
                latitude,
              };
            } else {
              reject(result);
            }
          });
        });
      }
    );
  });
});

//防止返回报错,所以要在组件摧毁前,手动清除
onUnmounted(() => {
  map.value.destroy();
  map.value = null;
});
</script>

<style scoped lang="less">
.map {
  position: relative;
  height: 200px;
}
</style>
