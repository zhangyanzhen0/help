import api from './index.js'

const One = (id) => {
  return api.request({
    // url:`/mall/cms-subject-category/one/${id}`,
    url: '/mall/cms-subject-category/one/' + id,
    method: 'get',
  })
}
const Del = (id) => {
  return api.request({
    // url:`/mall/cms-help-category/one/${id}`,
    url: '/mall/cms-subject-category/del/' + id,
    method: 'get',
  })
}
const Edit = (data) => {
  return api.request({
    // url:`/mall/cms-help-category/one/${id}`,
    url: '/mall/cms-subject-category/edit',
    method: 'post',
    data,
  })
}

const Add = (data) => {
  return api.request({
    // url:`/mall/cms-help-category/one/${id}`,
    url: '/mall/cms-subject-category/add',
    method: 'post',
    data,
  })
}

const Page = (data) => {
  return api.request({
    // url:`/mall/cms-help-category/one/${id}`,
    url: '/mall/cms-subject-category/page',
    method: 'post',
    data,
  })
}
