$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var status = getQueryString('status');
    var payResult = !!getQueryString('payResult');

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
        field: 'payCardInfo',
        title: '银行名称',
        required: true,
    }, {
        field: 'payCardNo',
        title: '银行卡号',
        required: true,
    }, {
        field: "applyNote",
        title: "备注",
        required: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status')
    }, {
        field: 'applyUserName',
        title: '申请人'
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }];

    if (status !== '1') {
        fields = fields.concat([{
            field: 'approveUser',
            title: '审核人'
        }, {
            field: 'approveDatetime',
            title: '审核时间',
            formatter: dateTimeFormat
        }])
    }

    if (status === '4' || status === '5') {
        fields = fields.concat([{
            field: 'payUser',
            title: '回录人'
        }, {
            field: 'payDatetime',
            title: '回录时间',
            formatter: dateTimeFormat,
        }, {
            field: 'channelOrder',
            title: '打款水单编号',
            hidden: !payResult
        }, {
            field: 'payFee',
            title: '打款手续费',
            amount: true,
            hidden: !payResult
        }, {
            field: 'payNote',
            title: '打款备注'
        }])
    }


    var options = {
        fields: fields,
        code: code,
        detailCode: '802356',
        view: true
    };

    buildDetail(options);
});