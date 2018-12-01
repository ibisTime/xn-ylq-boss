$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: "name",
        title: "名称"
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        editCode: '623152',
        addCode: '623150',
        detailCode: "623156"
    });
});