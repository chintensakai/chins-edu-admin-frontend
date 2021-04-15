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
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => addVideoDialog(data)"
          >
            添加小节
          </el-button>
          <el-button type="text" size="mini" @click="() => edit(data)">
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <div>
      <el-button type="text" @click="openDialog">添加章节</el-button>
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
        <el-button type="primary" @click="submitAddCourseChapters"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="添加课时" :visible.sync="dialogFormVisibleVideo">
      <el-form :model="video">
        <el-form-item label="课时标题" :label-width="formLabelWidth">
          <el-input v-model="video.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课时排序" :label-width="formLabelWidth">
          <el-input-number
            v-model="video.sort"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="是否免费" :label-width="formLabelWidth">
          <el-radio v-model="video.isFree" label="0">免费</el-radio>
          <el-radio v-model="video.isFree" label="1">收费</el-radio>
        </el-form-item>
        <el-form-item label="上传视频" :label-width="formLabelWidth">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleVideo = false">取 消</el-button>
        <el-button type="primary" @click="submitAddCourseChaptersVideo"
          >确 定</el-button
        >
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
import { getCourseChapterById } from "@/network/chapter.js";
import { updateCourseChapters } from "@/network/chapter.js";
import { deleteCourseChapters } from "@/network/chapter.js";
import { addVideo } from "@/network/video.js";
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
      dialogFormVisibleVideo: false,
      chapter: {
        id: "",
        title: "",
        sort: "",
        courseId: "",
      },
      video: {
        id: "",
        title: "",
        isFree: 0,
        sort: 0
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    openDialog() {
      this.dialogFormVisible = true;
    },
    previous() {
      this.$router.push({ path: "/add-course/" + this.chapter.courseId });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
      this.$router.push({ path: "/publish/" + this.chapter.courseId });
    },
    submitAddCourseChapters() {
      if (this.chapter.id) {
        // 修改
        updateCourseChapters(this.chapter).then(() => {
          // 在回调里查询，否则不能查询回修改后的数据
          this.getChaptersAndVideos();
        });
      } else {
        // 增加
        addCourseChapters(this.chapter).then((res) => {
          this.chapter.id = res.data.chapterId;
          this.getChaptersAndVideos();
        });
      }
      this.dialogFormVisible = false;
      this.chapter.title = "";
      this.chapter.sort = 0;
    },
    getChaptersAndVideos() {
      getCourseChapters(this.chapter.courseId).then((res) => {
        this.chapters = res.data.chapters;
      });
    },
    edit(data) {
      this.openDialog();
      getCourseChapterById(data.id).then((res) => {
        this.chapter = res.data.chapter;
        this.chapter.id = "";
      });
    },

    remove(data) {
      console.log(data);
      deleteCourseChapters(data.id).then(() => {
        this.getChaptersAndVideos();
      });
    },

    // =========================小节video操作==============================
    addVideoDialog(data) {
      console.log(data);
      this.dialogFormVisibleVideo = true;
      this.video.chapterId = data.id
      this.video.courseId = this.chapter.courseId
    },
    submitAddCourseChaptersVideo() {
      addVideo(this.video).then(() => {
        this.getChaptersAndVideos()
      })
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

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>