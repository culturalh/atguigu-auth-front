import request from '@/utils/request'

//es6语法
//模板字符串 = `` ,可以通过${}取到常量和变量的值
//定义常量
const api_name = '/admin/system/sysUser'
export default {
  //列表
  getPageList(page, limit, searchObj) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/${page}/${limit}`,
      method: 'get', //请求方式
      params: searchObj
    })
  },

  //增加
  saveUser(user) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/save`,
      method: 'post', //请求方式
      // 传递json格式数据，前端需要用到data
      data: user
    })
  },
  //根据id查询
  getUserById(id) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/get/${id}`,
      method: 'get' //请求方式
    })
  },
  // 修改
  update(user) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/update`,
      method: 'post', //请求方式
      data: user
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
  // 更改用户状态
  updateStatus(id, status) {
    return request({
      //定义接口路径
      // url: '/admin/system/sysRole/' + page + "/" + limit,
      url: `${api_name}/updateStatus/${id}/${status}`,
      method: 'get' //请求方式
    })
  }
}
