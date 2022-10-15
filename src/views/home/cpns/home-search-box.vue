<!--
 * @Author: hqk
 * @Date: 2022-09-12 17:29:26
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-28 16:00:19
 * @Description: 
-->
<template>
  <div class="searchBox">
    <div class="searchBox__position bottom-line section">
      <div class="searchBox__position__left" @click="handleCityClick">
        {{ currentCity.cityName }}
      </div>
      <div class="searchBox__position__right" @click="handlePositionClick">
        <van-loading v-if="positionLoading" color="#ff9854" size="16px">
          正在定位...
        </van-loading>
        <template v-else="positionLoading">
          <span>我的位置</span>
          <img src="@/assets/img/home/icon_location.png" />
        </template>
      </div>
    </div>

    <div class="searchBox__dateRange bottom-line section" @click="isShowCalendar = true">
      <div class="searchBox__dateRange__begin">
        <div class="dateRange__tip">入住</div>
        <div class="dateRange__time">{{ startDay }}</div>
      </div>
      <div class="searchBox__dateRange__center left-line">共{{ stayNight }}晚</div>
      <div class="searchBox__dateRange__end left-line">
        <div class="dateRange__end__innerBox">
          <div class="dateRange__tip">离店</div>
          <div class="dateRange__time">{{ endDay }}</div>
        </div>
      </div>
    </div>

    <div class="searchBox__priceAndmanInput bottom-line section">
      <div class="section searchBox__price" @click="isShowPrice = true">
        <van-field
          v-model="price"
          readonly
          placeholder="价格不限"
          clickable
          @touchstart.stop="handlePriceTouchStart"
        />
        <div v-if="price">元</div>
        <div v-else style="width: 14px; height: 14px">&nbsp;</div>
      </div>
      <van-number-keyboard
        v-model="price"
        :show="isShowPrice"
        @blur="isShowPrice = false"
      />
      <div class="section searchBox__man left-line" @click="handleManTouchStart">
        <van-field
          v-model="man"
          readonly
          placeholder="人数不限"
          clickable
          @touchstart.stop="isShowMan = true"
        />
        <div v-if="man">人</div>
        <div v-else style="width: 14px; height: 14px">&nbsp;</div>
      </div>
      <van-number-keyboard v-model="man" :show="isShowMan" @blur="isShowMan = false" />
    </div>

    <div class="searchBox__keywordSearch bottom-line section">
      <van-field v-model="keyword" placeholder="关键字/位置/民宿名" />
    </div>

    <div class="searchBox__hotSuggests">
      <template v-for="(suggest, index) in hotSuggests" :key="index">
        <div
          class="searchBox__hotSuggests__item"
          :style="{
            color: suggest.tagText.color,
            background: suggest.tagText.background.color,
          }"
        >
          {{ suggest.tagText.text }}
        </div>
      </template>
    </div>

    <div class="searchBox__searchBtn section">
      <div class="searchBox__searchBtn__item" @click="handleSearch">开始搜索</div>
    </div>
    <van-calendar
      v-model:show="isShowCalendar"
      color="#ff9854"
      type="range"
      :round="false"
      @confirm="onConfirmCalendar"
    />
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import useCityStore from "@/stores/modules/city";
import useHomeStore from "@/stores/modules/home";
import useMainStore from "@/stores/modules/main";

import { formateDateTime, getDiffTwoDay } from "@/utils";
import { queryCurrentPosition, queryCityByPosition } from "@/utils/map";
import localCache from "@/utils/cache";

const router = useRouter();
const mainStore = useMainStore();
const cityStore = useCityStore();

//获取当前的城市
const { currentCity } = storeToRefs(cityStore);
//城市点击
const handleCityClick = () => {
  router.push("/city");
};

//关键字
const keyword = ref("");
//定位loading
const positionLoading = ref(false);
const { position } = storeToRefs(mainStore);
//处理定位
const handlePositionClick = async (isNotFirst = true) => {
  positionLoading.value = true;
  try {
    const { longitude, latitude } = await queryCurrentPosition();
    const { regeocode } = await queryCityByPosition({ longitude, latitude });
    const {
      city,
      district,
      province,
      street,
      township,
      streetNumber,
    } = regeocode.addressComponent;
    if (isNotFirst) {
      keyword.value = province + city + district + township + street + streetNumber;
    }
    position.value = { longitude, latitude };
    localCache.setCache("position", position.value);
    currentCity.value.cityName = city.slice(0, city.length - 1);
    positionLoading.value = false;
  } catch (error) {
    positionLoading.value = false;
    console.log(error);
  }
};

//处理第一次进入页面获取地址
const { isFirstLogin } = storeToRefs(mainStore);
watchEffect(() => {
  if (!isFirstLogin.value) return;
  handlePositionClick(false);
  isFirstLogin.value = false;
});

//日期
const isShowCalendar = ref(false);

/**
 *处理日期
 */
//没有被格式化的时间
const { startDate, endDate } = storeToRefs(mainStore);
//被格式化后的时间
const startDay = ref(formateDateTime(startDate.value));
const endDay = ref(formateDateTime(endDate.value));
const stayNight = ref(getDiffTwoDay(startDate.value, endDate.value));
const onConfirmCalendar = (selectValue) => {
  //1.确定选中的日期
  startDate.value = selectValue[0];
  endDate.value = selectValue[1];
  startDay.value = formateDateTime(selectValue[0]);
  endDay.value = formateDateTime(selectValue[1]);
  //2.确定时间间隔
  stayNight.value = getDiffTwoDay(selectValue[0], selectValue[1]);
  //3.关闭日期
  isShowCalendar.value = false;
};

/**
 * 处理价格和人数
 */
//价格
const isShowPrice = ref(false);
const price = ref();
const handlePriceTouchStart = () => {
  isShowPrice.value = true;
  isShowMan.value = false;
};

//人数
const isShowMan = ref(false);
const man = ref();
const handleManTouchStart = () => {
  isShowMan.value = true;
  isShowPrice.value = false;
};

//最热建议
const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);
//开始搜索
const handleSearch = () => {
  router.push({
    path: "/search",
    query: {
      currentCity: currentCity.value.cityName,
      startDate,
      endDate,
    },
  });
};
</script>

<style scoped lang="less">
.searchBox {
  --van-calendar-popup-height: 100%;
  --van-cell-border-color: transparent;
  --van-cell-horizontal-padding: 0;
  .section {
    display: flex;
    height: 44px;
    padding: 0 20px;
    align-items: center;
  }
  &__position {
    justify-content: space-between;
    &__left {
      font-size: 15px;
    }
    &__right {
      img {
        margin-left: 6px;
        width: 16px;
      }
    }
  }

  &__dateRange {
    &__begin {
      flex: 1;
    }
    &__center {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    &__end {
      flex: 1;
      display: flex;
      justify-content: end;
    }
    .dateRange__tip {
      color: #999;
    }
    .dateRange__time {
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }
  }
  &__price {
    padding: 0 !important;
  }
  &__man {
    padding: 0 !important;
    padding-left: 10px !important;
  }
  &__hotSuggests {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 20px;
    &__item {
      padding: 5px 10px;
      border-radius: 14px;
      margin: 5px 2px;
    }
  }

  &__searchBtn {
    &__item {
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-weight: 500;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      background-image: var(--theme-linear-gradient);
    }
  }
}
</style>
