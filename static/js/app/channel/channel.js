$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "name",
        title: "名称"
    }];
    buildList({
        columns: columns,
        deleteCode: '623151',
        pageCode: '623155',
        searchParams: {
        }
    });

});