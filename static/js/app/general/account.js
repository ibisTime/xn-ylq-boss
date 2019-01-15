$(function() {
  var repay_card_status = {
    0: '待开启',
    1: '开启',
    2: '关闭'
  }
    var columns = [{
            field: '',
            title: '',
            checkbox: true
        },{
            field: 'ownerName',
            title: '卡主人'
        },{
            field: 'bankName',
            title: '银行名称',
        },{
      field: 'bankcardNumber',
      title: '账号',
    },{
      field: 'amount',
      title: '结算余额',
      formatter: moneyFormat
    },{
      field: 'status',
      title: '状态',
      formatter: function (v, d) {
        return repay_card_status[d.status];
      }
    },{
      field: 'remark',
      title: '备注',
    }
    ];
    buildList({
        columns: columns,
        pageCode: '623215'
    });
  $('#editBtn').click(function () {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }

    if(selRecords.status !== '0') {
      toastr.info('账号是待开启状态才能修改');
    } else {
      window.location.href = "./account_addedit.htm?code=" + selRecords[0].code;
    }

  });

  $('#openBtn').click(function () {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }

    var msg = selRecords[0].status === '1' ? '确定关闭该账号？' : '确定开启该账号？';
    confirm(msg).then(function () {
      reqApi({
        code: selRecords[0].status === '1' ? '623214' : '623211',
        json: {
          code: selRecords[0].code,
          updater: getUserName()
        }
      }).then(function () {
        sucList();
      });

    }, function () {
    });

  });
  $('#sumBtn').click(function () {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }
    window.location.href = "./account_sum.html?code=" + selRecords[0].code + '&v=1';

  });
});