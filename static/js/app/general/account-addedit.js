$(function() {
  var code = getQueryString('code');
  var view = getQueryString('v');
  var sum = getQueryString('sum');
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
    // type: 'select',
    // listCode: "623907",
    // params:{
    //   dkey: 'repay_card_status',
    //   companyCode: OSS.system
    // },
    // keyName:"dkey",
    // valueName:"dvalue",
    formatter: function (v, d) {
      return repay_card_status[d.status];
    },
    readonly: true,
    hidden: !view
  },{
    field: 'remark',
    title: '备注',
  }];

  buildDetail({
    fields: fields,
    code: code,
    view: view,
    addCode: '623210',
    detailCode: '623216',
    editCode: '623212',
    beforeSubmit:function(data){
        data.remark = $('#remark').text();
        return data
    }
  });
});