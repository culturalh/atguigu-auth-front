<template>
  <div class="app-container">
    角色列表
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input
                style="width: 100%"
                v-model="searchObj.roleName"
                placeholder="角色名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display: flex">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="fetchData()"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetData"
            >重置</el-button
          >
        </el-row>
      </el-form>
    </div>
    <!-- 工具条 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add"
        >添 加</el-button
      >
      <el-button class="btn-add" size="mini" @click="batchRemove()"
        >批量删除</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scope.row.id)"
            title="修改"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeDataById(scope.row.id)"
            title="删除"
          />
          <el-button
            type="warning"
            icon="el-icon-baseball"
            size="mini"
            @click="showAssignAuth(scope.row)"
            title="分配权限"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
    <!-- 弹框 -->
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="dataForm"
        :model="sysRole"
        label-width="150px"
        size="small"
        style="padding-right: 40px"
      >
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogVisible = false"
          size="small"
          icon="el-icon-refresh-right"
          >取 消</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-check"
          @click="saveOrUpdate()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 引入定义的接口的js文件
import api from '@/api/system/role'
export default {
  // 定义初始值
  data() {
    return {
      listLoading: false, // 是否显示加载
      list: [], // 角色列表
      total: 0, // 总记录数
      page: 1, // 当前页
      limit: 3, // 每页默认显示3条数据
      searchObj: {}, // 条件查询封装对象
      dialogVisible: false, // 是否弹框
      sysRole: {}, // 封装添加表单的数据
      selectValue: [] // 复选框选
    }
  },
  // 页面渲染之前执行
  created() {
    // 调用列表方法，一进入页面就调用方法得到数据
    this.fetchData()
  },
  methods: {
    // 展现分配的权限
    showAssignAuth(row) {
      this.$router.push(
        '/system/assignAuth?id=' + row.id + '&roleName=' + row.roleName
      )
    },

    // 复选框发生变化时执行的方法
    handleSelectionChange(selection) {
      this.selectValue = selection
      // console.log(this.selectValue)
    },

    //批量删除
    batchRemove() {
      //判断复选框是否为空
      if (this.selectValue.length == 0) {
        this.$message.warning('请选择要删除的记录！')
        return
      } else {
        var idList = []
        //获取id值
        //遍历数组
        for (let i = 0; i < this.selectValue.length; i++) {
          let obj = this.selectValue[i]
          let id = obj.id
          idList.push(id)
        }
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 调用方法删除
          api.batchRemove(idList).then((response) => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.fetchData()
          })
        })
      }
    },

    // 点击确定
    saveOrUpdate() {
      //判断是添加还是修改
      if (!this.sysRole.id) {
        // 调用添加方法
        this.saveRole()
      } else {
        this.updateRole()
      }
    },
    // 点击修改-数据回显
    edit(id) {
      api.getRoleById(id).then((response) => {
        this.dialogVisible = true
        this.sysRole = response.data
      })
    },
    //修改方法
    updateRole() {
      api.update(this.sysRole).then((response) => {
        //提示信息
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        //关闭弹窗
        this.dialogVisible = false
        //刷新数据
        this.fetchData()
      })
    },

    // 保存方法
    saveRole() {
      // 调用api方法
      api.saveRole(this.sysRole).then((response) => {
        //提示信息
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        //关闭弹窗
        this.dialogVisible = false
        //刷新数据
        this.fetchData()
      })
    },

    // 点击添加,弹出框
    add() {
      this.dialogVisible = true
      this.sysRole = {}
    },
    // 删除
    removeDataById(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用方法删除
        api.removeId(id).then((response) => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新页面
          this.fetchData()
        })
      })
    },

    //重置
    resetData() {
      //清空单元格
      this.searchObj = {}
      //重新查询
      this.fetchData()
    },

    fetchData(pageNum = 1) {
      this.page = pageNum
      // 调用api
      // console.log(this.searchObj)
      api
        .getPageList(this.page, this.limit, this.searchObj)
        .then((response, error) => {
          // debugger
          // this.listLoading = false
          // console.log(response)
          // console.log(response.data)
          this.list = response.data.records
          this.total = response.data.total
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }
}
</script>
@/api/system/role
