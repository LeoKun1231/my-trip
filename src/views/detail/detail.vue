<!--
 * @Author: hqk
 * @Date: 2022-09-24 14:27:22
 * @LastEditors: hqk
 * @LastEditTime: 2022-10-05 10:35:02
 * @Description: 
-->
<template>
  <div class="detail" ref="detailRef">
    <div class="detail__nav" v-if="!showTab">
      <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="detail__main" v-memo="[mainPart]">
      <DetailSwipe :swipe-data="mainPart?.topModule?.housePicture?.housePics" />
      <DetailInfo name="描述`" :ref="getCurrentRef" :info-data="mainPart?.topModule" />
      <DetailFacility
        name="设施"
        :ref="getCurrentRef"
        :facility-data="mainPart?.dynamicModule?.facilityModule?.houseFacility"
      />
      <DetailIntroduce name="房东" :ref="getCurrentRef" :introduce-data="mainPart?.dynamicModule?.landlordModule" />

      <DetailComment name="评论" :ref="getCurrentRef" :comment-data="mainPart?.dynamicModule?.commentModule" />
      <DetailOrder name="须知" :ref="getCurrentRef" :order-data="mainPart?.dynamicModule?.rulesModule?.orderRules" />
      <DetailMap name="周边" :ref="getCurrentRef" />
      <DetailNotice :price-intro="mainPart?.introductionModule" />
    </div>
    <div class="detail__footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
    <div class="detail__tabs" v-if="showTab">
      <van-tabs v-model:active="activeTab" @click-tab="handleTabClick">
        <van-tab v-for="title in names" :title="title"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import useDetailStore from "@/stores/modules/detail";
import { storeToRefs } from "pinia";
import DetailSwipe from "./cpns/detail-swipe.vue";
import DetailInfo from "./cpns/detail-info.vue";
import DetailFacility from "./cpns/detail-facility.vue";
import DetailMap from "./cpns/detail-map.vue";
import DetailIntroduce from "./cpns/detail-introduce.vue";
import DetailOrder from "./cpns/detail-order.vue";
import DetailComment from "./cpns/detail-comment.vue";
import DetailNotice from "./cpns/detail-notice.vue";
import { useScroll } from "@/hooks/useScroll";

const router = useRouter();
const route = useRoute();
const houseId = computed(() => {
  return route.params.id;
});

const detailStore = useDetailStore();
detailStore.getDetailInfosAction(houseId.value);
const { mainPart, pricePart } = storeToRefs(detailStore);
//返回
const onClickLeft = () => {
  router.back();
};

const selectEls = ref({});
const activeTab = ref(0);
const detailRef = ref(null);

const { scrollTop } = useScroll(detailRef);

//获取当前所有组件名
const names = computed(() => {
  return Object.keys(selectEls.value);
});

const showTab = computed(() => {
  return scrollTop.value >= selectEls.value[Object.keys(selectEls.value)[0]]?.offsetTop - 44;
});

//获取当前的ref
const getCurrentRef = (currentRef) => {
  if (!currentRef) return;
  const name = currentRef.$el.getAttribute("name");
  selectEls.value[name] = currentRef.$el;
};
//监听当前tab的点击

let isClick = false;
let currentDistance = -1;
const handleTabClick = (tab) => {
  const currentItem = selectEls.value[tab.title];
  const offsetTop = currentItem.offsetTop - 44;
  isClick = true;

  detailRef.value.scrollTo({
    top: offsetTop,
    behaviorL: "smooth",
  });

  currentDistance = offsetTop;
  activeTab.value = tab.name;
};

watch(scrollTop, (newValue) => {
  const newScrollTop = Math.ceil(newValue);
  if (newScrollTop === currentDistance) {
    isClick = false;
  }
  if (isClick) return;

  const elValues = Object.values(selectEls.value);
  const offsetTops = elValues.map((el) => el.offsetTop);

  let currentTabIndex = offsetTops.length - 1;
  for (let i = 0; i < offsetTops.length; i++) {
    if (newScrollTop + 44 < offsetTops[i]) {
      currentTabIndex = i - 1;
      break;
    }
  }
  activeTab.value = currentTabIndex;
});
</script>

<style scoped lang="less">
.detail {
  overflow: scroll;
  height: 100vh;

  &__nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
  }
  &__main {
    margin-top: 46px;
    width: 100%;
    .main__map {
      margin: 10px;
      :deep(.amap-layer) {
        width: calc(100%) !important;
      }
      :deep(.amap-logo) {
        display: none !important;
      }
      :deep(.amap-copyright) {
        display: none !important;
      }
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }

  &__tabs {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
  }

  .placehoder {
    height: 8px;
    width: 100%;
    color: #f3f3f3;
  }
}
</style>
