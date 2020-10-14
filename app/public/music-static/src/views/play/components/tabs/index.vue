<!--
 * @Author: your name
 * @Date: 2020-07-18 18:44:28
 * @LastEditTime: 2020-07-19 15:01:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\play\components\tabs\tabs.vue
-->
<template>
  <el-tabs
    v-model="currentVal"
    type="card"
    @tab-click="handleClick(currentVal)"
  >
    <el-tab-pane
      :label="item.label"
      :name="item.name"
      v-for="(item, index) in labels"
      :key="index"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      currentVal: this.labels[0].name
    };
  },
  methods: {
    handleClick(ele) {
      this.$emit("TabChange", ele);
    }
  }
};
</script>

<style></style>
