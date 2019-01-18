$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "name",
        title: "渠道名",
        search: true
    }, {
        field: "loginName",
        title: "登录名"
    }, {
      field: "urlCount",
      title: "拥有链接数"
    }, {
      field: "createDatetime",
      title: "开启时间",
      formatter: dateTimeFormat
    }, {
      field: "status",
      title: "状态",
      type: 'select',
      search: 'true',
      key: 'user_status',
      formatter: Dict.getNameForList('user_status'),
    }, {
      field: "remark",
      title: "备注"
    }];
    buildList({
      columns: columns,
      pageCode: '623205',
      uid: ['userId']
    });

  $('#deleteBtn').off("click").click(function () {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }

    var msg = selRecords[0].status === '0' ? '确定注销该渠道？' : '确定激活该渠道？';
    confirm(msg).then(function () {
      reqApi({
        code: '623203',
        json: {
          userId: selRecords[0].userId
        }
      }).then(function () {
        sucList();
      });

    }, function () {
    });

  });

});