$(function () {
    var data1 = {};
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '借款编号',
        search: true
    }, {
        field: 'applyUser',
        title: '申请人',
        type: 'select',
        formatter:function(v,data){
            data1[v] = data.user.mobile
            $('#applyUser').renderDropdown2(data1)
             return data.user.mobile
        } ,
        search: true
    }, {
        field: 'amount',
        title: '借款金额',
        amount: true,
    }, {
        field: 'yhAmount',
        title: '优惠金额',
        amount: true,
    }, {
        field: 'duration',
        title: '借款时长(天)',
    }, {
        field: 'yqDays',
        title: '逾期天数',
    }, {
        field: 'lxAmount',
        title: '正常利息',
        amount: true,
    }, {
        field: 'yqlxAmount',
        title: '逾期利息',
        amount: true,
    }, {
        field: 'fwAmount',
        title: '服务费',
        amount: true,
    }, {
        field: 'glAmount',
        title: '账户管理费',
        amount: true,
    }, {
        field: 'xsAmount',
        title: '快速信审费',
        amount: true,
    // }, {
    //     field: 'renewalCount',
    //     title: '订单续期(次)',
    }, {
        field: 'signDatetime',
        title: '签约时间',
        formatter: dateTimeFormat
    }, {
      field: 'isStage',
      title: '是否分期',
      formatter: function (v,d) {
        return d.isStage === '1' ? '是' : '否'
      }
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "borrow_status",
        keyCode:"623907",
        formatter: Dict.getNameForList("borrow_status","623907")
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildList({
        columns: columns,
        searchParams:{
            isArchive: 1
        },
        pageCode: '623085'
    });

  $('#detailBtn').off("click").click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }

    window.location.href = "./backFiled_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1"+'&isStage='+selRecords[0].isStage;
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

});