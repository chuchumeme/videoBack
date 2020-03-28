/**   
 * api接口统一管理
 */
import { get, post } from './https'

export const apiAdmin = p => post('/admin/admin/getadminlist', p);
export const apiAddBook = p => post('/admin/book/addbook', p);
export const apiBook = p => post('/admin/book/getbooklist', p);
export const apiEditBook = p => post('/admin/book/editbook', p);
export const apiDelBook = p => post('/admin/book/deletebook', p);
export const apiCategory = p => post('/admin/category/getcatelist', p);
export const apiAddCate = p => post('admin/category/addcategory', p);
export const apiEditCate = p => post('admin/category/editcategory', p);
export const apiDelCate = p => post('admin/category/deletecate', p);
export const apiUser = p => post('/admin/user/getuserlist', p);
export const apiWash = p => post('/admin/wash/getwashlist', p);
export const apiDelWash = p => post('/admin/wash/delwash', p);
export const apiBanner = p => post('/admin/banner/getbannerlist', p);
export const apiAddBanner = p => post('/admin/banner/addbanner', p);
export const apiEditBanner = p => post('/admin/banner/editbanner', p);
export const apiDelBanner = p => post('/admin/banner/delbanner', p);
export const apiCollection = p => post('/admin/collection/getcollectionlist', p);
export const apiOrder = p => post('/admin/order/getorderlist', p);
export const apiComment = p => post('/admin/comment/getcommentlist', p);
export const apiReserve = p => post('/admin/reserve/getreservelist', p);
export const apiLocal = p => post('/admin/local/getlocallist', p);
export const apiLogin = p => post('/admin/admin/login', p);