<template>
  <div>
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="active" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px" type="primary" plain @click="previous"
      >上一步</el-button
    >
    <el-button style="margin-top: 12px" type="primary" @click="next"
      >下一步</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
    };
  },

  methods: {
    previous() {
      this.$router.push({ path: "/add-course/1" });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
      this.$router.push({ path: "/publish/1" });
    },
  },
};
</script>