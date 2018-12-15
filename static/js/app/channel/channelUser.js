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
        field: 'userReferee1',
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
        title: '是否黑名单',
        field: 'isBlackList',
        type: 'select',
        data: {
            '1': '是',
            '0': '否'
        },
        search: true
    }, {
        title: '是否白名单',
        field: 'isWhiteList',
        type: 'select',
        data: {
            '1': '是',
            '0': '否'
        },
        search: true
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
    }, {
      title: '渠道',
      field: 'userReferee',
      type: 'select',
      search: true,
      pageCode: '623155',
      keyName: 'code',
      valueName: 'name',
      params: {
        start: 1,
        limit: 50,
        companyCode: OSS.companyCode
      }
    }
    ];
    buildList({
        router: 'members',
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: "C",
            refereeType: 'W'
        }
    });
  $('#detailBtn').off("click").click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }

    window.location.href = "./channelUser_addedit.html?userId=" + selRecords[0].userId+"&code="+selRecords[0].code+"&v=1";
  });
});