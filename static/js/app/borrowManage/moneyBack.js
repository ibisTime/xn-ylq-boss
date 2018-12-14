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
    },{
        field: 'fkDatetime',
        title: '放款时间',
        formatter: dateTimeFormat
    }, {
        field: 'hkDatetime',
        title: '到期时间',
        formatter: dateTimeFormat
    },{
        field: 'remainDays',
        title: '还款剩余天数'
    }, {
        field: 'amount',
        title: '借款金额',
        amount: true
    },  {
        field: 'code',
        title: '借款编号',
        search: true
    }, {
        field: 'yhAmount',
        title: '优惠费用（元）',
        formatter: function (v, data) {
            return moneyFormat(data.yhAmount);
        }
    }, {
        field: 'dkAmount',
        title: '实际打款（元）',
        formatter: function (v, data) {
            return moneyFormat(data.amount-data.lxAmount-data.xsAmount-data.glAmount-data.fwAmount+data.yhAmount);
        }
    }, {
        field: 'loanType',
        title: '放款方式',
        type: "select",
        key: "loan_type",
        keyCode:"623907",
        formatter: Dict.getNameForList("loan_type","623907"),
        search: true
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
        title: '备注'
    }];

    buildList({
        columns: columns,
        searchParams:{
            status: 3,
            isArchive: 0,
            isOverdue: 0
        },
        pageCode: '623085',
        singleSelect: false,
        beforeSearch: function (data) {
            data['applyUser'] = data['mobile'];
            delete data['mobile'];
        }
    });

    $('#renewalBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }


        window.location.href = "../afetrLoan/renewalRecords.html?Code=" + selRecords[0].code+"&v=1";
    });
    // 合同管理
    // $('#contractManageBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }
    //
    //
    //     window.location.href = "./contractManage.html?Code=" + selRecords[0].code+"&v=1";
    // });
// 批量扣款
    $('#piliangKoukuanBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        var codeList = [];
        for(var v=0;v<selRecords.length;v++) {
            codeList.push(selRecords[v].code)
        }
        var data = {
            codeList: codeList,
            updater: getUserName()
        };
        if(selRecords.length == 1) {
            text = '确认代扣？'
        }else {
            text = '确认批量代扣？'
        }
        confirm(text).then(function() {
            reqApi({
                code: '623084',
                json: data
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

        window.location.href = "./moneyBack_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1";
    });


    $('#normalStagingBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "./moneyBack_normalStaging.html?code="+selRecords[0].code;
    });

    $('#repaymentReminderBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords.length > 1) {
            toastr.info("请只选择一条记录");
            return;
        }

        confirm('确认发短信对该用户进行还款提醒？').then(function() {
            reqApi({
                code: '623083',
                json: {
                  code: selRecords[0].code
                }
            }).then(function() {
                sucList();
            });
        },function(){});
    })
});