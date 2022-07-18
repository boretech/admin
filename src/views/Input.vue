<template>
  <div class="hd">
    <el-form class="form" ref="form" :model="form" label-width="80px">
      <el-form-item label="负责人">
        <el-input v-model="form.name" class="input" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phont" maxlength="11" class="input" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.project" class="input" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目地址">
        <el-input v-model="form.address"  class="input" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="推文类" name="type"></el-checkbox>
          <el-checkbox label="游戏类" name="type"></el-checkbox>
          <el-checkbox label="展示类" name="type"></el-checkbox>
          <el-checkbox label="交互类" name="type"></el-checkbox>
          <el-checkbox label="登记类" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        form:{
          name:'',
          phone:'',
          address:'',
          project:'',
          type:[],
        }
        
      }
    }
  }
</script>

<style>
.hd {
  width: 600px;
  height: 600px;
  border: 1px solid #fff;
  margin: 100px auto;
}
.form {
  padding: 20px;
}
.input {
  margin-bottom: 20px;
}
</style>