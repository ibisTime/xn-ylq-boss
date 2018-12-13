var OSS = {};
// mainUrl
OSS.mainUrl = '/mainUrl';
// system
OSS.system = 'CD-YLQ000014';
// system
OSS.systemName = sessionStorage.getItem('appName') + '管理平台';
//公司编号
// OSS.companyCode = 'CD-YLQ000014';
// picUrl
OSS.picBaseUrl = sessionStorage.getItem('qiniuUrl');
// picShow
OSS.picShow = '?imageMogr2/auto-orient/thumbnail/!100x100r';
//系统userid
OSS.SYS_USER = 'SYS_USER_DATA';

//用户登录有效时间
OSS.userValidTime = 30;

// 通知时间段
OSS.notifyTimeList = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '24:00'
];
OSS.reportFlagList = {
    '0': '未认证',
    '1': '已认证',
    '2': '已过期',
    '3': '认证中',
    '4': '认证失败',
};