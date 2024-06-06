import request from '@/utils/request'

//es6语法
//模板字符串 = `` ,可以通过${}取到常量和变量的值
//定义常量
const api_name = '/admin/system/sysRole'
export default {
  getPageList(page, limit, searchObj) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/${page}/${limit}`,
      method: 'get', //请求方式
      params: searchObj
    })
  },

  // 删除
  removeId(id) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/remove/${id}`,
      method: 'delete' //请求方式
    })
  },
  saveRole(role) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/save`,
      method: 'post', //请求方式
      // 传递json格式数据，前端需要用到data
      data: role
    })
  },

  //根据id查询
  getRoleById(id) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/findRoleById/${id}`,
      method: 'post' //请求方式
    })
  },
  // 修改
  update(sysRole) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/update`,
      method: 'post', //请求方式
      data: sysRole
    })
  },
  // 批量删除
  batchRemove(idList) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/batchRemove`,
      method: 'delete', //请求方式
      data: idList
    })
  },
  // 根据用户id查询用户已分配的角色
  getRolesByUserId(userId) {
    return request({
      url: `${api_name}/toAssign/${userId}`,
      method: 'get'
    })
  },

  // 分配角色
  assignRoles(assginRoleVo) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      data: assginRoleVo
    })
  }
}
