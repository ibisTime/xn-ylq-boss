$(function() {
    var userKind = {
        "C": "C端用户",
        // "P": "平台用户"
    };

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    },{
        field: 'applyUser',
        title: '申请人',
        type: getIsFk() ? 'select' : 'hidden',
        search: true,
        pageCode: '805120',
        keyName: 'userId',
        valueName: '{{realName.DATA}}',
        params: {
            updater: '',
            kind: 'C'
        },
        formatter: function(v,data){
            return data.user.realName
        }
    },{
      field: 'applyDatetime',
      title: '申请时间',
      formatter: dateTimeFormat
    },{
      field: 'status',
      title: '状态',
      formatter: function(v,data){
        return "审核通过"
      }
    },{
        field: 'approver',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }];
    buildList({
        router: 'members',
        columns: columns,
        pageCode: '623030',
        searchParams: {
            statusList:[4]
        },
        beforeSearch: function (data) {
            if(data['mobile']) {
                data['applyUser'] = data['mobile'];
                delete data['mobile'];
            }
            return data;
        }
    });

    $('#reportBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.open("../report.html?userId=" + selRecords[0].user.userId);
        // window.location.href = "audit_report.html?userId=" + selRecords[0].user.userId;
    });

    $('#checkBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "audit_check.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1";
    });

    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./alreadyQuery_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1";
    });
});