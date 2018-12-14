$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623060",
        json: {
            userId: userId,
            key: 'INFO_ZQZN'
        }
    }).then(function (data) {
        hideLoading();
        data && $('.report-place .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        if (data && data.result){
            data = JSON.parse(data.result);
            $('#realName').text(data.zqznInfoFront.name);
            $('#idNo').text(data.zqznInfoFront.idNo);
            var picHtml = '';
            if (data.frontImage) {
                picHtml += '<div class="item"><img src="' + formatImg(data.frontImage) + '" alt="身份证正面"/></div>';
            }
            if (data.backImage) {
                picHtml += '<div class="item"><img src="' + formatImg(data.backImage) + '" alt="身份证反面"/></div>';
            }

            $('#idPic').html(picHtml);
        }
    }, hideLoading);
});