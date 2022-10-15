<template>
  <div class="search flex">
    <div class="search__selectTime flex-wrap">
      <div class="search__selectTime__begin flex">
        <div class="search__selectTime__desc">住</div>
        <div class="search__selectTime__date">
          {{ formateDateTime(startDate, "MM.DD") }}
        </div>
      </div>
      <div class="search__selectTime__end flex">
        <div class="search__selectTime__desc">离</div>
        <div class="search__selectTime__date icon">
          {{ formateDateTime(endDate, "MM.DD") }}
        </div>
      </div>
    </div>
    <div class="search__hint flex">
      <div class="search__hint__info">关键字/位置/民宿名</div>
      <div class="search__hint__icon flex">
        <i class="icon-search"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import useMainStore from "@/stores/modules/main";
import { formateDateTime } from "@/utils";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore);
</script>

<style scoped lang="less">
.search {
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  &__selectTime {
    width: 15vw;
    height: 54px;
    padding: 0 5px;
    background-color: #f2f4f6;
    &__desc {
      color: #999;
    }
    &__date {
      position: relative;
      color: #333;
      margin: 0 10px 0 3px;
      font-weight: 500;
    }
    .icon::after {
      content: " ";
      width: 0;
      height: 0;
      border: 4px solid #666;
      border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #666;
      -webkit-border-radius: 3px;
      border-radius: 3px;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      bottom: 0px;
      right: -10px;
    }
  }

  &__hint {
    flex: 1;
    justify-content: space-between;
    height: 54px;
    padding: 0 5px;
    margin-left: 1px;
    color: #999;
    background-color: #f2f4f6;
  }

  .icon-search {
    width: 24px;
    height: 24px;
    display: inline-block;
    background-image: url(../../assets/img/home/home-sprite.png);
    background-position: -29px -151px;
    background-size: 207px 192px;
  }
}
</style>
