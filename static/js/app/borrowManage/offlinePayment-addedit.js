$(function() {

	var code = getQueryString('code');
	var type = getQueryString('type');
	var view = getQueryString('v');

	var fields = [ {
        field: 'code1',
        title: '还款编号',
        formatter:function(v,data){
            return data.code;
        }
    }, {
        field: 'refNo',
        title: '借款编号',
    }, {
        field: 'loanType',
        title: '放款方式',
        formatter: function(v,data){
            return data.borrow ? Dict.getNameForList1('loan_type', '', data.borrow.loanType) : '';
        }
    }, {
        field: 'type',
        title: '还款方式',
        type: "select",
        key: "repay_apply_type",
        keyCode:"623907",
        formatter: Dict.getNameForList("repay_apply_type","623907")
    }, {
        field: 'stageCount',
        title: '分期期数',
        hidden: type !== '1',
        formatter: function (v,d) {
          return d.borrow.stageCount;
        }
    }, {
        field: 'stageCycle',
        title: '分期天数',
        hidden: type !== '1',
        formatter: function (v,d) {
          return d.borrow.stageCycle;
        }
    }, {
        field: 'borrowAmount',
        title: '借款金额',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.borrowAmount) : 0;
        }
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
        title: '还款时间',
        formatter: dateTimeFormat,
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