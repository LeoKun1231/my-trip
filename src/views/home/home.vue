<!--
 * @Author: hqk
 * @Date: 2022-09-11 13:32:05
 * @LastEditors: hqk
 * @LastEditTime: 2022-10-05 10:40:12
 * @Description: 
-->
<template>
  <div class="home" ref="homeRef">
    <HomeNavBar />
    <div class="home__banner">
      <img src="@/assets/img/home/banner.webp" />
    </div>
    <HomeSearchBox />
    <HomeCategories />
    <HomeContent />
    <div class="home__searchbar flex" v-if="isShowSearchBar">
      <SearchBar />
    </div>
    <Loading />
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<script setup>
import useHomeStore from "@/stores/modules/home";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import HomeCategories from "./cpns/home-categories.vue";
import HomeContent from "./cpns/home-content.vue";
import SearchBar from "@/components/searchBar/searchBar.vue";
import Loading from "../loading/loading.vue";

import { computed, watch, ref, onActivated } from "vue";
import { useScroll } from "@/hooks/useScroll";
const homeStore = useHomeStore();
homeStore.getHotSuggestsAction();
homeStore.getHomeCategoriesAction();
homeStore.getHomeHouseListAction();

const homeRef = ref(null);

const { isReachBottom, scrollTop } = useScroll(homeRef);
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.getHomeHouseListAction().then(() => {
      isReachBottom.value = false;
    });
  }
});
const isShowSearchBar = computed(() => {
  return scrollTop.value > 350;
});

onActivated(() => {
  homeRef.value.scrollTo({
    top: scrollTop.value,
  });
});
</script>

<style scoped lang="less">
.home {
  margin-bottom: 50px;
  height: 100vh;
  overflow-y: scroll;
  &__banner {
    img {
      width: 100%;
    }
  }
  &__searchbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 10px 20px 10px;
    z-index: 12;
    background-color: #fff;
  }
}
</style>
