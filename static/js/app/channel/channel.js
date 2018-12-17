$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "name",
        title: "名称"
    }, {
        field: "url",
        title: "链接"
    }, {
      field: "userCount",
      title: "注册人数"
    }, {
      field: "pointCount",
      title: "链接点击数"
    }];
    buildList({
        columns: columns,
        deleteCode: '623151',
        pageCode: '623155',
        searchParams: {
        }
    });

});