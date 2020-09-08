<template>

  <div>

    <div>
      <el-button @click='toAddProject' style="margin-left: 1170px" type="primary">添加项目</el-button>
    </div>
    <el-table
      :data="tableData"
      height="250"
      style="width: 100%">
      <el-table-column
        prop="projectName"
        label="项目名"
        width="180">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editProject(scope.row.id)" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    //隐藏的表格-->
    <el-dialog :visible.sync="formVisible" >
      <el-table
        :data="projectData"
        style="width: 100%"
        max-height="500">
        <el-table-column
          prop="id"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pdescription"
          label="进度描述"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pspeed"
          label="完成进度:百分比%">
        </el-table-column>
      </el-table>
      <el-button round @click="addSpeed()">添加进度</el-button>
      <el-button @click="projectFinish" round type="success">归  档</el-button>
    </el-dialog>

<!--    隐藏添加进度框-->
  <el-dialog :visible.sync="addVisible" :rules="rules" ref="addForm">
    <el-form :model="addForm" label-width="80px">
      <el-form-item label="进度内容" prop="content">
        <el-input v-model="addForm.content"></el-input>
      </el-form-item>
      <br><br>
      <el-form-item label="完成比例%" prop="speed">
        <el-input v-model="addForm.speed" type="number"></el-input>
      </el-form-item>
      <el-button @click="speedSubmit"  type="success">添加进度</el-button>
    </el-form>
  </el-dialog>

<!--    隐藏的添加项目输入框-->
    <el-dialog :visible.sync="addProjectVisible">
      <el-form :model="addProjectForm" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="addProjectForm.projectName"></el-input>
        </el-form-item>

        <el-form-item label="项目类型">
          <el-select v-model="addProjectForm.type" placeholder="请选择项目类型">
            <el-option label="IT" value="IT"></el-option>
            <el-option label="OT" value="OT"></el-option>
            <el-option label="业务" value="业务"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="addProjectForm.projectCharger"></el-input>
        </el-form-item>

        <el-form-item label="项目级别">
          <el-select v-model="addProjectForm.level" placeholder="请选择项目级别">
            <el-option label="一级" value="一级"></el-option>
            <el-option label="二级" value="二级"></el-option>
            <el-option label="三级" value="三级 "></el-option>
          </el-select>
        </el-form-item>

        <el-button @click="addProject"   type="success">添加项目</el-button>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "profile",
  data(){
    return {
      addProjectVisible:false,
      tableData:[],
      projectData:[],
      formVisible:false,
      addForm:{},
      addVisible:false,
      content:'',
      speed: '',
      rules:{
        content:[{required: true,message:'请补充进度内容'}]
      },
      addProjectForm:{
        projectName:'',
        type:'',
        projectCharger:'',
        level:''
      },

    }
  },
  created() {
    this.axios('http://localhost:8089/selectByUid',{
      params: {
        uid:sessionStorage.getItem('id')
     }
    }).then(res=>{
      this.tableData=res.data;
    })
  },
  methods: {
    editProject(id){
      this.axios('http://localhost:8089/detail',{
        params: {
          id:id
        }
      }).then(res=>{
        console.log(res.data);
        sessionStorage.setItem('curId',id);
        this.projectData=res.data;
        this.formVisible=true;
      })
    },
    addSpeed(){
      this.formVisible=false;
      this.addVisible=true;
    },

    speedSubmit(){
      this.axios('http://localhost:8089/add',{
        params: {
          pid:sessionStorage.getItem('curId'),
          description:this.addForm.content,
          percentage:this.addForm.speed
        }
      }).then(res=>{
        if(res.data!=null){
          this.addVisible=false;
          this.$message({
            message:'添加成功',
            type:"success"
          })
          this.$router.go(0)
        }
      })
    },

    projectFinish(){
      this.axios('http://localhost:8089/add',{
        params:{
          pid:sessionStorage.getItem('curId'),
          description:'恭喜！项目完成',
          percentage:100
        }
      }).then(res=>{
        if(res.data!=null){
          this.$message({
            message:'恭喜！项目完成了！',
            type:"success"
          })
          this.$router.go(0)
        }
      })
    },

    toAddProject(){
      this.addProjectVisible=true;
    },

    addProject(){
      this.axios('http://localhost:8089/addProject',{
        params: {
          uid:sessionStorage.getItem('id'),
          projectName:this.addProjectForm.projectName,
          projectType:this.addProjectForm.type,
          projectCharger:this.addProjectForm.projectCharger,
          projectLevel:this.addProjectForm.level
        }
      }).then(res=>{
        alert(res.data)
        if(res.data=='success'){
          this.$message({
            message:'添加成功',
            type:"success"
          })
        }
      })
    }


  }
}
</script>

<style scoped>

</style>
