$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: "count",
        title: "期数",
        'Z+': true,
    }, {
        field: 'cycle',
        title: '分期周期',
        'Z+': true
    }, {
        field: "rate",
        title: "分期日利率",
        number: true
    }, {
        field: "orderNo",
        title: "序号"
    }, {
        field: "remark",
        title: "备注"
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        editCode: '623172',
        addCode: '623170',
        detailCode: "623176"
    });
});