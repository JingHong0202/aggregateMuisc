<template>
  <div class="d2-badge">
    <!-- <p v-for="(group, groupIndex) of badges" :key="groupIndex" align="center">
      <a v-for="(badge, badgeIndex) of group" :key="badgeIndex" :href="badge.link" target="_blank">
        <img :src="badge.img"/>
      </a>
    </p> -->
  </div>
</template>

<script>
// const linkD2Admin = 'https://github.com/d2-projects/d2-admin'
export default {
  data() {
    return {
      badges: []
    };
  }
};
</script>

<style lang="scss" scoped>
.d2-badge {
  margin-bottom: 20px;
  p {
    margin: 0px;
    margin-bottom: 2px;
    &:last-child {
      margin-bottom: 0px;
    }
    img {
      display: inline-block;
      margin: 0px 2px;
    }
  }
}
</style>
