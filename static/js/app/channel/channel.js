$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "name",
        title: "名称",
        search: true
    }, {
        field: "url",
        title: "链接"
    }, {
      field: "userCount",
      title: "注册人数"
    }, {
      field: "pointCount",
      title: "链接点击数"
    }, {
      field: "status",
      title: "状态",
      type: 'select',
      search: 'true',
      key: 'way_status',
      formatter: Dict.getNameForList('way_status'),
    }];
    buildList({
        columns: columns,
        deleteCode: '623151',
        pageCode: '623155'
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
        code: '623253',
        json: {
          code: selRecords[0].code
        }
      }).then(function () {
        sucList();
      });

    }, function () {
    });

  });

});