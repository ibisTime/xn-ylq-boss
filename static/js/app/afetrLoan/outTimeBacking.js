$(function () {
    var data1 = {};
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    },  {
        field: 'applyUser',
        title: '申请人',
        type: getIsFk() ? 'select' : 'hidden',
        formatter:function(v,data){
            data1[v] = data.user.realName;
            $('#applyUser').renderDropdown2(data1);
             return data.user.realName
        } ,
        search: true
    },{
        field: 'mobile',
        title: '手机号',
        formatter: function(v, data){
            return data.user.mobile;
        }
    // }, {
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
      field: 'loanType',
      title: '放款方式',
      type: "select",
      key: "loan_type",
      keyCode:"623907",
      formatter: Dict.getNameForList("loan_type","623907")
    }, {
      field: 'dkAmount',
      title: '实际放款金额',
      formatter: function (v, data) {
        return moneyFormat(data.amount - data.lxAmount - data.xsAmount - data.glAmount - data.fwAmount + data.yhAmount);
      }
      // }, {
      //     field: 'renewalCount',
      //     title: '续期次数'
    }, {
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
    },{
        field: 'isStage',
        title: '是否分期',
        formatter: function (v,d) {
          return d.isStage ? '是' : '否'
        }
    }, {
        field: 'totalAmount',
        title: '应收',
        formatter: moneyFormat
    }, {
        field: 'updater',
        title: '最后一次更新人'
    }];

    buildList({
        columns: columns,
        searchParams:{
            status: 5,
            isOverdue: 1,
            isArchive: 0
        },
        pageCode: '623085',
        singleSelect: false
    });

    $('#renewalBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }


        window.location.href = "./renewalRecords.html?Code=" + selRecords[0].code+"&v=1";
    });

    $('#confirmBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }


        window.location.href = "./outTime_confirm.html?Code=" + selRecords[0].code+"&v=1";
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


    $('#pressBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var data = { code: selRecords[0].code};
        confirm("确认发短信对该用户进行催缴？").then(function() {
            reqApi({
                code: '623080',
                json: data
            }).then(function() {
                sucList();
            });
        },function(){});


    });

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

    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "./outTimeBacking_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1"+'&isStage='+selRecords[0].isStage;
    });

    $('#overdueStagingBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "./outTimeBacking_overdueStaging.html?code="+selRecords[0].code;
    });
});
