import { http } from "@/utils/request.js";
import api from "@/config/api.js";

/**
 * 第三方登录微信登录
 */
export function loginByWeiXin(params) {
  return http.request({
    url: `/services/app/Members/LoginByWeiXin`,
    method: "post",
		params
  });
}

/**
 * 获取验证码
 */
export function getSendSmsReg(params) {
  return http.request({
    url: `/services/app/LangShang/SendVeriCode`,
    method: "post",
		data: params
  });
}

export function updateMobile(params) {
  return http.request({
    url: `/services/app/Members/UpdateMobile`,
    method: "put",
		data: params
  });
}

export function getMobileLogin(params) {
  return http.request({
    url: `/services/app/Members/MobileLogin`,
    method: "post",
		data: params
  });
}
