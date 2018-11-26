$(function() {
    var code = getQueryString('code');

    var fields = [{
        title: '参数说明',
        field: 'remark',
        required: true,
        maxlength: 20,
        readonly: true
    },  {
        title: '参数值',
        field: 'cvalue',
        type: "textarea",
        required: true,
        maxlength: 255
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '623916',
        editCode: '623910',
        beforeSubmit:function(data){
            data.remark = $('#remark').text();
            return data
        }
    });
});