$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
      field: "name",
      title: "名称",
      required: true
    },{
      field: "userId",
      title: "渠道商",
      type: 'select',
      listCode: '623207',
      valueName: 'name',
      keyName: 'userId',
      params: {
        status: '0'
      },
      required: true
    },{
      field: "remark",
      title: "备注"
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        editCode: '623152',
        addCode: '623150',
        detailCode: "623156"
    });
});