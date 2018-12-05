$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: '流水编号',
        field: 'code1',
        formatter: function(v, data) {
            return data.code;
        },
        readonly: view
    }, {
        title: '户名',
        field: 'realName',
        required: true,
        readonly: view
    }, {
        title: '账号',
        field: 'accountNumber',
        required: true,
        readonly: view
    }, {
        field: 'channelType',
        title: '渠道类型',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        readonly: view
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',
        formatter: Dict.getNameForList('biz_type'),
        readonly: view
    }, {
        field: 'bizNote',
        title: '业务说明'
    }, {
        field: 'transAmountString',
        title: '变动金额',
        formatter: moneyFormat,
        readonly: view
    }, {
        field: 'preAmountString',
        title: '变动前金额',
        formatter: moneyFormat,
        readonly: view
    }, {
        field: 'postAmountString',
        title: '变动后金额',
        formatter: moneyFormat,
        readonly: view
    }, {
        field: 'createDatetime',
        title: '金额変动时间',
        formatter: dateTimeFormat,
        readonly: view
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        formatter: Dict.getNameForList('jour_status'),
        readonly: view
    }, {
        field: 'workDate',
        title: '拟对账时间',
        readonly: view
    }, {
        field: 'checkUser',
        title: '对账人',
        readonly: view
    }, {
        field: 'checkDatetime',
        title: '对账时间',
        formatter: dateTimeFormat,
        readonly: view
    }, {
        field: 'adjustUser',
        title: '调账人',
        readonly: view
    }, {
        field: 'adjustDatetime',
        title: '调账时间',
        formatter: dateTimeFormat,
        readonly: view
    }, {
        field: 'refNo',
        title: '关联编号',
        readonly: view
    }, {
        title: '备注',
        field: 'remark',
        readonly: view
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '802321',
        view: view
    };

    buildDetail(options);
});