$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623060",
        json: {
            userId: userId,
            key: 'INFO_PERSONAL'
        }
    }).then(function (data) {
        hideLoading();
        data && $('.report-place .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        if (data && data.result){
            data = JSON.parse(data.result);
        }
        var fields = [{
            field: "education",
            title: '学历',
            formatter: function (v, data) {
                return data.basic ? Dict.getNameForList1('education', '', data.basic.education) : '';
            }
        }, {
            field: "marriage",
            title: '婚姻',
            formatter: function (v, data) {
                return data.basic ? Dict.getNameForList1('marriage', '',data.basic.marriage) : '';
            }
        }, {
            field: "childrenNum",
            title: '子女个数',
            formatter: function (v, data) {
                return data.basic ? data.basic.childrenNum : '';
            }
        }, {
            field: "address",
            title: '居住地址',
            formatter: function (v, data) {
                return data.basic ? data.basic.provinceCity + ' ' + data.basic.address : '';
            }
        }, {
            field: "liveTime",
            title: '居住时长',
            formatter: function (v, data) {
                return data.basic ? Dict.getNameForList1('live_time', '',data.basic.liveTime) : '';
            }
        }, {
            field: "wechat",
            title: '微信号',
            formatter: function (v, data) {
                return data.basic ? data.basic.wechat : '';
            }
        }, {
            field: "email",
            title: '电子邮箱',
            formatter: function (v, data) {
                return data.basic ? data.basic.email : '';
            }
        }, {
            type: 'blankLine',
            height: '20'
        }, {
            field: "occupation",
            title: '职业',
            formatter: function (v, data) {
                return data.occupation ? Dict.getNameForList1('occupation', '',data.occupation.occupation) : '';
            }
        }, {
            field: "income",
            title: '月收入',
            formatter: function (v, data) {
                return data.occupation ? Dict.getNameForList1('income', '',data.occupation.income) : '';
            }
        }, {
            field: "company",
            title: '单位名称',
            formatter: function (v, data) {
                return data.occupation ? data.occupation.company : '';
            }
        }, {
            field: "companyAddress",
            title: '单位地址',
            formatter: function (v, data) {
                return data.occupation ? data.occupation.address : '';
            }
        }, {
            field: "companyPhone",
            title: '单位电话',
            formatter: function (v, data) {
                return data.occupation ? data.occupation.phone : '';
            }
        }, {
            type: 'blankLine',
            height: '20'
        }, {
            field: "familyName",
            title: '紧急联系人1',
            formatter: function (v, data) {
                return data.contact ? data.contact.familyName : '';
            }
        }, {
            field: "familyRelation",
            title: '关系',
            formatter: function (v, data) {
                return data.contact ? Dict.getNameForList1('family_relation', '',data.contact.familyRelation) : '';
            }
        }, {
            field: "familyMobile",
            title: '联系方式',
            formatter: function (v, data) {
                return data.contact ? data.contact.familyMobile : '';
            }
        }, {
            type: 'blankLine',
            height: '20'
        }, {
            field: "societyName",
            title: '紧急联系人1',
            formatter: function (v, data) {
                return data.contact ? data.contact.societyName : '';
            }
        }, {
            field: "societyRelation",
            title: '关系',
            formatter: function (v, data) {
                return data.contact ? Dict.getNameForList1('society_relation', '',data.contact.societyRelation) : '';
            }
        }, {
            field: "societyMobile",
            title: '联系方式',
            formatter: function (v, data) {
                return data.contact ? data.contact.societyMobile : '';
            }
        }];

        buildDetail({
            fields: fields,
            view: true,
            userDate: data,
            buttons: []
        });
    }, hideLoading);
});