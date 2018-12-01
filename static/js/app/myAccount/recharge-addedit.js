$(function() {
    var accountNumber = getQueryString('accountNumber');
    var view = getQueryString('v');
    var repayOfflineAccountVal = '';

    showLoading();
    reqApi({
        code: '623917',
        json: {
            key: 'repayOfflineAccount',
            companyCode: OSS.system  // 查询打款方式 特殊处理companyCode传systemCode
        },
        sync: true
    }).then(function(data) {
        hideLoading();
        repayOfflineAccountVal = data.cvalue;

        var fields = [{
            field: 'amount',
            title: '充值金额',
            amount: true,
            required: true
        }, {
            field: "applyNote",
            title: "打款备注",
            required: true
        }, {
            field: "repayOfflineAccount",
            title: "打款方式",
            type: 'textarea',
            normalArea: true,
            value: repayOfflineAccountVal,
            readonly: true
        }];

        buildDetail({
            fields: fields,
            view: view,
            addCode: '802340',
            beforeSubmit: (data) => {
                data.accountNumber = accountNumber;
                data.applyUser = getUserId();
                data.applyUserType = 'B';
                return data;
            }
        });

    }, hideLoading);
});