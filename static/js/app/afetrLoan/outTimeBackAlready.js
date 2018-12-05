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
            data1[v] = data.user.realName
            $('#applyUser').renderDropdown2(data1)
             return data.user.realName
        } ,
        search: true
    },{
        field: 'mobile',
        title: '账号',
        formatter: function(v, data){
            return data.user.mobile;
        }
    // }, {
    //     field: 'overdueCode',
    //     title: '代码',
    //     formatter: function (v, data) {
    //         return data.user.overdueCode
    //     }
    },  {
        field: 'fkDatetime',
        title: '放款时间',
        formatter: dateTimeFormat
    }, {
        field: 'hkDatetime',
        title: '到期时间',
        formatter: dateTimeFormat
    }, {
        field: 'yqDays',
        title: '逾期天数'
    }, {
        field: 'amount',
        title: '借款金额',
        amount: true
    },{
        field: 'code',
        title: '借款编号',
        search: true
    }, {
        field: 'dkAmount',
        title: '实际放款金额',
        formatter: function (v, data) {
            return moneyFormat(data.amount - data.lxAmount - data.xsAmount - data.glAmount - data.fwAmount + data.yhAmount);
        }
    }, {
        field: 'yqlxAmount',
        title: '逾期费用',
        formatter: moneyFormat
    }, {
        field: 'realHkAmount',
        title: '实际还款金额',
        formatter: moneyFormat
    }, {
        field: 'payType',
        title: '还款方式',
        // formatter: function (v, data) {
        //     if(data.payType === '5') {
        //         return '宝付银行卡代扣（自动）';
        //     }else if(data.payType === '6') {
        //         return '宝付银行卡代扣（客户）';
        //     }else {
        //         return '宝付银行卡代扣（平台）' ;
        //     }
        // }
        formatter: Dict.getNameForList('pay_type','623907')
    },{
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
            status: 4,
            isArchive: 0,
            isOverdue: 1
        },
        pageCode: '623085'
    });

     $('#filedBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }


        confirm("确定归档该笔订单？").then(function() {
            reqApi({
                code: '623074',
                json: {
                    code: selRecords[0].code,
                    updater: getUserName()
                }
            }).then(function() {
                sucList();
            });

        },function(){});

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



        window.location.href = "./outTimeBackAlready_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1";
    });

});