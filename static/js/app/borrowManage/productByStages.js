$(function () {


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "count",
        title: "期数"
    }, {
        field: 'cycle',
        title: '分期周期'
    }, {
        field: "rate",
        title: "分期日利率"
    }, {
        field: "remark",
        title: "备注"
    }];
    buildList({
        columns: columns,
        deleteCode: '623171',
        pageCode: '623175',
    });

});