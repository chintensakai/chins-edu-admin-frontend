<template>
  <div>
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="active"
      finish-status="success"
      simple
      style="margin-bottom: 60px"
    >
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>
    <el-tree
      class="filter-tree"
      :data="chapters"
      :props="defaultProps"
      default-expand-all
      ref="tree"
    >
    </el-tree>
    <div>
      <el-button type="text" @click="dialogFormVisible = true"
        >添加章节</el-button
      >
    </div>
    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapter">
        <el-form-item label="章节标题" :label-width="formLabelWidth">
          <el-input v-model="chapter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" :label-width="formLabelWidth">
          <el-input-number
            v-model="chapter.sort"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddCourseChapters">确 定</el-button>
      </div>
    </el-dialog>
    <el-button style="margin-top: 12px" type="primary" plain @click="previous"
      >上一步</el-button
    >
    <el-button style="margin-top: 12px" type="primary" @click="next"
      >下一步</el-button
    >
  </div>
</template>

<script>
import { getCourseChapters } from "@/network/chapter.js";
import { addCourseChapters } from "@/network/chapter.js";
export default {
  data() {
    return {
      active: 1,
      defaultProps: {
        children: "videos",
        label: "title",
      },
      courseId: "",
      chapters: [],
      dialogFormVisible: false,
      chapter: {
        title: "",
        sort: "",
        courseId: "",
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    previous() {
      this.$router.push({ path: "/add-course/" + this.chapter.courseId });
    },
    next() {
      if (this.active++ > 2) this.active = 0;

      this.$router.push({ path: "/publish/" + this.chapter.courseId });
    },
    submitAddCourseChapters() {
      addCourseChapters(this.chapter).then(() => {
        this.dialogFormVisible = false;
        this.getChaptersAndVideos()
      });
    },
    getChaptersAndVideos() {
      getCourseChapters(this.chapter.courseId).then((res) => {
        this.chapters = res.data.chapters;
      });
    },
  },
  created() {
    if (this.$route.params.id) {
      this.chapter.courseId = this.$route.params.id;
      this.getChaptersAndVideos();
    }
  },
};
</script>