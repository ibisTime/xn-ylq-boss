$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        title: '编号',
        field: 'code1',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        field: 'realName',
        title: '户名'
    }, {
        field: 'amount',
        title: '充值金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'charge_status',
        formatter: Dict.getNameForList('charge_status')
    }, {
        field: 'applyUserName',
        title: '申请人'
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
      field: "applyNote",
      title: "打款备注"
    }, {
        field: 'payUserName',
        title: '审核人'
    }, {
        field: 'payDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '802346',
        view: true
    };

    buildDetail(options);
});