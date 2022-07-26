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
      <el-radio-group v-model="form.radio">
        <el-radio :label="3">推文类</el-radio>
        <el-radio :label="6">游戏类</el-radio>
        <el-radio :label="9">交互类</el-radio>
      </el-radio-group>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
      v-model="form.value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </el-form-item >
 <el-form-item label="队员">
    <el-select v-model="value" placeholder="请选择队员">
    <el-option
      v-for="item in form.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
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
          value1:'',
          radio:3,
            options: [{
          value: '选项1',
          label: 'zrj'
        }, {
          value: '选项2',
          label: 'hd'
        }, {
          value: '选项3',
          label: 'lbk'
        }, {
          value: '选项4',
          label: 'ca'
        }, {
          value: '选项5',
          label: 'hhs'
        }],
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