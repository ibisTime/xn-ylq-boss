$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var view = getQueryString('v');
    var borrowCount,overdueCode,renewalCount,type,jdtReport;

    var fields = [{
        field: 'mobile',
        title: '申请人',
        formatter: function(v,data){
            borrowCount = data.borrowCount;
            overdueCode = data.user.overdueCode;
            renewalCount = data.user.renewalCount;
            type = data.type;
            jdtReport = data.jdtReport;
            return data.user.realName ? data.user.realName + '-' + data.user.mobile : data.user.mobile;
        },
        afterSet:function(data){
            var html='<div class="tools" style="float: right;margin-left: 20px;">'+
                '<ul class="toolbar"  style="float: left;">'+
                '<li style="display:block;" id="reportBtn"><span><img src="/static/images/t01.png"></span>查看资信报告</li>'+
                '</ul>'+
                '</div>';
            var html1='<div style="padding-left: 194px;width: 100%;overflow: hidden;">'+
                '<span style="float: left;">借款次数:'+ borrowCount+' </span>'+
                // '<span style="float: left;">逾期代码: '+ overdueCode +' </span>'+
                // '<span style="float: left;">续期次数: '+  renewalCount +' </span>'+
                '</div>';

            $('#mobile').append(html);
            $('#mobile').after(html1);
            $('#reportBtn').click(function() {
              window.open("../report.html?userId=" + userId);
                // if(type == 1){
                //
                //   window.open("../report.html?userId=" + userId);
                //     // window.location.href = "audit_report.html?userId=" + userId;
                // }else{
                //     sessionStorage.setItem('jdtReport', jdtReport);
                //     window.location.href = "audit_netReport.html?userId=" + userId;
                // }
            });
        },
        readonly: view
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        readonly: view,
        formatter:function(v,data){
            return dateTimeFormat(data.applyDatetime)
        }
    }, {
        field: 'status',
        title: '状态',
        formatter: function(v,data){
            return "待批复";
        },
        readonly: view,
    }, {
        field: 'remark',
        title: '备注',
        readonly: view,
    }, {
        title: '审核人',
        field: 'approver',
        maxlength: 250
    }, {
        title: '审核时间',
        field: 'approveDatetime',
        formatter: dateTimeFormat
    }, {
        title: '审核说明',
        field: 'approveNote',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        view:view,
        code:code,
        detailCode: "623031",
    });

    $('#backBtn').off('click').click(function() {
        window.location.href = "./query.html?"
    });
});