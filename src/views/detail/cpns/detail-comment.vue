<!--
 * @Author: hqk
 * @Date: 2022-09-28 20:38:25
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-28 22:28:45
 * @Description: 
-->
<template>
  <div class="comment">
    <DetailSection
      title="热门评论"
      :footer="'查看全部' + commentData.totalCount + '条评论'"
    >
      <div class="comment__header">
        <div class="header__left">
          <div class="left__score">
            {{ commentData.overall }}
            <div class="line"></div>
          </div>
          <div class="left__rate">
            <div class="left__scoreTitle">{{ commentData.scoreTitle }}</div>
            <div class="left__commentNum">{{ commentData.totalCount }}条评论</div>
            <van-rate
              :modelValue="commentData.overall"
              readonly
              allow-half
              size="12"
              color="#ff9854"
            />
          </div>
        </div>
        <div class="header__right">
          <template v-for="item in commentData.subScoresFocus" :key="item.text">
            <div class="header__right__item">
              {{ item.text }}
            </div>
          </template>
        </div>
      </div>

      <div class="comment__tags">
        <template v-for="item in commentData.commentTagVo" :key="item.text">
          <span
            class="comment__tags__item"
            :style="{
              background: item.backgroundColor,
              color: item.color,
              borderColor: item.borderColor,
            }"
            >{{ item.text }}</span
          >
        </template>
      </div>

      <div class="comment__content">
        <div class="content__header">
          <div class="header__avatar">
            <img :src="commentData.comment?.userAvatars" />
          </div>
          <div class="right">
            <div class="header__username">{{ commentData.comment?.userName }}</div>
            <div class="header__date">{{ commentData.comment?.checkInDate }}</div>
          </div>
        </div>
        <div class="content__info">{{ commentData.comment?.commentDetail }}</div>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";
defineProps({
  commentData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="less">
.comment {
  &__header {
    display: flex;
    .header__left {
      flex: 1;
      display: flex;
      .left__score {
        font-size: 40px;
        font-weight: 700;
        margin: 10px 10px 10px 0;
      }
      .left__rate {
        margin-top: 10px;
        font-size: 12px;
        .left__scoreTitle {
          color: #333;
          margin: 4px 0;
        }
        .left__commentNum {
          color: #999;
          margin: 4px 0;
        }
      }
    }
    .header__right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      &__item {
        width: 50%;
        color: #666;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    &__item {
      padding: 3px 8px;
      margin: 3px 4px;
      font-size: 12px;
      border-radius: 6px;
    }
  }

  &__content {
    padding: 5px;
    background-color: #f7f9fb;
    border-radius: 6px;
    .content__header {
      display: flex;
      .header__avatar {
        margin: 5px;
        img {
          width: 30px;
          border-radius: 50%;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .header__username {
          color: #000;
          margin: 2px 0;
        }
        .header__date {
          font-size: 12px;
          color: #999;
          margin: 2px 0;
        }
      }
    }
    .content__info {
      margin-top: 16px;
      font-size: 12px;
      color: #333;
    }
  }

  .line {
    position: relative;
    top: -8px;
    width: 56px;
    height: 6px;
    background-color: var(--primary-color);
    border-radius: 8px;
  }
}
</style>
