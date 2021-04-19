<template>
  <div>
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="active" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>
    <div class="publishCourse">
      <img :src="publishCourse.cover" />
      <div class="main">
        <h2>{{ publishCourse.title }}</h2>
        <p>
          <span>共{{ publishCourse.lessonNum }}课时</span>
        </p>
        <p>
          <span
            >所属分类：{{ publishCourse.parentSubjectName }} -
            {{ publishCourse.subSubjectName }}</span
          >
        </p>
        <p>课程讲师：{{ publishCourse.teacherName }}</p>
        <h3>￥{{ publishCourse.price }}</h3>
      </div>
    </div>
    <el-button style="margin-top: 12px" type="primary" plain @click="previous"
      >上一步</el-button
    >
    <el-button style="margin-top: 12px" type="primary" @click="next"
      >发布课程</el-button
    >
  </div>
</template>

<script>
import { getPublishCourseInfo } from "@/network/course.js";
import { publishCourse } from "@/network/course.js";
export default {
  data() {
    return {
      active: 2,
      courseId: "",
      publishCourse: {
        id: "",
        title: "",
        cover: "",
        description: "",
        lessonNum: 0,
        parentSubjectName: "",
        subSubjectName: "",
        teacherName: "",
        price: "",
      },
    };
  },

  methods: {
    showPublishCourseInfo() {
      getPublishCourseInfo(this.courseId).then((res) => {
        this.publishCourse = res.data.courseInfo;
      });
    },
    previous() {
      this.$router.push({ path: "/chapter/" + this.courseId });
    },
    next() {
      publishCourse(this.courseId).then(() => {
        this.$router.push({ path: "/course" });
      });
    },
  },
  created() {
    if (this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.showPublishCourseInfo(this.courseId);
    }
  },
};
</script>

<style scoped>
.publishCourse {
  background-color: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #ddd;
  margin-bottom: 40px;
  position: relative;
}

.publishCourse img {
  background-color: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}

.publishCourse .main {
  margin-left: 520px;
}

.publishCourse .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}

.publishCourse .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}

.publishCourse .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>