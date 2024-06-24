import { http } from "@/utils/request.js";
import api from "@/config/api.js";
/**
 * 获取用户详情信息
 */
export function getMembers(params) {
  return http.request({
    url: `/services/app/Members/Get`,
    method: "get",
		params
  });
}

/**
 * 添加商务合作
 */
export function addCooperation(params) {
  return http.request({
    url: `/services/app/LangShang/AddCooperation`,
    method: "post",
		data: params
  });
}

/**
 * 会员添加需求
 */
export function addDemand(params) {
  return http.request({
    url: `/services/app/Members/AddDemand`,
    method: "post",
		data: params
  });
}

/**
 * 我的卡券
 */
export function getMemberCards(params) {
  return http.request({
    url: `/services/app/LangShang/GetMemberCards`,
    method: "get",
		params
  });
}