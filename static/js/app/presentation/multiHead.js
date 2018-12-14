$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623063",
        json: {
            userId: userId
        }
    }).then(function (data) {
        hideLoading();
        if (data && data.result){
            data = JSON.parse(data.result);
        }
    }, hideLoading);
});