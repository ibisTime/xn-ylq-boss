$(function() {
    var columns = [{
            field: '',
            title: '',
            checkbox: true
        },{
            field: 'remark',
            title: '说明'
        }
    ];
    buildList({
        columns: columns,
        searchParams:{
            type: "richText"
        },
        pageCode: '623915'
    });
});