$(function() {

	var code = getQueryString('code');
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
        formatter: Dict.getNameForList("repay_apply_type","623907"),
    }, {
        field: 'amount1',
        title: '借款金额',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.amount) : 0;
        }
    }, {
        field: 'lxAmount',
        title: '正常利息',
        amount: true,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.lxAmount) : 0;
        }
    }, {
        field: 'fwAmount',
        title: '服务费',
        amount: true,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.fwAmount) : 0;
        }
    }, {
        field: 'glAmount',
        title: '账户管理费',
        amount: true,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.glAmount) : 0;
        }
    }, {
        field: 'xsAmount',
        title: '快速信审费',
        amount: true,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.xsAmount) : 0;
        }
    }, {
        field: 'yhAmount',
        title: '优惠金额',
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.yhAmount) : 0;
        }
    }, {
        field: 'Amount',
        title: '实际应打款金额',
        formatter:function(v,data){
          return  moneyFormat(data.borrow.amount-(data.borrow.lxAmount+data.borrow.fwAmount+data.borrow.glAmount+data.borrow.xsAmount)+data.borrow.yhAmount)

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
        field: 'amount',
        title: '还款金额',
        amount: true,
        readonly: view
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