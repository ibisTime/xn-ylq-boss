$(function() {
    var userId = getQueryString('userId');
    var view = getQueryString('v');

    var fields = [{
      field: "name",
      title: "渠道名称",
      required: true
    }, {
      field: "loginName",
      title: "登录名",
      required: true
    }, {
      field: "loginPwd",
      title: "登录密码",
      required: true,
      readonly: userId,
      hidden: userId
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