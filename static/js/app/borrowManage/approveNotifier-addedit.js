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
        title: "姓名"
    }, {
        field: 'mobile',
        title: '手机号',
        mobile: true
    }, {
        field: "stratTime",
        title: "开始时间",
        help: '例：“1”表示每日1点开始',
        'Z+': true
    }, {
        field: "endTime",
        title: "结束时间",
        help: '例：“24”表示每日24点结束',
        'Z+': true
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