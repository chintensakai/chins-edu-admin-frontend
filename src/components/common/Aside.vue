<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- <el-menu-item
        :index="item.path"
        v-for="item in noChildren"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item> -->
      <el-submenu
        :index="item.name"
        v-for="(item, index) in hasChildren"
        :key="index"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            {{ subItem.label }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      asideMenu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "home",
        },
        {
          name: "menu",
          label: "讲师管理",
          icon: "menu",
          children: [
            {
              path: "/teachers",
              name: "teachers",
              label: "所有讲师",
            },
            {
              path: "/teacher-form",
              name: "teacher-form",
              label: "添加讲师",
            },
          ],
        },
        {
          path: "/nemu3",
          name: "document",
          label: "菜单3",
          icon: "document",
        },
        {
          label: "课程分类管理",
          name: "document",
          icon: "document",
          children: [
            {
              path: "/subjects",
              name: "subjects",
              label: "所有课程分类",
            },
            {
              path: "/add-subject",
              name: "add-subject",
              label: "添加课程分类",
            },
          ],
        },
        {
          label: "课程管理",
          name: "course",
          icon: "document",
          children: [
            {
              path: "/courses",
              name: "course",
              label: "所有课程",
            },
            {
              path: "/add-course",
              name: "add-course",
              label: "添加课程",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.asideMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asideMenu.filter((item) => item.children);
    },
  },
  methods: {
    clickMenu(item) {
      this.$store.commit("selectMenu", item);
    },
  },
};
</script>

<style scoped>
.el-menu {
  height: 100vh;
  border: none;
}
</style>