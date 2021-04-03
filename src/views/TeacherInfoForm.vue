<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="讲师名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="form.level" placeholder="请选择讲师头衔">
          <el-option label="首席讲师" value="1"></el-option>
          <el-option label="高级讲师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="form.career"></el-input>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input type="textarea" :rows="8" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="uploadFile"
          list-type="picture"
          :multiple="false"
          show-file-list
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addTeacher } from "@/network/teacher.js";
import { getTeacherById } from "@/network/teacher.js";
import { updateTeacher } from "@/network/teacher.js";

export default {
  data() {
    return {
      form: {
        name: "",
        level: "",
        career: "",
        intro: "",
        avatar: "",
      },
      // url应该在配置文件中导出
      uploadUrl: "http://localhost:8002/service.oss/upload-file",
    };
  },
  computed: {
    level() {
      return this.form.level == 1 ? "首席讲师" : "高级讲师";
    },
  },
  methods: {
    init() {
      if (this.$route.params.id) {
        getTeacherById(this.$route.params.id).then((res) => {
          // 结构赋值
          this.form = res.data.teacher;
        });
      } else {
        this.form = {};
      }
    },
    onSubmit() {
      if (this.form.id) {
        updateTeacher(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.$router.replace({ path: "/teachers" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "修改失败!",
            });
          });
      } else {
        addTeacher(this.form)
          .then(() => {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.$router.replace({ path: "/teachers" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              messaFge: "添加失败!",
            });
          });
      }
    },
    uploadFile(response, file, fileList) {
      // console避免eslint
      console.log(file)
      console.log(fileList)
      if (response.code == 20000) {
        this.form.avatar = response.data.url;
      }
    },
  },
  // created只会执行一次
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