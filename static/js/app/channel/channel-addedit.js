$(function() {
    var userId = getQueryString('userId');
    var view = getQueryString('v');

    var fields = [{
      field: "name",
      title: "渠道名",
      search: true,
      required: true
    }, {
      field: "loginName",
      title: "登录名",
      required: true
    }, {
      field: "loginPwd",
      title: "登录密码",
      type: 'password',
      required: true,
      hidden: userId
    }, {
      field: "urlCount",
      title: "拥有链接数",
      hidden: !userId
    }, {
      field: "createDatetime",
      title: "开启时间",
      formatter: dateTimeFormat,
      hidden: !userId
    }, {
      field: "status",
      title: "状态",
      type: 'select',
      search: 'true',
      key: 'user_status',
      formatter: Dict.getNameForList('user_status'),
      hidden: !userId
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