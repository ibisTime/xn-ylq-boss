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
            title: '取现金额',
            amount: true,
            required: true
        }, {
            field: 'payCardInfo',
            title: '银行名称',
            required: true,
        }, {
            field: 'payCardNo',
            title: '银行卡号',
            number: true,
            required: true,
        }, {
            field: "applyNote",
            title: "备注",
            required: true
        }];

        buildDetail({
            fields: fields,
            view: view,
            addCode: '802350',
            beforeSubmit: (data) => {
                data.accountNumber = accountNumber;
                data.applyUser = getUserId();
                data.applyUserType = 'B';
                return data;
            }
        });

    }, hideLoading);
});