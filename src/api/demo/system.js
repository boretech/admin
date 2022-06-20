import { defHttp } from '@/utils/http/index.js'

const Api = {
  AccountList: '/system/getAccountList',
  IsAccountExist: '/system/accountExist',
  DeptList: '/system/getDeptList',
  setRoleStatus: '/system/setRoleStatus',
  MenuList: '/system/getMenuList',
  RolePageList: '/system/getRoleListByPage',
  GetAllRoleList: '/system/getAllRoleList',
}

export const getAccountList = (params) => defHttp.get({ url: Api.AccountList, params })

export const getDeptList = (params) => defHttp.get({ url: Api.DeptList, params })

export const getMenuList = (params) => defHttp.get({ url: Api.MenuList, params })

export const getRoleListByPage = (params) => defHttp.get({ url: Api.RolePageList, params })

export const getAllRoleList = (params) => defHttp.get({ url: Api.GetAllRoleList, params })

export const setRoleStatus = (id, status) => defHttp.post({ url: Api.setRoleStatus, params: { id, status } })

export const isAccountExist = (account) => defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' })