$(function() {

	var code = getQueryString('code');
    var userId = getQueryString('userId');
    var view = getQueryString('v');
	var borrowCount,overdueCode,renewalCount,type,jdtReport;
    var fields = [{
        field: 'mobile',
        title: '申请人',
        formatter: function(v,data){
            borrowCount = data.user.borrowCount;
            overdueCode = data.user.overdueCode;
            renewalCount = data.user.renewalCount;
            type = data.type;
            jdtReport = data.jdtReport;
            return data.user.mobile
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
                if(type == 1){
                    window.location.href = "audit_report.html?userId=" + userId;
                }else{
                    sessionStorage.setItem('jdtReport', jdtReport);
                    window.location.href = "audit_netReport.html?userId=" + userId;
                }
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
            if(data.status == "2"){
                return "待审核"
            }else{
                return "认证中"
            }

        },
        readonly: view,
    }, {
        field: 'remark',
        title: '备注',
        readonly: view,
    },{
        field: 'creditScore',
        title: '信用分',
        // required: true,
        // 'Z+': true,
      // amount: true,
        formatter:function(v,data){
            return v ? moneyFormat(v, '0') : '0';
        }
    },{
        field: 'approveNote',
        title: '审核意见',
        required: true,
        maxlength: 250
    }];

    var options = {
        fields: fields,
        code:code,
        detailCode: '623031',

    };

    options.buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
              if($("#creditScore").val() === '') {
                toastr.info('请输入信用分');
                return;
              }
              if($("#creditScore").val().indexOf('.') !== -1) {
                toastr.info('信用分需为整数');
                return;
              }
              var data = {};
                data['code'] = code;
                data['approver'] = getUserName();
                data["approveResult"] = "1";
                data["approveNote"] = $("#approveNote").val();
                data["creditScore"] =  moneyParse($("#creditScore").val());
                reqApi({
                    code: "623023",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                data['approver'] = getUserName();
                data["approveResult"] = "0";
                data["approveNote"] = $("#approveNote").val();
                data["creditScore"] =  moneyParse($("#creditScore").val());
                reqApi({
                    code: "623023",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            window.location.href = "./audit.html"
        }
    }];

    buildDetail(options);






});