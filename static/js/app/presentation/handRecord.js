$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623060",
        json: {
            userId: userId,
            key: 'INFO_PERSONAL'
        }
    }).then(function (data) {
        hideLoading();
        data && $('.report-place .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        if (data && data.result){
            data = JSON.parse(data.result);
        }
        var fields = [{
            field: "education",
            title: '学历',
            type: 'select',
            formatter: function (v, data) {
                return data.basic ? Dict.getNameForList1('education', '',data.basic.education) : '';
            }
        }];

        buildDetail({
            fields: fields,
            view: true,
            userDate: data,
            buttons: []
        });
    });
});