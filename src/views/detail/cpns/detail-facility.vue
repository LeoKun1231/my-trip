<template>
  <div class="facility">
    <DetailSection title="房屋设施" footer="查看全部设施">
      <div class="facility__content">
        <template v-for="item in houseFacilitys" :key="item.groupId">
          <div class="content__item">
            <div class="item__left">
              <div class="item__left__icon">
                <img :src="item.icon" />
              </div>
              <div class="item__left__title">
                {{ item.groupName }}
              </div>
            </div>
            <div class="item__right">
              <template v-for="iten in item.facilitys.slice(0, 4)" :key="iten.name">
                <div class="item__right__iten">
                  <i class="icon_check"></i>
                  <div>{{ iten.name }}</div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";
import { computed } from "vue";

const props = defineProps({
  facilityData: {
    type: Object,
    default: () => ({}),
  },
});

const facilitySort = computed(() => {
  return props.facilityData.facilitySort;
});
const houseFacilitys = computed(() => {
  return props.facilityData.houseFacilitys?.filter((item, index) =>
    facilitySort.value.includes(index)
  );
});
</script>

<style scoped lang="less">
.facility {
  &__content {
    background-color: #f7f9fb;
    padding: 5px;

    .content__item {
      display: flex;
      margin: 25px 0;
      .item__left {
        width: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        &__icon {
          padding: 2px;
          img {
            width: 20px;
            height: 20px;
          }
        }

        &__title {
          padding: 2px;
          color: #000;
          font-size: 12px;
        }
      }
      .item__right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        &__iten {
          display: flex;
          align-items: center;
          width: 50%;
          margin: 4px 0;
          i {
            margin: 0 6px;
          }
          div {
            color: #333;
          }
        }
      }
    }
  }
  .icon_check {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../../../assets/img/detail/icon_check.png) 0 0 / 100% 100%;
  }
}
</style>
