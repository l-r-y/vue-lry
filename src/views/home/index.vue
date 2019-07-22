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
        <!-- 控制侧边栏伸缩 -->
        <div class="aside-header" @click="getcollapse">|||</div>
        <el-menu
          background-color="#333743"
          text-color="#fff"
          :default-active="activepath"
          active-text-color="#409Eff"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          router
        >
          <!-- unique-opened是否只保持一个子菜单的展开 -->
          <!-- collapse控制侧边栏伸缩 -->
          <!-- collapse-transition侧边栏伸缩动画 -->

          <!-- 遍历数据渲染侧边栏列表 -->
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menus" :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+menuitem.path"
              v-for="menuitem in item.children"
              :key="menuitem.id"
              @click="saveNavState('/'+menuitem.path)"
            >
              <i class="el-icon-menu"></i>
              <span>{{menuitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <!-- 占位符 -->
        <router-view></router-view>
      </el-main>
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
    iscollapse: false,
    activepath: ''
  }),
  computed: {
    // 使用计算属性计算侧边栏的宽
    wid() {
      return this.iscollapse ? '64px' : '200px'
    }
  },
  created() {
    // 使用生命周期调用初始渲染函数
    this.getmenus()
    this.activepath = sessionStorage.getItem('activepath')
  },
  methods: {
    // 退出函数 点击删除本地储存跳转到登录页面
    logout() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    // 初始渲染请求 使用es7方法
    async getmenus() {
      const {
        data: { data, meta }
      } = await this.$http.get('menus')
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.menus = data
      // console.log(this.menus)
    },
    getcollapse() {
      this.iscollapse = !this.iscollapse
    },
    saveNavState(activepath) {
      sessionStorage.setItem('activepath', activepath)
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
        margin-left: 10px;
      }
      span {
        margin: 15px;
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
