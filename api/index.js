import { http } from "@/utils/request.js";

import api from "@/config/api.js";

/**
 * 2.1首页-获取球房列表
 */
export function getBilliardList(params) {
  return http.request({
    url: `/billiardParlor/page`,
    method: "post",
		data: params
  });
}

/**
 * 2.2球房详情-获取会员余额
 */
export function getMemberBalance(params) {
  return http.request({
    url: `/member/balance`,
    method: "post",
		data: params
  });
}

/**
 * 2.3球房详情-根据球房id获取球房信息
 */
export function getBilliardParlorInfo(params) {
  return http.request({
    url: `/billiardParlor/info`,
    method: "post",
		data: params
  });
}

/**
 * 2.4球房详情-是否收藏
 */
export function getMemberIsFavorite(params) {
  return http.request({
    url: `/member/isFavorite`,
    method: "post",
		data: params
  });
}

/**
 * 2.5球房详情-收藏球房/取消收藏
 */
export function getMemberFavorite(params) {
  return http.request({
    url: `/member/favorite`,
    method: "post",
		data: params
  });
}

/**
 * 2.6球房详情-获取球桌列表
 */
export function getBilliardTableList(params) {
  return http.request({
    url: `/billiardTable/list`,
    method: "post",
		data: params
  });
}

/**
 * 2.7会员充值-获取充值套餐列表
 */
export function getMemberRechargeComboList(params) {
  return http.request({
    url: `/member/rechargeCombo/list`,
    method: "post",
		data: params
  });
}