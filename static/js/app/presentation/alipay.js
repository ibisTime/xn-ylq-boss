$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623060",
        json: {
            userId: userId,
            key: 'INFO_ZHIFUBAO'
        }
    }).then(function (data) {
        hideLoading();
        data && $('.report-place .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        data && $('.report-box .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        if (data && data.result){
            data = JSON.parse(data.result);
            $('#code').html(data.ref);
            $('#validDatetime').html(dateTimeFormat(data.validDatetime));
            for(var k in data.basic_info.user_and_account_basic_info){
              $('#basic_info_'+ k).html(data.basic_info.user_and_account_basic_info[k]);
              $('#basic_info_alipay_gender').html(data.basic_info.user_and_account_basic_info.alipay_gender === 'MALE' ? '男' : '女')
            }
        }
    }, hideLoading);
});