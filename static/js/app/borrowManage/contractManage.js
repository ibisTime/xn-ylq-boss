$(function () {
    var code = getQueryString('code');
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
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
        field: 'mobile',
        title: '帐号',
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
    },  {
        field: 'code',
        title: '借款编号'
    }];

    buildList({
        columns: columns,
        pageCode: '623094',
        beforeSearch: function (data) {
            data['userId'] = data['mobile'];
            delete data['mobile'];
        }
    });
    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }



        window.location.href = "./contractManage_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1";
    });

    $('#reportBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.open("../report.html?userId=" + selRecords[0].user.userId);
        // window.location.href = "../oansBefore/audit_report.html?userId=" + selRecords[0].user.userId;

    });

    // $('#downloadBtn').click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }
    //     window.location.href = "./contractManage_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1&download=1";
    //     // reqApi({
    //     //     code: 623093,
    //     //     json: {
    //     //         code: selRecords[0].code,
    //     //         userId: selRecords[0].user.userId
    //     //     }
    //     // }).done(function(data) {
    //     //     console.log(data.content);
    //     //     var html='<div class="tools" id="content" style="margin-left: 20px;">'+
    //     //         data.content+
    //     //         '</div>';
    //     //     $('.pagination-info').after(html);
    //     //     setTimeout(function () {
    //     //         html2canvas($('.pagination-info')[0], {
    //     //             onrendered: function (canvas) {
    //     //                 var contentWidth = canvas.width;
    //     //                 var contentHeight = canvas.height;
    //     //                 //一页pdf显示html页面生成的canvas高度;
    //     //                 var pageHeight = contentWidth / 592.28 * 841.89;
    //     //                 //未生成pdf的html页面高度
    //     //                 var leftHeight = contentHeight;
    //     //                 //pdf页面偏移
    //     //                 var position = 0;
    //     //                 //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    //     //                 var imgWidth = 595.28;
    //     //                 var imgHeight = 592.28 / contentWidth * contentHeight;
    //     //                 var pageData = canvas.toDataURL('image/jpeg', 1.0);
    //     //                 var pdf = new jsPDF('', 'pt', 'a4');
    //     //                 //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //     //                 //当内容未超过pdf一页显示的范围，无需分页
    //     //                 if (leftHeight < pageHeight) {
    //     //                     pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    //     //                 } else {
    //     //                     while (leftHeight > 0) {
    //     //                         pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
    //     //                         leftHeight -= pageHeight;
    //     //                         position -= 841.89;
    //     //                         //避免添加空白页
    //     //                         if (leftHeight > 0) {
    //     //                             pdf.addPage();
    //     //                         }
    //     //                     }
    //     //                 }
    //     //                 pdf.save(data.title+'.pdf');
    //     //             }
    //     //         })
    //     //     },10000)
    //     // });
    // });

});