<!--
 * @Author: hqk
 * @Date: 2022-09-28 16:01:39
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-28 17:24:25
 * @Description: 
-->
<template>
  <div class="introduce">
    <DetailSection title="房东介绍" footer="查看房东介绍">
      <div class="introduce__level">
        <img :src="introduceData.topScroll" />
      </div>
      <div class="introduce__title">
        <div class="title__left">
          <div class="left__avatar">
            <img :src="introduceData.hotelLogo" />
          </div>
          <div class="left__desc">
            <div class="left__desc__name">{{ introduceData.hotelName }}</div>
            <div class="left__desc__tags">
              <template v-for="(item, index) in introduceData.hotelTags" :key="index">
                <span class="tag" :style="{ color: item.tagText.color }">
                  {{ item.tagText.text }}
                </span>
              </template>
            </div>
          </div>
        </div>
        <div class="title__right">联系房东</div>
      </div>

      <div class="introduce__summary">
        <template v-for="item in introduceData.hotelSummary" :key="item.title">
          <div class="summary__item">
            <div class="summary__item__title">{{ item.title }}</div>
            <div class="summary__item__introduction">{{ item.introduction }}</div>
            <div class="summary__item__tip">{{ item.tip }}</div>
          </div>
        </template>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";
const props = defineProps({
  introduceData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="less">
.introduce {
  &__level {
    img {
      width: 100%;
    }
  }
  &__title {
    margin: 5px 0 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title__left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left__avatar {
        img {
          width: 50px;
        }
      }
      .left__desc {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        &__name {
          width: 100%;
          font-weight: 700;
          color: #333;
          margin: 1px 5px;
        }
        &__tags {
          margin: 1px 0;
        }
      }
    }

    .title__right {
      padding: 4px 6px;
      font-size: 13px;
      color: #fff;
      border-radius: 6px;
      background-image: var(--theme-linear-gradient);
    }
  }

  &__summary {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .summary__item {
      flex: 1;
      &__title {
        font-size: 12px;
        color: #999;
        margin: 5px 0;
      }

      &__introduction {
        font-size: 20px;
        color: #000;
        font-weight: 600;
        margin: 5px 0;
      }

      &__tip {
        font-size: 12px;
        color: #666;
        margin: 5px 0;
      }
    }
  }

  .tag {
    font-size: 12px;
    padding: 0 5px;

    &:not(:last-child)::after {
      display: inline-block;
      position: relative;
      left: 5px;
      top: 1px;
      content: " ";
      height: 10px;
      width: 1px;
      background-color: #9b9b9b;
    }
  }
}
</style>
