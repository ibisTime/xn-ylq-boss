$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: "登录名",
        field: "loginName",
        // search: true
    }, {
        title: '姓名',
        field: 'realName',
    }, {
        title: '手机号',
        field: 'mobile',
        search: true
    }, {
        field: 'creditScore',
        title: '信用分',
        formatter: (v, data) => {
            return moneyFormat(v, '0');
        }
    }, {
        field: 'userReferee',
        title: '推荐人',
        type: 'select',
        formatter: function (v, data) {
            if (data.refereeUser) {
                var res2 = data.refereeUser.mobile;
                if (res2) {
                    return res2
                } else {
                    return "-"
                }
            }
        }
    }, {
        title: "状态",
        field: "status",
        type: "select",
        key: "user_status",
        formatter: Dict.getNameForList("user_status"),
        search: true
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
    }, {
        title: '备注',
        field: 'remark'
    }
    ];
    buildList({
        router: 'members',
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: "C",
        }
    });

    $('#discountBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./discount.html?userId=" + selRecords[0].userId;

    });

    $("#borrowBtn").click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./borrow.html?userId=" + selRecords[0].userId;

    });

    $('#reportBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "../oansBefore/audit_report.html?userId=" + selRecords[0].userId;

    });

    $('#netReportBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "../oansBefore/audit_netReport.html?userId=" + selRecords[0].userId;

    });


    $('#activeBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var msg = selRecords[0].status === '0' ? '确定注销该用户？' : '确定激活该用户？';
        confirm(msg).then(function () {
            reqApi({
                code: '805084',
                json: {
                    userId: selRecords[0].userId,
                    updater: getUserName()
                }
            }).then(function () {
                sucList();
            });

        }, function () {
        });

    });


    $('#editBtn').off("click").click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./custom_addedit.html?Code=" + selRecords[0].code + '&userId=' + selRecords[0].userId;
    });
    $('#detailBtn').off("click").click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./custom_detail.html?Code=" + selRecords[0].code + '&userId=' + selRecords[0].userId;
    });

    $('#setCreditScoreBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">设置信用分</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            fields: [{
                field: 'creditScore1',
                title: '信用分',
                required: true,
                'Z+': true,
                value: moneyFormat(selRecords[0].creditScore, '0'),
                formatter: (v, data) => {
                    return moneyFormat(selRecords[0].creditScore, '0');
                }
            }],
            container: $('#formContainer'),
            buttons: [{
                title: '确定',
                handler: function () {
                    var params = $('#popForm').serializeObject();
                    var data = {};
                    data.creditScore = moneyParse(params.creditScore1);
                    data.userId = selRecords[0].userId;
                    reqApi({
                        code: '623024',
                        json: data
                    }).done(function (data) {
                        sucList();
                        dw.close().remove();
                    });
                }
            }, {
                title: '取消',
                handler: function () {
                    dw.close().remove();
                }
            }]
        });

        dw.__center();

    });

});