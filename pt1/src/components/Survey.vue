<template>
  <div>
    <el-button @click="ots">OT科</el-button>
    <el-button  @click="its" type="primary">IT科</el-button>
    <el-button  type="success">业务科</el-button>
    <br><br>
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="projectCharger"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="projectLevel"
        label="项目级别">
      </el-table-column>
      <el-table-column
        prop="projectType"
        label="项目类型">
      </el-table-column>
      <el-table-column
        prop="projectSpeed"
        label="进度">

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Survey",
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.axios('http://localhost:8089/projects',{
      params: {
        type:'survey'
      }
    }).then(res=>{
      console.log(res.data)
      this.tableData=res.data;
    })
  },
  methods: {
    ots(){
      this.$router.push('/ot')
    },
    its(){
      this.$router.push('/it')
    }
  }
}
</script>

<style scoped>

</style>
