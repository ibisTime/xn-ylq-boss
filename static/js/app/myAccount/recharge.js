$(function () {
    var accountNumber;
    showLoading();
    reqApi({
        code: '802301',
        json: {
            currency: 'CNY',
            userId: getUserId()
        },
        sync: true
    }).then(function(data) {
        hideLoading();
        var lists = data[0];
        accountNumber = lists.accountNumber;

        var columns = [{
            field: '',
            title: '',
            checkbox: true
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
            formatter: Dict.getNameForList('charge_status'),
            search: true
        }, {
            field: 'applyUserName',
            title: '申请人'
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            formatter: dateTimeFormat,
            field1: 'applyDateStart',
            title1: '申请时间',
            type: 'date',
            field2: 'applyDateEnd',
            twoDate: true,
            search: true
        }, {
            field1: 'payDateStart',
            title1: '审核时间',
            type: 'date',
            field2: 'payDateEnd',
            twoDate: true,
            search: true,
            visible: false
        }, {
            field: 'payUserName',
            title: '审核人'
        }, {
            field: 'payDatetime',
            title: '审核时间',
            formatter: dateTimeFormat
        }];
        buildList({
            columns: columns,
            pageCode: '802345',
            searchParams: {
                accountNumber: accountNumber
            },
            beforeDetail: function(data) {
                location.href = "recharge_detail.html?code=" + data.code + "&detail=1";
            }
        });

        $('#rechargeBtn').click(function() {
            window.location.href = "./recharge_addedit.html?accountNumber=" + accountNumber;
        });

    }, hideLoading);

});