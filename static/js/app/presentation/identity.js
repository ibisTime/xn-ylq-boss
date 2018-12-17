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
            $('#gender').text(data.zqznInfoFront.gender);
            $('#race').text(data.zqznInfoFront.race);
            $('#birth').text(data.zqznInfoFront.birth);
            $('#address').text(data.zqznInfoFront.address);
            $('#idNo').text(data.zqznInfoFront.idNo);
            $('#issuedBy').text(data.zqznInfoBack.issuedBy);
            $('#validDate').text(data.zqznInfoBack.validDate);
            var picHtml = '';
            var faceImageHtml = '';
            if (data.frontImage) {
                picHtml += '<div class="item"><img src="' + formatImg(data.frontImage) + '" alt="身份证正面"/></div>';
            }
            if (data.backImage) {
                picHtml += '<div class="item"><img src="' + formatImg(data.backImage) + '" alt="身份证反面"/></div>';
            }

            if (data.faceImage) {
                faceImageHtml += '<div class="item"><img src="' + formatImg(data.faceImage) + '" alt="身份证反面"/></div>';
            }


            $('#idPic').html(picHtml);
            $('#faceImage').html(faceImageHtml);
        }
    }, hideLoading);
});