const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

const formatDate = (type) => {
  let start = (new Date()).getTime()-24*60*60*1000 // 前一天
  let end = (new Date()).getTime() // 当前
  let _time = new Date(type === 'start' ? start : end)
  let _year = formatNumber(_time.getFullYear())
  let _month = formatNumber(_time.getMonth() + 1)
  let _date = formatNumber(_time.getDate())
  let _hour = formatNumber(_time.getHours())
  let _minutes = formatNumber(_time.getMinutes())
  let _seconds = formatNumber(_time.getSeconds())
  let timerYear = _year + '-' + _month + '-' + _date
  let timerDate = _hour + ':' + _minutes + ':' + _seconds
  const timer = timerYear + ' ' + timerDate
  return timer
}

const formatDayDate = (type) => {
	let beforeDay = (new Date()).getTime()-24*60*60*1000 // 前一天
	let curDay = (new Date()).getTime() // 当前
	
	let _curTime = new Date()
	let _curHour = formatNumber(_curTime.getHours()) // 当前时间的小时
	
	let _time = new Date(_curHour >= 8 ? curDay : beforeDay)
	let _year = formatNumber(_time.getFullYear())
	let _month = formatNumber(_time.getMonth() + 1)
	let _date = formatNumber(_time.getDate())
	let _hour = formatNumber(_time.getHours())
	let start_timerYear = _year + '-' + _month + '-' + _date // 开始日期根据小时大于等于8是当前，否则是前一天
	
	let end_year = formatNumber(_curTime.getFullYear())
	let end_month = formatNumber(_curTime.getMonth() + 1)
	let end_date = formatNumber(_curTime.getDate())
	let end_hour = formatNumber(_curTime.getHours())
	let end_minutes = formatNumber(_curTime.getMinutes())
	let end_timerYear = end_year + '-' + end_month + '-' + end_date // 结束日期永远是当前
	
	const timer = {
		start: start_timerYear + ' ' + '08:00',
		end: end_timerYear + ' ' + _hour + ':' + end_minutes,
	}
	return timer[type]
}

const formatHourDate = (type) => {
  let beforeDay = (new Date()).getTime()-24*60*60*1000 // 前一天
  let curDay = (new Date()).getTime() // 当前
  
  let _curTime = new Date()
  let _curHour = formatNumber(_curTime.getHours()) // 当前时间的小时
  
  let _time = new Date(_curHour >= 8 ? curDay : beforeDay)
  let _year = formatNumber(_time.getFullYear())
  let _month = formatNumber(_time.getMonth() + 1)
  let _date = formatNumber(_time.getDate())
  let _hour = formatNumber(_time.getHours())
  let start_timerYear = _year + '-' + _month + '-' + _date // 开始日期根据小时大于等于8是当前，否则是前一天
  
  let end_year = formatNumber(_curTime.getFullYear())
  let end_month = formatNumber(_curTime.getMonth() + 1)
  let end_date = formatNumber(_curTime.getDate())
  let end_hour = formatNumber(_curTime.getHours())
  let end_timerYear = end_year + '-' + end_month + '-' + end_date // 结束日期永远是当前
  
  const timer = {
    startText: start_timerYear + ' ' + '08',
	endText: end_timerYear + ' ' + _hour,
	start: start_timerYear + ' ' + '08:00:00',
	end: end_timerYear + ' ' + _hour + ':59:59',
  }
  return timer[type]
}

const formatCommonDate = () => {
	let _time = new Date()
	let _year = formatNumber(_time.getFullYear())
	let _month = formatNumber(_time.getMonth() + 1)
	let _date = formatNumber(_time.getDate())
	let timerYear = _year + '-' + _month + '-' + _date
	return timerYear
}

const formatHtml = content => {
  content = content.replace(/\<img/gi, '<img style="width:100% !important;height:auto !important;margin:0;display:flex;" ');
  content = content.replace(/\<td/gi, '<td  cellspacing="0" cellpadding="0" border="0" style="display:block;vertical-align:top;margin: 0px; padding: 0px; border: 0px;outline-width:0px;" ');
  content = content.replace(/width=/gi, 'sss=');
  content = content.replace(/height=/gi, 'sss=');
  content = content.replace(/ \/\>/gi, ' style="max-width:100% !important;height:auto !important;margin:0;display:block;" \/\>');
  return content;
};

/*
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数
  * dec_point：小数点符号
  * thousands_sep：千分位符号
  * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
  * */
const formatAmount = (number, decimals=3, dec_point=".", thousands_sep=",", roundtag="floor") => {
	number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	roundtag = roundtag || "ceil"; //"ceil","floor","round"
	var n = !isFinite(+number) ? 0 : +number,
	prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	s = '',
	toFixedFix = function (n, prec) {
		var k = Math.pow(10, prec);
	    return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec*2))).toFixed(prec*2)) / k;
	};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	var re = /(-?\d+)(\d{3})/;
	while (re.test(s[0])) {
	    s[0] = s[0].replace(re, "$1" + sep + "$2");
	}
	  
	if ((s[1] || '').length < prec) {
	    s[1] = s[1] || '';
	    s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}

/**
 * 获取链接上的参数
 */
const getUrlKey = (name) => {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1]
		.replace(/\+/g, '%20')) || null
}

const subStrFn = (str, num) => {
  return str.substring(0, num)
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDayDate: formatDayDate,
  formatHourDate: formatHourDate,
  formatCommonDate: formatCommonDate,
  getUrlKey: getUrlKey,
  formatHtml: formatHtml,
  formatAmount: formatAmount,
  subStrFn: subStrFn
};