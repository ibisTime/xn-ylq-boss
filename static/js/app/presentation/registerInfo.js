$(function() {
    var userId = sessionStorage.getItem('report_userId');

    var fields = [{
        field: "mobile",
        title: '手机号'
    }, {
        title: "注册地址",
        field: "province",
        formatter: function (v, data) {
            if (data.province) {
                if (data.address) {
                    if (data.province == data.city) {
                        return data.city + data.area + data.address;
                    } else {
                        return data.province + data.city + data.area + data.address;
                    }
                } else {
                    if (data.province == data.city) {
                        return data.city + data.area;
                    } else {
                        return data.province + data.city + data.area;
                    }
                }
            } else {
                return '-'
            }

        }
    }, {
        title: "注册时间",
        field: "createDatetime",
        formatter: dateTimeFormat
    }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        view: true,
        detailCode: '805121',
        buttons: []
    });

});