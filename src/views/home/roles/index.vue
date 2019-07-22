<template>
  <div class="roles">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <!-- 表格区域 -->
      <el-table :data="roles" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1,index1) in scope.row.children"
              :key="item1.id"
              :class="['bottombd',index1==0?'topbd':'']" class="bdcontent"
            >
              <!-- 一级权限 -->
              <el-col :span="5" >
                <el-tag closable >{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right "></i>
              </el-col>
              <!-- 二级权限和三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2,index2) in item1.children"
                  :key="item2.id"
                  :class="['topbd',index2==0?'topwu':'']" class="bdcontent"
                >
                  <el-col :span="6">
                    <el-tag type="success" closable>{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" closable v-for="(item3,index3) in item2.children"
                  :key="item3.id">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>{{scope.row}}</pre> -->
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="true">
              <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    roles: []
  }),
  created() {
    this.getRoles()
  },
  methods: {
    async getRoles() {
      const {
        data: { data, meta }
      } = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.roles = data
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bottombd {
  border-bottom: 1px solid #eee;
}
.topbd {
  border-top: 1px solid #eee;
}
.topwu {
  border-top: 0;
}
.bdcontent {
 display: flex;
align-items: center;
}
</style>
