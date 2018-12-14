$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var view = getQueryString('v');
    var download = getQueryString('download');

    var content,title;

    var fields = [ {
        field: 'mobile',
        title: '合同内容',
        formatter:function(v,data){
            content = data.content;
            title = data.title;
            return content
        },
        afterSet:function(data){
            var html='<div class="tools" id="content" style="margin-left: 20px;">'+
                '<ul class="toolbar"  style="float: left;">'+
                '<li style="display:block;" id="reportBtn"><span><img src="/static/images/t01.png"></span>查看资信报告</li>'+
                '</ul>'+
                '</div>';
            var html7 = '<div class="tools" style="float: right;" ><ul class="toolbar" ><li style="display:block;" id="downloadBtn"><span><img src="/static/images/t01.png" ></span><span style="width: 60px;position: relative;left: 30px;border: 0px solid blue">下载</span></li></ul></div>';
            $('#mobile').after(html);
            $('.form-title').append(html7);
            $('#reportBtn').click(function() {

                window.open("../report.html?userId=" + userId);
                // window.location.href = "../oansBefore/audit_report.html?userId=" + userId;
            });
            $('#downloadBtn').off('click').click(function () {
                html2canvas($('#mobile')[0], {
                    onrendered: function (canvas) {
                        var contentWidth = canvas.width;
                        var contentHeight = canvas.height;
                        //一页pdf显示html页面生成的canvas高度;
                        var pageHeight = contentWidth / 592.28 * 841.89;
                        //未生成pdf的html页面高度
                        var leftHeight = contentHeight;
                        //pdf页面偏移
                        var position = 0;
                        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                        var imgWidth = 595.28;
                        var imgHeight = 592.28 / contentWidth * contentHeight;
                        var pageData = canvas.toDataURL('image/jpeg', 1.0);
                        var pdf = new jsPDF('', 'pt', 'a4');
                        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                        //当内容未超过pdf一页显示的范围，无需分页
                        if (leftHeight < pageHeight) {
                            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                        } else {
                            while (leftHeight > 0) {
                                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                                leftHeight -= pageHeight;
                                position -= 841.89;
                                //避免添加空白页
                                if (leftHeight > 0) {
                                    pdf.addPage();
                                }
                            }
                        }
                        pdf.save(title+'.pdf');
                    }
                })
            });
        }
    }];

    buildDetail({
        fields: fields,
        code: code,
        view:view,
        detailCode: '623093',
        // afterData: function () {
        //     if(download) {
        //         setTimeout(function () {
        //
        //         }, 0)
        //     }
        // }
    });

    $('label').css('display','none');



});