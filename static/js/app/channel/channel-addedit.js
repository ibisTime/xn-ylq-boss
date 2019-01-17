$(function() {
    var userId = getQueryString('userId');
    var view = getQueryString('v');

    var fields = [{
      field: "name",
      title: "渠道商",
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

    buildDetail({
      fields: fields,
      code: {
        userId: userId
      },
      view: view,
      editCode: '623152',
      addCode: '623200',
      detailCode: "623206"
    });
});