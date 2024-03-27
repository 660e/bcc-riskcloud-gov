import http from '@/api';
import qs from 'qs';
import { ResPage } from '@/api/interface/index';
import { fd } from '@bcc/utils';

/**
 * 角色管理
 */

// 新增角色
export function createRole(params: any) {
  return http.post('/system/role', params);
}

// 删除角色
export function deleteRole(id: string) {
  return http.delete(`/system/role/${id}`);
}

// 编辑角色
export function editRole(params: any) {
  return http.put('/system/role', params);
}

// 获取角色列表
export function getRoleList(params: any = {}) {
  return http.get<ResPage<any>>('/system/role/list', params);
}

// 获取已授权用户列表
export function allocatedList(params: any = {}) {
  return http.get<ResPage<any>>('/system/role/authUser/allocatedList', params);
}

// 获取未授权用户列表
export function unallocatedList(params: any = {}) {
  return http.get<ResPage<any>>('/system/role/authUser/unallocatedList', params);
}

// 批量授权
export function authUserSelectAll(params: any) {
  return http.put(`/system/role/authUser/selectAll?${qs.stringify(params)}`);
}

// 取消授权
export function authUserCancel(params: any) {
  return http.put('/system/role/authUser/cancel', params);
}

// 导出角色列表
export function exportRoleList(params: any = {}) {
  return http.download('/system/role/export', fd(params));
}

/**
 * 用户管理
 */

// 新增用户
export function createUser(params: any) {
  return http.post('/system/user', params);
}

// 删除用户
export function deleteUser(userId: string) {
  return http.delete(`/system/user/${userId}`);
}

// 编辑用户
export function editUser(params: any) {
  return http.put('/system/user', params);
}

// 获取用户
export function getUser(userId: string) {
  return http.get(`/system/user/${userId}`);
}

// 获取用户列表
export function getUserList(params: any = {}) {
  return http.get<ResPage<any>>('/system/user/list', params);
}

// 重置密码
export function resetPwd(params: any) {
  return http.put('/system/user/resetPwd', params);
}

// 获取当前用户详细信息
export function getInfo() {
  return http.get('/system/user/getInfo');
}

// 导入用户列表 - 模板
export function importTemplate() {
  return http.download('/system/user/importTemplate');
}

// 导入用户列表
export function importUserData(updateSupport: boolean, params: any = {}) {
  return http.post(`/system/user/importData?updateSupport=${updateSupport}`, fd(params));
}

// 导出用户列表
export function exportUserList(params: any = {}) {
  return http.download('/system/user/export', fd(params));
}

/**
 * 菜单管理
 */

// 新增菜单
export function createMenu(params: any) {
  return http.post('/system/menu', params);
}

// 删除菜单
export function deleteMenu(menuId: string) {
  return http.delete(`/system/menu/${menuId}`);
}

// 编辑菜单
export function editMenu(params: any) {
  return http.put('/system/menu', params);
}

// 获取菜单列表
export function getMenuList(params: any = {}) {
  return http.get<any>('/system/menu/list', params);
}

// 获取菜单列表（树结构）
export function treeselect() {
  return http.get('/system/menu/treeselect');
}

// 根据角色查询菜单信息
export function roleMenuTreeselect(roleId: string) {
  return http.get(`/system/menu/roleMenuTreeselect/${roleId}`);
}

/**
 * 字典管理
 */

// 新增字典类型
export function createDictType(params: any) {
  return http.post('/system/dict/type', params);
}

// 删除字典类型
export function deleteDictType(dictId: string) {
  return http.delete(`/system/dict/type/${dictId}`);
}

// 编辑字典类型
export function editDictType(params: any) {
  return http.put('/system/dict/type', params);
}

// 获取字典类型
export function getDictType(dictId: string | string[]) {
  return http.get<any>(`/system/dict/type/${dictId}`);
}

// 获取字典类型列表
export function getDictTypeList(params: any = {}) {
  return http.get<ResPage<any>>('/system/dict/type/list', params);
}

// 获取字典类型列表（下拉）
export function optionselect() {
  return http.get<any>('/system/dict/type/optionselect');
}

// 刷新缓存
export function refreshDictTypeCache() {
  return http.delete('/system/dict/type/refreshCache');
}

// 导出字典类型列表
export function exportDictTypeList(params: any = {}) {
  return http.download('/system/dict/type/export', fd(params));
}

// 新增字典数据
export function createDictData(params: any) {
  return http.post('/system/dict/data', params);
}

// 删除字典数据
export function deleteDictData(dictCode: string) {
  return http.delete(`/system/dict/data/${dictCode}`);
}

// 编辑字典数据
export function editDictData(params: any) {
  return http.put('/system/dict/data', params);
}

// 获取字典数据内容
export function getDictDataType(dictType: string) {
  return http.get(`/system/dict/data/type/${dictType}`);
}

// 获取字典数据列表
export function getDictDataList(params: any = {}) {
  return http.get<ResPage<any>>('/system/dict/data/list', params);
}

// 导出字典数据列表
export function exportDictDataList(params: any = {}) {
  return http.download('/system/dict/data/export', fd(params));
}
