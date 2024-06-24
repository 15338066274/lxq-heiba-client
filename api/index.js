import { http } from "@/utils/request.js";

import api from "@/config/api.js";

/**
 * 更新阅读次数
 */
export function updateReadCounts(params) {
  return http.request({
    url: `/services/app/Members/UpdateReadCounts`,
    method: "put",
		params
  });
}

/**
 * 获取二维码
 */
export function getConfigQrcode() {
  return http.request({
    url: `/services/app/SysConfig/GetConfig`,
    method: "get"
  });
}

/**
 * 微信支付
 */
export function getPayment(params) {
  return http.request({
    url: `/services/app/Weixin/Payment`,
    method: "post",
		data: params
  });
}

/**
 * 加入社群
 */
export function getJoinEnterprise(params) {
  return http.request({
    url: `/services/app/Weixin/GetJoinEnterpriseResponse`,
    method: "get",
		params
  });
}

export function getSysDicDataList(params) {
  return http.request({
    url: `/services/app/SysDictionary/GetSysDicDataList`,
    method: "get",
		params
  });
}