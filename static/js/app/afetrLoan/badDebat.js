$(function () {
    var data1 = {};
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'applyUser',
        title: '申请人',
        type: 'select',
        formatter:function(v,data){
            data1[v] = data.user.mobile;
            $('#applyUser').renderDropdown2(data1);
             return data.user.mobile
        } ,
        search: true
    },{
        field: 'code',
        title: '账号',
        formatter: function(v, data){
            return data.code;
        }
    // }, {
    //     field: 'overdueCode',
    //     title: '代码',
    //     formatter: function (v, data) {
    //         return data.user.overdueCode
    //     }
    },{
        field: 'fkDatetime',
        title: '放款时间',
        formatter: dateTimeFormat
    }, {
        field: 'hkDatetime',
        title: '到期时间',
        formatter: dateTimeFormat
    },  {
        field: 'yqDays',
        title: '逾期天数'
    },{
        field: 'amount',
        title: '借款金额',
        amount: true
    }, {
        field: 'code',
        title: '借款编号',
        search: true
    }, {
        field: 'dkAmount',
        title: '实际打款金额',
        formatter: function (v, data) {
            return moneyFormat(data.amount-data.lxAmount-data.xsAmount-data.glAmount-data.fwAmount+data.yhAmount);
    }
    }, {
        field: 'yqlxAmount',
        title: '逾期利息',
        amount: true
    },  {
        field: 'totalAmount',
        title: '应收',
        formatter: moneyFormat
    }, {
        field: 'renewalCount',
        title: '逾期次数'
    },  {
        field: 'status',
        title: '状态',
        type: "select",
        key: "borrow_status",
        keyCode:"623907",
        formatter: Dict.getNameForList("borrow_status","623907")
    }, {
        field: 'updater',
        title: '最后一次更新人'
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        searchParams:{
            status: 6
        },
        pageCode: '623085'
    });

    $('#addRemarkBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./addRemark.html?code=" + selRecords[0].code;

    });

    $('#reportBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "../oansBefore/audit_report.html?userId=" + selRecords[0].user.userId;

    });

    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }



        window.location.href = "./badDebat_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1";
    });

});
