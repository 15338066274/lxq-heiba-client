import { http } from "@/utils/request.js";
import api from "@/config/api.js";
/**
 * 修改会员信息
 */
export function getMemberModifyInfo(params) {
  return http.request({
    url: `/member/modifyInfo`,
    method: "post",
		data: params
  });
}

/**
 * 2.17我的-获取“球房/通店”总余额
 */
export function getMemberTotalBalance(params) {
  return http.request({
    url: `/member/totalBalance`,
    method: "post",
		data: params
  });
}

/**
 * 2.18我的-获取球房总余额列表数据
 */
export function getMemberBalanceList(params) {
  return http.request({
    url: `/member/balanceList`,
    method: "post",
		data: params
  });
}

/**
 * 2.19我的-获取通店总余额列表数据
 */
export function getMemberMultipleBalanceList(params) {
  return http.request({
    url: `/member/multipleBalanceList`,
    method: "post",
		data: params
  });
}

/**
 * 2.20我的-获取流水账单表头数据
 */
export function getMemberWaterBillHeader(params) {
  return http.request({
    url: `/member/waterBillHeader`,
    method: "post",
		data: params
  });
}

/**
 * 2.21我的-获取流水账单列表数据(门店会员充值/通店会员充值)
 */
export function getMemberWaterBillList(params) {
  return http.request({
    url: `/member/waterBillList`,
    method: "post",
		data: params
  });
}

/**
 * 2.22我的-获取流水账单列表数据(消费)
 */
export function getMemberWaterBillConsumeList(params) {
  return http.request({
    url: `/member/waterBillConsumeList`,
    method: "post",
		data: params
  });
}

/**
 * 2.23我的-获取收藏列表数据
 */
export function getMemberFavoriteList(params) {
  return http.request({
    url: `/member/favoriteList`,
    method: "post",
		data: params
  });
}

/**
 * 获取OSS文件访问地址
 */
export function getMemberOssFileUrl(params) {
  return http.request({
    url: `/member/ossFileUrl`,
    method: "post",
		data: params
  });
}