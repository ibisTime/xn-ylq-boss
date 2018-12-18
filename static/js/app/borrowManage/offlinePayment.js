$(function () {
    var data1 = {};

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '还款编号',
    }, {
        field: 'applyUser',
        title: '还款人',
        type: getIsFk() ? 'select' : 'hidden',
        search: true,
        pageCode: '805120',
        keyName: 'userId',
        valueName: '{{realName.DATA}}',
        searchName: 'realName',
        params: {
            updater: '',
            kind: 'C'
        },
        formatter: function(v,data){
            return data.user.realName
        }
    }, {
        field: 'mobile',
        title: '还款人手机号',
        type: 'select',
        search: true,
        pageCode: '805120',
        keyName: 'userId',
        valueName: 'mobile',
        searchName: 'mobile',
        params: {
            updater: '',
            kind: 'C'
        },
        formatter: function(v,data){
            return data.user.mobile
        }
    }, {
      field: 'borrowAmount',
      title: '借款金额',
      formatter: function (v,d) {
        return d.borrow ? moneyFormat(d.borrow.borrowAmount) : 0;
      }
    }, {
      field: 'type',
      title: '还款方式',
      key: "repay_apply_type",
      keyCode:"623907",
      formatter: Dict.getNameForList("repay_apply_type"),
      search: true
    },{
      field: 'stageBatch',
      title: '分期次数',
      formatter: function (v,d) {
        return d.borrow ? d.borrow.stageBatch : 0;
      }
    }, {
      field: 'amount',
      title: '还款金额',
      amount: true,
    }, {
      field: 'stageCount',
      title: '第几期'
    }, {
      field: 'days',
      title: '第几天'
    }, {
        field: 'applyDatetime',
        title: '还款申请时间',
        formatter: dateTimeFormat,
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "repay_apply_status",
        formatter: Dict.getNameForList("repay_apply_status",""),
        search: true
    }];

    buildList({
        columns: columns,
        pageCode: '623088',
        beforeSearch: function (data) {
            if(data['mobile']) {
                data['applyUser'] = data['mobile'];
                delete data['mobile'];
            }
            delete data['mobile'];
        }
    });

    $('#checkBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            return;
        }

        if (selRecords[0].status !== "0") {
            toastr.info("该记录不是待审核状态");
            return;
        }

        window.location.href = "./offlinePayment_check.html?Code=" + selRecords[0].code+"&v=1"+"&type="+selRecords[0].type;
    });

    $('#detailBtn').off('click').click(function() {
      var selRecords = $('#tableList').bootstrapTable('getSelections');
      if (selRecords.length <= 0) {
        return;
      }
      window.location.href = "./offlinePayment_addedit.html?Code=" + selRecords[0].code+"&v=1"+"&type="+selRecords[0].type;
    });




});