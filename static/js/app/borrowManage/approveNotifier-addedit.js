$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: "type",
        title: "类型",
        type: 'hidden',
        value: '0'
    }, {
        field: "name",
        title: "姓名",
        required: true
    }, {
        field: 'mobile',
        title: '手机号',
        mobile: true,
        required: true
    }, {
        field: "startTime",
        title: "开始时间",
        type: 'select',
        data: OSS.notifyTimeList,
        required: true
    }, {
        field: "endTime",
        title: "结束时间",
        type: 'select',
        data: OSS.notifyTimeList,
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        editCode: '623162',
        addCode: '623160',
        detailCode: "623166"
    });
});