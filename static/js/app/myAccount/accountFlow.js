$(function() {
    var accountNumber = getQueryString('accountNumber') || '';

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名'
    }, {
      field: 'relaNameForQuery',
      title: '户名',
      search: true,
      visible: false
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',
        formatter: Dict.getNameForList('biz_type'),
        search: true
    }, {
        field: 'transAmountString',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmountString',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmountString',
        title: '变动后金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        formatter: Dict.getNameForList('jour_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '金额变动时间',
        formatter: dateTimeFormat
    }, {
        field1: 'createDatetimeStart',
        title1: '金额变动时间',
        type: 'date',
        field2: 'createDatetimeEnd',
        twoDate: true,
        search: true,
        visible: false
    }, {
        field: 'refNo',
        title: '关联编号'
    }];
    buildList({
        columns: columns,
        pageCode: '802320',
        searchParams: {
            userId: getUserId(),
            accountNumber: accountNumber
        }
    });

    if (accountNumber) {
        $('.tools .toolbar').empty();
        $('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
        $('#backBtn').on('click', function() {
            goBack();
        });
    }
});