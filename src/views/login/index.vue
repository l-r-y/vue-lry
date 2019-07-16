<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/u=3024387196,1621670548&fm=27&gp=0.jpg" alt />
      </div>
      <!-- 表单区域 -->
      <!-- model绑定双向绑定 -->
      <!-- rulse绑定表单验证 -->
      <!-- ref 被用来给DOM元素或子组件注册引用信息。引用信息会根据父组件的 $refs 对象进行注册。如果在普通的DOM元素上使用，引用信息就是元素; 如果用在子组件上，引用信息就是组件实例
注意：只要想要在Vue中直接操作DOM元素，就必须用ref属性进行注册-->
      <el-form ref="form"  :model="login" :rules="rules" class="login">
        <!-- 用户名 -->
        <!-- prop使用表单验证 -->
        <el-form-item prop="name">
          <!-- 属性方式: icon使用字体图标  prefix-icon在最前面使用 suffix-icon在最后面使用-->
           <!-- slot 方式：   <i slot="suffix" class="el-input__icon el-icon-date"></i>-->
          <el-input prefix-icon="iconfont icon-user" v-model="login.name" placeholder="请输入账号">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-3702mima" v-model="login.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button type="primary">登录</el-button>
          <el-button class="reset" @click='reset'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    login: {
      name: 'zs',
      password: '123456'
    },
    rules: {
      name: [
        { required: true, message: '请输入登录名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
      ]
    }
  }),
  methods: {
    reset () {
      // resetFields()表单重置方法
      this.$refs.form.resetFields()
      this.login.name = this.login.password = ''
      // console.log(this)
    }
  }
}
</script>
<style lang='less' scoped>
.login_container {
  background: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 5px;
    .avatar_box {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      box-shadow: 0 0 10px #666;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .login {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    width: 250px;
    .login-button {
      display: flex;
      justify-content: space-between;
      .reset {
        flex: 1;
        margin-left: 30px;
      }
    }
  }
}
</style>
