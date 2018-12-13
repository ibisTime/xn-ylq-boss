$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623060",
        json: {
            userId: userId,
            key: 'INFO_DT_REPORT'
        }
    }).then(function (data) {
        hideLoading();
        if (data && data.result){
            data = JSON.parse(data.result);
        }
    });
});