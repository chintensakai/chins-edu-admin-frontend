<template>
  <div>
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="active" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>
    <div style="height: 20px"></div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="课程标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <!-- 讲师 -->
      <el-form-item label="讲师">
        <el-select v-model="form.teacherId" placeholder="请选择讲师">
          <el-option
            v-for="teacher in teachers"
            :key="teacher.id"
            :value="teacher.id"
            :label="teacher.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 所属分类 -->
      <el-form-item label="课程分类">
        <el-select
          v-model="form.subjectParentId"
          placeholder="一级分类"
          @change="changeChildren"
        >
          <el-option
            v-for="subject in subjects"
            :key="subject.id"
            :value="subject.id"
            :label="subject.label"
          ></el-option> </el-select
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <el-select v-model="form.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in childrenSubjects"
            :key="subject.id"
            :value="subject.id"
            :label="subject.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时数">
        <el-input-number
          v-model="form.lessonNum"
          controls-position="right"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          v-model="form.price"
          controls-position="right"
          :precision="2"
          :min="1"
          :max="100"
        ></el-input-number>
        元
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input
          type="textarea"
          :rows="5"
          v-model="form.description"
        ></el-input>
      </el-form-item>
      <!-- 封面 -->
    </el-form>
    <el-button style="margin-top: 12px" type="primary" @click="next"
      >下一步</el-button
    >
  </div>
</template>

<script>
import { addCourseInfo } from "@/network/course.js";
import { getCourseInfoById } from "@/network/course.js";
// import { updateCourseInfo } from "@/network/course.js";
import { getAllTeacherPage } from "@/network/teacher.js";
import { getAllSubjectTree } from "@/network/subject.js";
export default {
  data() {
    return {
      active: 0,
      form: {
        teacherId: "",
        subjectId: "",
        subjectParentId: "",
        title: "",
        price: 0.0,
        lessonNum: 0,
        description: "",
        cover:
          "beijing.aliyuncs.com/2020/05/13/7977da8dcca4445da521a1c420e49bf8java.jpg",
      },
      teachers: [],
      subjects: [],
      childrenSubjects: [],
    };
  },
  methods: {
    init() {
      if (this.$route.params.id) {
        // 上一步返回，回显信息
        getCourseInfoById(this.$route.params.id).then((res) => {
          this.form = res.data.courseInfo;
          getAllSubjectTree().then((res) => {
            this.subjects = res.data.subjects;
            this.subjects
              .filter((p) => p.id == this.form.subjectParentId)
              .forEach((s) => {
                this.childrenSubjects = s.children;
              });
          });
          getAllTeacherPage(0, 0).then((res) => {
            this.teachers = res.data.items;
          });
        });
      } else {
        this.form = {
          teacherId: "",
          subjectId: "",
          subjectParentId: "",
          title: "",
          price: 0.0,
          lessonNum: 0,
          description: "",
          cover:
            "beijing.aliyuncs.com/2020/05/13/7977da8dcca4445da521a1c420e49bf8java.jpg",
        };
        // 添加
        getAllTeacherPage(0, 0).then((res) => {
          this.teachers = res.data.items;
        });
        getAllSubjectTree().then((res) => {
          this.subjects = res.data.subjects;
        });
      }
    },
    next() {
      if (this.active++ > 2) this.active = 0;
      addCourseInfo(this.form).then((res) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.$router.push({ path: "/chapter/" + res.data.courseId });
      });
    },
    changeChildren(value) {
      for (let i = 0; i < this.subjects.length; i++) {
        if (this.subjects[i].id === value) {
          this.childrenSubjects = this.subjects[i].children;
          //   选择一级之后，清空二级
          this.form.subjectId = "";
        }
      }
    },
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      console.log(to + from);
      // 路由变化
      this.init();
    },
  },
};
</script>