$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623060",
        json: {
            userId: userId,
            key: 'INFO_CARRIER'
        }
    }).then(function (data) {
        hideLoading();
        data && $('.report-place .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        if (data && data.result){
            data = JSON.parse(data.result);
            // var data = result;
            $('#code').html(data.ref);
            $('#validDatetime').html(dateTimeFormat(data.validDatetime));
            data.user_basic.forEach(function (d, i) {
                $('#userBasic_'+ d.key).html(d.value);
            });
            data.cell_phone.forEach(function (d, i) {
                if(d.key === 'available_balance') {
                    d.value = (d.value / 100).toFixed(2);
                }
                $('#cellPhone_'+ d.key).html(d.value);
            });
            // 查询过该用户的相关企业数量
            $('#userInfoCheck_search_searched_org_cnt').html(data.user_info_check[0].check_search_info.searched_org_cnt);

            // 查询过该用户的相关企业类型
            var searched_org_type_html = '';
            if (data.user_info_check[0].check_search_info.searched_org_type.length > 0) {
                data.user_info_check[0].check_search_info.searched_org_type.forEach(function (d, i) {
                    searched_org_type_html += DictList.searched_org_type[d];
                });
            }
            $('#userInfoCheck_search_searched_org_type').html(searched_org_type_html);

            // 身份证组合过的其他姓名
            var idcard_with_other_names_html = '';
            if (data.user_info_check[0].check_search_info.idcard_with_other_names.length > 0) {
                data.user_info_check[0].check_search_info.idcard_with_other_names.forEach(function (d, i) {
                    idcard_with_other_names_html += d;
                    if (data.user_info_check[0].check_search_info.idcard_with_other_names.length-1 > i) {
                        idcard_with_other_names_html += ','
                    }
                });
            }
            $('#userInfoCheck_search_idcard_with_other_names').html(idcard_with_other_names_html);

            // 身份证组合过其他电话
            var idcard_with_other_phones_html = '';
            if (data.user_info_check[0].check_search_info.idcard_with_other_phones.length > 0) {
                data.user_info_check[0].check_search_info.idcard_with_other_phones.forEach(function (d, i) {
                    idcard_with_other_phones_html += d;
                    if (data.user_info_check[0].check_search_info.idcard_with_other_phones.length-1 > i) {
                        idcard_with_other_phones_html += ','
                    }
                });
            }
            $('#userInfoCheck_search_idcard_with_other_phones').html(idcard_with_other_phones_html);

            // 电话号码组合过其他姓名
            var phone_with_other_names_html = '';
            if (data.user_info_check[0].check_search_info.phone_with_other_names.length > 0) {
                data.user_info_check[0].check_search_info.phone_with_other_names.forEach(function (d, i) {
                    phone_with_other_names_html += d;
                    if (data.user_info_check[0].check_search_info.phone_with_other_names.length-1 > i) {
                        phone_with_other_names_html += ','
                    }
                });
            }
            $('#userInfoCheck_search_phone_with_other_names').html(phone_with_other_names_html);
        }
    }, hideLoading);
});