<template>
  <el-Container class="home">
    <!-- 页首区域 -->
    <el-header>
      <div>
        <img src="./img/u=3024387196,1621670548&fm=27&gp=0.jpg" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-Container>
      <!-- 侧边栏区域 -->
      <el-aside :width="wid">
        <div class="aside-header" @click="getcollapse">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#1c68f9"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
        >
          <el-submenu :index="item.id+''" v-for="item in menus" :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="menuitem.id+''"
              v-for="menuitem in item.children"
              :key="menuitem.id"
            >
              <i class="el-icon-menu"></i>
              <span>{{menuitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>Main</el-main>
    </el-Container>
  </el-Container>
</template>
<script>
export default {
  data: () => ({
    menus: [],
    iconObj: {
      '125': 'iconfont icon-users',
      '103': 'iconfont icon-tijikongjian',
      '101': 'iconfont icon-shangpin',
      '102': 'iconfont icon-danju',
      '145': 'iconfont icon-baobiao'
    },
    iscollapse: false
  }),
  computed: {
    wid () {
      return this.iscollapse ? '64px' : '200px'
    }
  },
  created() {
    this.getmenus()
  },
  methods: {
    logout() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    async getmenus() {
      const {
        data: { data, meta }
      } = await this.$http.get('menus')
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.menus = data
      console.log(this.menus)
    },
    getcollapse() {
      this.iscollapse = !this.iscollapse
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      img {
        height: 80%;
        border-radius: 50%;
      }
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .aside-header {
      background-color: #4a5064;
      font-size: 10px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      // 字间距
      letter-spacing: 0.2em;
      cursor: pointer;
    }
    i {
      margin-right: 10px;
    }
    .el-menu {
      border-right: 0;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
