$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
      field: "name",
      title: "链接名称",
      search: true
    }, {
      field: "name1",
      title: "所属渠道商",
      formatter: function(v, d) {
        return d.wayer ? d.wayer.name : '';
      }
    }, {
      field: "userId",
      title: "所属渠道商",
      search: true,
      type: 'select',
      listCode: '623207',
      keyName: 'userId',
      valueName: 'name',
      visible: false
    }, {
        field: "productUrl",
        title: "产品列表页链接"
    }, {
      field: "regUrl",
      title: "注册页链接"
    }, {
      field: "productPointCount",
      title: "产品列表页点击总数"
    }, {
      field: "regPointCount",
      title: "注册页点击总数"
    }, {
      field: "userCount",
      title: "注册总数"
    }, {
      field: "createDatetime",
      title: "开启时间",
      formatter: dateTimeFormat
    }, {
      field: "reamrk",
      title: "备注"
    }
    // , {
    //   field: "status",
    //   title: "状态",
    //   type: 'select',
    //   search: 'true',
    //   key: 'way_status',
    //   formatter: Dict.getNameForList('way_status'),
    // }
    ];
    buildList({
        columns: columns,
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