$(function() {
  var code = getQueryString('code');
  var view = getQueryString('v');
  var repay_card_status = {
    0: '待开启',
    1: '开启',
    2: '关闭'
  }
  var fields = [{
    field: 'ownerName',
    title: '卡主人',
    required: true
  },{
    field: 'bankCode',
    title: '银行代号',
    value: 'alipay',
    hidden: true
  },{
    field: 'bankName',
    title: '银行名称',
    value: '支付宝',
    hidden: true
  },{
    field: 'bankcardNumber',
    title: '支付宝账号',
    required: true
  },{
    field: 'pict',
    title: '支付宝图片',
    type: 'img',
    single: true,
    required: true
  },{
    field: 'amount',
    title: '结算余额',
    formatter: moneyFormat,
    readonly: true,
    hidden: !view
  },{
    field: 'status',
    title: '状态',
    formatter: function (v, d) {
      return repay_card_status[d.status];
    },
    readonly: true,
    hidden: !view
  },{
    field: 'remark',
    title: '备注',
  }, {
    field: 'amount1',
    title: '金额',
    required: true,
    readonly: false
  }];

  buildDetail({
    fields: fields,
    code: code,
    view: true,
    addCode: '623213',
    detailCode: '623216',
    editCode: '623213',
    buttons: [{
      title: '确定',
      handler: function () {
        var data = {};
        data.amount = $('#amount1').val() * 1000;
        data.code = code;
        reqApi({
          code: '623213',
          json: data
        }).done(function (data) {
          toastr.info("操作成功");
          setTimeout(function() {
            goBack();
          }, 1000);
        });
      }
    }, {
      title: '取消',
      handler: function () {
        goBack();
      }
    }],
    //   beforeSubmit:function(data){
    //     data.remark = $('#remark').text();
    //     return data
    // }
  });
});