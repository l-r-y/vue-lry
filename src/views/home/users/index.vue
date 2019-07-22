<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- 搜索框 -->
          <!-- clear事件在点击由 clearable 属性生成的清空按钮时触发 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getInput">
            <el-button slot="append" icon="el-icon-search" @click="getInput"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户框 -->
        <el-col :span="4">
          <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userdata" border style="width: 100%">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
            <!-- {{scope.row}} -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="getdata(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="true">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户区域 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addruleForm" :rules="addrules" ref="addRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisible">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 编辑用户区域 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible" width="50%">
      <el-form :model="editruleForm" :rules="editrules" ref="editRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editruleForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 表格数据
      userdata: [],
      // 分页数据
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total: 0,
      input: '',
      // 控制对话框弹出的变量
      addFormVisible: false,
      // 添加用户的表单数据
      addruleForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      // 添加用户的表单验证
      addrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editFormVisible: false,
      // 编辑用户的表单数据
      editruleForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      // 编辑用户的表单验证
      editrules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  // 生命周期
  created() {
    // 调用初始渲染函数
    this.getuser()
  },
  methods: {
    // 初始数据渲染函数
    async getuser() {
      const {
        data: { data, meta }
      } = await this.$http.get('users', {
        params: this.queryInfo
      })
      // console.log(data)
      if (meta.status !== 200) return this.$message.error(meta.msg)
      // this.$message.success(meta.msg)
      this.userdata = data.users
      this.total = data.total
    },
    // 修改当前页数据条数函数
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getuser()
    },
    // 修改当前页函数
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getuser()
    },
    // 用户状态修改函数
    async userStateChanged(val) {
      const {
        data: { meta }
      } = await this.$http.put(`users/${val.id}/state/${val.mg_state}`)
      // console.log(val)
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.$message.success(meta.msg)
    },
    // 搜索函数
    getInput(val) {
      this.getuser()
    },
    // 监听添加用户框关闭事件
    addDialogClosed() {
      this.$refs.addRef.resetFields()
    },
    // 添加用户
    addVisible() {
      this.$refs.addRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('users', this.addruleForm)

        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }

        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addFormVisible = false
        // 重新获取用户列表数据
        this.getuser()
      })
    },
    // 点击编辑按钮获取当前项id
    async getdata(val) {
      this.editFormVisible = true
      const { data: { data, meta } } = await this.$http.get(`users/${val}`)
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.editruleForm = data
      // console.log(this.editruleForm)
    },
    // 表单预验证
    edituser() {
      this.$refs.editRef.validate(async valid => {
        if (!valid) return
        const { data: { meta } } = await this.$http.put('users/' + this.editruleForm.id, this.editruleForm)
        if (meta.status !== 200) return this.$message.error(meta.msg)
        this.$message.success(meta.msg)
        this.editFormVisible = false
        this.getuser()
      })
    },
    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getuser()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
