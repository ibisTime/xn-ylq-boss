$(function() {
    var columns = [{
            field: '',
            title: '',
            checkbox: true
        },{
            field: 'remark',
            title: '参数说明'
        },{
            field: 'cvalue',
            title: '参数值',
        }
    ];
    buildList({
        columns: columns,
        searchParams:{
            type:"3"
        },
        pageCode: '623915'
    });
});