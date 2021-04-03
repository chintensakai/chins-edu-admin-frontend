<template>
  <div>
    <TeacherSearchForm
      @searchTeacherByCondition="showSearchRes"
    ></TeacherSearchForm>
    <el-table :data="teacherList" style="width: 100%" stripe>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.career }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头衔" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.level == 1 ? "首席讲师" : "高级讲师" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简介" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.intro }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      @prev-click="prevClick"
      @next-click="nextClick"
      @current-change="currentChange"
      :current-page.sync="current"
    >
    </el-pagination>
    <el-button type="text" v-show="false"></el-button>
  </div>
</template>

<script>
import { getAllTeacherPage } from "@/network/teacher.js";
import { deletebyId } from "@/network/teacher.js";
import TeacherSearchForm from "@/components/teacher/TeacherSearchForm.vue";
export default {
  name: "Teacher",
  components: {
    TeacherSearchForm,
  },
  data() {
    return {
      teacherList: [],
      current: 1,
      size: 10,
      total: 0,
    };
  },
  methods: {
    showTeacherList() {
      getAllTeacherPage(this.current, this.size).then((res) => {
        this.teacherList = res.data.items.records;
        this.total = res.data.items.total;
      });
    },
    showSearchRes(searchResult) {
      console.log(searchResult);
      // 接受子组件搜索的结果
      this.teacherList = searchResult;
      this.total = searchResult.total;
    },
    handleDelete(id) {
      this.$confirm("此操作将删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletebyId(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.showTeacherList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    prevClick() {
      this.current -= 1;
      this.showTeacherList();
    },
    nextClick() {
      this.current += 1;
      this.showTeacherList();
    },
    currentChange() {
      console.log("sssss")
      this.showTeacherList();
    }
  },
  created() {
    this.showTeacherList();
  },
};
</script>