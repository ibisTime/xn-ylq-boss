$(function() {
    var userKind = {
        "C": "C端用户",
        // "P": "平台用户"
    };
    var data1 = {},data2 = {};


    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'applyUser',
        title: '申请人',
        type: 'select',
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
        field: 'mobile',
        title: '手机号',
        type: 'select',
        search: true,
        pageCode: '805120',
        keyName: 'userId',
        valueName: 'mobile',
        params: {
            updater: '',
            kind: 'C'
        },
        formatter: function(v, data){
            return data.user.mobile;
        }
    }, {
        field: 'creditScore',
        title: '授信金额',
        formatter: function(v,data){
            return moneyFormat(data.creditScore)
        }
    }, {
        field: 'overdueCode',
        title: '代码',
        formatter: function (v, data) {
            return data.user.overdueCode
        }
    }, {
        field: 'approver',
        title: '审核人'
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter:dateTimeFormat
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        // type: "select",
        // listCode: "623907",
        // params:{
        //     parentKey:"apply_status",
        // },
        // keyName:"dkey",
        // valueName:"dvalue",
        formatter: function(v,data){
            // return data.status
            return "审核不通过"
        }
        // search: true
    },{
        field: 'approveNote',
        title: '审核说明'
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        router: 'members',
        columns: columns,
        pageCode: '623030',
        searchParams: {
            statusList: [3]
        },
        beforeSearch: function (data) {
            data['applyUser'] = data['mobile'];
            delete data['mobile'];
        }
    });

    $('#reportBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "audit_report.html?userId=" + selRecords[0].user.userId;

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



        window.location.href = "./query_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1";
    });

});