$(function() {

    var router = '/user';

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: '登录名',
        field: 'loginName',
        search: true
    }, {
        title: '姓名',
        field: 'realName'
    }, {
        title: '手机号',
        field: 'mobile'
    }, {
        field: 'status',
        title: '状态',
        formatter: Dict.getNameForList('user_status'),
        type: 'select',
        key: 'user_status'
    }, {
        field: 'roleCode',
        title: '角色',
        type: 'select',
        listCode: '805021',
        keyName: 'code',
        valueName: 'name',
        search: true
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        router: 'user',
        columns: columns,
        pageCode: '630308',
        searchParams: {
            updater: '',
        }
    });

    $('#assignBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "user_role.html?userId=" + selRecords[0].userId + "&loginName=" + selRecords[0].loginName + "&kind=" + selRecords[0].kind;
    });
     $('#edit2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "user_role.html?userId=" + selRecords[0].userId + "&loginName=" + encodeURI(encodeURI(selRecords[0].loginName)) + "&kind=" + selRecords[0].kind;
    });

    $('#resetBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        location.href = "user_pwd_reset.html?userId=" + selRecords[0].userId + '&loginName=' + selRecords[0].loginName;
    });

    $('#rockBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if(selRecords[0].status === '1') {
            toastr.info("该用户状态已锁定");
            return;
        }
        reqApi({
            code: '630106',
            json: {
                userId: selRecords[0].userId
            }
        }).then(function() {
            sucList();
        });
    });

    $('#activeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if(selRecords[0].status === '0') {
            toastr.info("该用户状态正常");
            return;
        }
        reqApi({
            code: '630106',
            json: {
                userId: selRecords[0].userId
            }
        }).then(function() {
            sucList();
        });
    });

});
