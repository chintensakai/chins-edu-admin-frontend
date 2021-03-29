<template>
  <div class="home">
    <el-container>
      <el-aside width="200px"><Aside></Aside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/common/Header.vue"
import Aside from "@/components/common/Aside.vue"

export default {
  name: "Home",
  components: {
    Header,
    Aside
  },
};
</script>

<style scoped>
.el-header {
  background: #f3f3f3;
  /* border-bottom: 1px solid #f3f3f3; */
}
.el-main {
  padding: 5;
}
</style>
