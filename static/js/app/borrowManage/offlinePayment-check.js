$(function() {
	var code = getQueryString('code');
	var view = getQueryString('v');

	var fields = [ {
        field: 'code1',
        title: '还款编号',
        readonly: view,
        formatter:function(v,data){
            return data.code;
        }
    }, {
        field: 'refNo',
        title: '借款编号',
        readonly: view
    }, {
        field: 'loanType',
        title: '放款方式',
        formatter: function(v,data){
          return data.borrow ? Dict.getNameForList1('loan_type','',data.borrow.loanType) : '';
        },
        readonly: view
    }, {
        field: 'type',
        title: '还款类型',
        key: "repay_apply_type",
        keyCode:"623907",
        formatter: Dict.getNameForList("repay_apply_type","623907"),
        readonly: view
    }, {
        field: 'amount1',
        title: '借款金额',
        amount: true,
        readonly: view,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.amount) : 0;
        },
    }, {
        field: 'lxAmount',
        title: '正常利息',
        amount: true,
        formatter: function(v,data) {
          return data.borrow ? moneyFormat(data.borrow.lxAmount) : 0;
        },
        readonly: view
    }, {
        field: 'fwAmount',
        title: '服务费',
        amount: true,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.fwAmount) : 0;
        },
        readonly: view
    }, {
        field: 'glAmount',
        title: '账户管理费',
        amount: true,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.glAmount) : 0;
        },
        readonly: view
    }, {
        field: 'xsAmount',
        title: '快速信审费',
        amount: true,
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.xsAmount) : 0;
        },
        readonly: view
    }, {
        field: 'yhAmount',
        title: '优惠金额',
        formatter: function(v,data){
          return data.borrow ? moneyFormat(data.borrow.yhAmount) : 0;
        },
        readonly: view
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
        },
    }, {
        field: 'amount',
        title: '还款金额',
        amount: true,
        readonly: view
    }, {
        field: 'applyUser',
        title: '还款人',
        readonly: view,
        formatter:function(v,data){
            return data.user.mobile;
        }
    }, {
        field: 'applyDatetime',
        title: '还款时间',
        formatter: dateTimeFormat,
        readonly: view
    }, {
        field: 'applyNote',
        title: '还款说明',
        readonly: view
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "repay_apply_status",
        keyCode:"623907",
        formatter: Dict.getNameForList("repay_apply_status","623907"),
        readonly: view
    }, {
        field: 'approveNote',
        title: '审核说明',
        required: true

    }];


    var options = {
        fields: fields,
        code:code,
        detailCode: '623089',
    };

    options.buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                data['approver'] = getUserName();
                data["approveResult"] = "1";
                data["approveNote"] = $("#approveNote").val();
                reqApi({
                    code: "623181",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                data['approver'] = getUserName();
                data["approveResult"] = "0";
                data["approveNote"] = $("#approveNote").val();
                reqApi({
                    code: "623181",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail(options);

});