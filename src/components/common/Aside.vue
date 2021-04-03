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
          label: "菜单4",
          name: "document",
          icon: "document",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
            },
            {
              path: "/page2",
              name: "page1",
              label: "页面2",
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