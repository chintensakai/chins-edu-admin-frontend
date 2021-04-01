<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="讲师姓名">
      <el-input v-model="formInline.name" placeholder="讲师姓名"></el-input>
    </el-form-item>
    <el-form-item label="头衔">
      <el-select v-model="formInline.level" placeholder="头衔">
        <el-option label="首席讲师" value="1"></el-option>
        <el-option label="高级讲师" value="2"></el-option>
        <el-option label="中级讲师" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { searchTeacherByCondition } from "@/network/teacher.js";

export default {
  name: "TeacherSearchForm",
  data() {
    return {
      formInline: {
        name: "",
        level: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      searchTeacherByCondition({
        name: this.formInline.name,
        level: this.formInline.level,
      }).then((res) => {
        console.log(res.data.items)

        this.$emit("searchTeacherByCondition", res.data.items);
      });
    },
  },
};
</script>