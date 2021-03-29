<template>
  <header>
    <div class="l-content">
      <!-- 面包屑 -->
      <el-button
        type="primary"
        icon="el-icon-menu"
        circle
        size="mini"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <!-- 放头像，下拉菜单效果 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">sss</span>
        <img src="" alt="" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      // avatar: require(),
    };
  },
  computed: {
    ...mapState({
        current: state => state.breadcrumb.currentMenu
    }),
  },
};
</script>

<style scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.l-content {
  display: flex;
  align-items: center;
}

.el-button {
  margin-right: 20px;
}
</style>

<style>
/* .el-breadcrumb__inner a, .el-breadcrumb__inner.is_link {
    color: #fff;
} */
</style>