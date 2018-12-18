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
        type: 'select',
        data: OSS.notifyTimeList
    }, {
        field: "endTime",
        title: "结束时间",
        type: 'select',
        data: OSS.notifyTimeList
    }];
    buildList({
        columns: columns,
        deleteCode: '623161',
        pageCode: '623165',
        searchParams: {
            type: '0'
        }
    });

});