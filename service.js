// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	//增加一个到期时间验证
	if (!ret) {
		ret = '{}';
	} else {
		const vartemp = JSON.parse(ret);
		if (compareDate(getNowFormatDate(), vartemp.expire_time)) {
			ret = '{}'
		}
	}
	return JSON.parse(ret);
}

const setUser = function(userInfo) {
	let users = {};
	users = {
		username: userInfo.username,
		password: userInfo.password,
		fullname: userInfo.fullname,
		shopname: userInfo.shopname,
		expire_time: userInfo.expire_time,
		hasLogin: userInfo.hasLogin
	};
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const getAjaxUrl = 'http://94.191.15.174:8090/api/';
//const getAjaxUrl='http://10.1.131.21:8090/api/';

export default {
	getUsers,
	setUser,
	getAjaxUrl
}

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = " ";
	var seperator3 = ":";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	var currentdate = year + seperator1 + month + seperator1 + strDate + seperator2 + hour + seperator3 + minute +
		seperator3 + second;
	return currentdate;
}

//比较日期大小
function compareDate(date1, date2) {
	var date1 = new Date(date1);
	var date2 = new Date(date2);
	if (date1.getTime() > date2.getTime()) {
		return true;
	} else {
		return false;
	}
}
