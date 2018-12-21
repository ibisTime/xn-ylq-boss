$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var id = getQueryString('id');
    var view = getQueryString('v');
    var couponCode, amount, startAmount, validDays, condition;
    $.when(
        reqApi({
            code: '623907',
            json: {
                parentKey: 'coupon_type'
            }
        }),
        reqApi({
            code: '623115',
            json: {
                start: 1,
                limit: 10000,
                status: 1,
                type: 2
            }
        })
    ).then(function(res1, res2) {
        var data1 = {},
            data2 = {},
            data3 = { amount, startAmount, validDays, condition };


        res1.forEach(function(v, i) {
            data1[v.dkey] = v.dvalue;
        });

        res2.list.forEach(function(v, i) {
            data2[v.code] = data1[v.type];
        });
        data3["amount"] = res2.list[0].amount;
        data3["startAmount"] = res2.list[0].startAmount;
        data3["validDays"] = res2.list[0].validDays;
        data3["condition"] = res2.list[0].condition;

        var fields = [{
            title: "登录名",
            field: "userId",
            type: "select",
            pageCode: "805120",
            params: {
                kind: "C",
                updater: ""
            },
            keyName: "userId",
            valueName: "loginName",
            searchName: 'mobile',
            formatter: function(v, data) {
                return data.user.loginName;
            }
        }, {
            title: "优惠券",
            field: "type",
            value: '直送优惠券',
            readonly: true
        }, {
            title: "额度",
            field: "amount",
            readonly: view,
            value: moneyFormat(data3.amount)
        }, {
            title: "起借额度",
            field: "startAmount",
            readonly: view,
            value: moneyFormat(data3.startAmount)
        }, {
            title: '有效天数（天）',
            field: 'validDays',
            readonly: view,
            value: data3.validDays
        }, {
            title: "获取条件(人/次)",
            field: "condition",
            readonly: view,
            value: data3.condition
        }, {
            title: '备注',
            field: 'remark'
        }];

        buildDetail({
            fields: fields,
            code: code,
            detailCode: "623146",
            addCode: '623130',
            beforeSubmit: function(data) {
                // data.userId = userId;
                data.updater = getUserName();
                data.couponCode = res2.list[0].code;
                return data
            }
        });
    });
});