$(function () {
    var data1 = {};
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'applyUser',
        title: '申请人',
        type: getIsFk() ? 'select' : 'hidden',
        search: true,
        pageCode: '805120',
        keyName: 'userId',
        valueName: '{{realName.DATA}}',
        params: {
            updater: '',
            kind: 'C'
        },
        formatter: function(v,data){
            return data.user.realName
        }
    },{
        field: 'mobile',
        title: '手机号',
        type: 'select',
        search: true,
        pageCode: '805120',
        keyName: 'userId',
        valueName: 'mobile',
        params: {
            updater: '',
            kind: 'C'
        },
        formatter: function(v, data){
            return data.user.mobile;
        }
    // },  {
    //     field: 'overdueCode',
    //     title: '代码',
    //     formatter: function (v, data) {
    //         return data.user.overdueCode
    //     }
    }, {
      field: 'code',
      title: '借款编号',
      search: true
    }, {
      field: 'amount',
      title: '借款金额',
      amount: true
    }, {
        field: 'fkDatetime',
        title: '放款时间',
        formatter: dateTimeFormat
    },{
      field: 'loanType',
      title: '放款方式',
      formatter: function(v,data){
        return  Dict.getNameForList1('loan_type','623907',data.loanType)
      }
      // }, {
      //     field: 'yqMoney',
      //     title: '续期费用（元）',
      //     formatter: function (v, data) {
      //         return moneyFormat(data.renewalCount * (data.yqlxAmount+data.lxAmount+data.xsAmount+data.glAmount+data.fwAmount));
      //     }
    }, {
      field: 'dkAmount',
      title: '打款金额（元）',
      formatter: function (v, data) {
        return moneyFormat(data.amount-data.lxAmount-data.xsAmount-data.glAmount-data.fwAmount+data.yhAmount);
      }
    },  {
        field: 'realHkDatetime',
        title: '还款时间',
        formatter: dateTimeFormat
    },{
        field: 'realHkAmount',
        title: '还款金额（元）',
        formatter: moneyFormat
    },  {
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
      formatter: function(v,data){
        return  Dict.getNameForList1('pay_type','623907',data.payType)
      }
        // formatter: Dict.getNameForList('pay_type','623907')
    // }, {
    //     field: 'renewalCount',
    //     title: '续期次数'
    }, {
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
        title: '备注',
    }];

    buildList({
        columns: columns,
        searchParams:{
            status: 4,
            isArchive: 0
            // isOverdue: 0
        },
        pageCode: '623085',
        beforeSearch: function (data) {
            data['applyUser'] = data['mobile'];
            delete data['mobile'];
    }
    });

     $('#filedBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        confirm("确定归档该笔订单？").then(function() {
            reqApi({
                code: '623078',
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

        window.open("../report.html?userId=" + selRecords[0].user.userId);
        // window.location.href = "../oansBefore/audit_report.html?userId=" + selRecords[0].user.userId;

    });

    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "./backAlready_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1";
    });

});