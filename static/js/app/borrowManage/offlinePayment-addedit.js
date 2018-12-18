$(function() {

	var code = getQueryString('code');
	var type = getQueryString('type');
	var view = getQueryString('v');
	var isStage = type;
  var columns =  [{
    field: 'approveDatetime',
    title: '还款时间',
    formatter: dateTimeFormat
  }, {
    field: 'amount',
    title: '还款金额',
    formatter: moneyFormat
  }, {
    field: 'type',
    title: '还款方式',
    type: "select",
    key: "repay_apply_type",
    keyCode:"623907",
    formatter: Dict.getNameForList("repay_apply_type","623907")
  }]
	var fields = [ {
        field: 'code1',
        title: '还款编号',
        formatter:function(v,data){
            return data.code;
        }
    }, {
        field: 'refNo',
        title: '借款编号',
        formatter: function (v,d) {
          var dCode = d.borrow ? d.borrow.code : '';
          var urlHtml = '<a href="./moneyBack_addedit.html?v=1&code='+ dCode + '&isStage=' + isStage +'">'+dCode+'</a>';
          return urlHtml;
        }
    }, {
      field: 'borrowAmount',
      title: '借款金额',
      formatter: function (v,d) {
        return d.borrow ? moneyFormat(d.borrow.borrowAmount) : 0;
      }
    }, {
    field: 'type',
    title: '还款方式',
    type: "select",
    key: "repay_apply_type",
    keyCode:"623907",
    formatter: Dict.getNameForList("repay_apply_type","623907")
  }, {
    field: 'stageBatch',
    title: '分期次数',
    formatter: function (v,d) {
      return d.borrow ? d.borrow.stageBatch : 0;
    }
  }, {
      field: 'stageCount',
      title: '第几期',
      hidden: type !== '1'
    }, {
      field: 'days',
      title: '第几天',
      hidden: type !== '1'
    }, {
      field: 'repayList',
      title: '还款明细记录列表',
      type: 'o2m',
      columns: columns,
      useData: function(v,d) {
        if(!d.borrow.repayList) {
          return [];
        }
        return d.borrow.repayList;
      },
      readonly: true
  }, {
      field: 'amount',
      title: '还款金额',
      amount: true,
  }, {
        field: 'lxAmount',
        title: '正常利息',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.lxAmount) : 0;
        }
    }, {
        field: 'fwAmount',
        title: '服务费',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.fwAmount) : 0;
        }
    }, {
        field: 'glAmount',
        title: '账户管理费',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.glAmount) : 0;
        }
    }, {
        field: 'xsAmount',
        title: '快速信审费',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.xsAmount) : 0;
        }
    }, {
        field: 'yhAmount',
        title: '优惠金额',
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.yhAmount) : 0;
        }
    }, {
        field: 'realGetAmount',
        title: '已打款金额',
        formatter:function(v,data){
          return data.borrow ? moneyFormat(data.borrow.realGetAmount) : 0;
        },
        readonly:view,
    }, {
        field: 'yqlxAmount',
        title: '逾期金额',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.yqlxAmount) : 0;
        }
    }, {
        field: 'realHkAmount',
        title: '已还款金额',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.realHkAmount) : 0;
        }
    }, {
        field: 'totalAmount',
        title: '剩余还款金额',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.totalAmount) : 0;
        }
    }, {
        field: 'applyUser',
        title: '还款人',
        formatter:function(v,data){
            return data.user.mobile;
        }
    },{
        field: 'applyDatetime',
        title: '还款申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'applyNote',
        title: '还款说明',
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "repay_apply_status",
        keyCode:"623907",
        formatter: Dict.getNameForList("repay_apply_status","623907")
    }, {
        field: 'approver',
        title: '审核人',
    },{
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat,
    }, {
        field: 'approveNote',
        title: '审核说明',
    }];

	buildDetail({
		fields: fields,
		code: code,
		view:view,
		detailCode: '623089',
	});

});