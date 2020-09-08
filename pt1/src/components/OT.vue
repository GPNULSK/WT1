<template>
  <div>

    <el-button>OT科</el-button>
    <el-button  @click="toIt" type="primary">IT科</el-button>
    <el-button @click="toSurvey" type="success">业务科</el-button>
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
  name: "OT",
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.axios('http://localhost:8089/projects',{
      params: {
        type:'OT'
      }
    }).then(res=>{
      console.log(res.data)
      this.tableData=res.data;
    })
  },
  methods: {
    toIt(){
      this.$router.push('/it')
    },
    toSurvey(){
      this.$router.push('/survey')
    }
  }
}
</script>

<style scoped>

</style>
