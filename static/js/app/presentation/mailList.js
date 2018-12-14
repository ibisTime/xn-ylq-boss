$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    $('#tableList').bootstrapTable({
        columns: [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'name',
            title: '名称',
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '备注',
            field: 'remark'
        }],
        striped: true,
        singleSelect: true, //禁止多选
        clickToSelect: true, //自动选中
        uniqueId: 'id'
    });
    reqApi({
        code: "623060",
        json: {
            userId: userId,
            key: 'INFO_ADDRESS_BOOK'
        }
    }).then(function (data) {
        hideLoading();
        data && $('.report-place .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        if (data && data.result){
            data = JSON.parse(data.result);
            for (var i = 0; i <= data.length -1; i ++) {
                data[i] = {
                    id: i,
                    name: data[i].name,
                    mobile: data[i].mobile,
                    remark: data[i].remark
                };
            }
            $('#tableList').bootstrapTable('prepend', data)
        }
    }, hideLoading);

    //添加备注
    $('#addRemarkBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">添加备注</li></ul>' +
                '</form>'
        });

        dw.showModal();
        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'id',
                title: 'id',
                value: selRecords[0].id,
                hidden: true
            }, {
                field: 'remark1',
                title: '添加备注',
                value: selRecords[0].remark||"",
                required: true,
                maxlength: 250
            }],
            buttons: [{
                title: '添加备注',
                handler: function() {
                    if($('#popForm').valid()) {
                        var popFormData = $('#popForm').serializeObject();
                        var data = {};
                        data.remark = popFormData.remark1;
                        data.userId = userId;
                        data.id = popFormData.id;
                        reqApi({
                            code: '623065',
                            json: data
                        }).done(function (data) {
                            location.reload(true);
                            dw.close().remove();
                        });
                    }
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });

        dw.__center();

    });
});