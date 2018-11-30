$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "name",
        title: "姓名"
    }, {
        field: 'mobile',
        title: '手机号'
    }, {
        field: "startTime",
        title: "开始时间",
        help: '例：“1”表示每日1点开始'
    }, {
        field: "endTime",
        title: "结束时间",
        help: '例：“24”表示每日24点结束'
    }, {
        field: "remark",
        title: "备注"
    }];
    buildList({
        columns: columns,
        deleteCode: '623161',
        pageCode: '623165',
        searchParams: {
            type: '2'
        }
    });

});