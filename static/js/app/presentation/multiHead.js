$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623063",
        json: {
            userId: userId
        }
    }).then(function (data) {
        hideLoading();
        if (data){
            data = JSON.parse(data);
            $("#person_info_name").html(data.person_info.name);
            $("#person_info_gender").html(data.person_info.gender);
            $("#person_info_idcard").html(data.person_info.idcard);
            $("#person_info_idcard_location").html(data.person_info.idcard_location);
            $("#person_info_age").html(data.person_info.age);
            $("#person_info_mobile").html(data.person_info.mobile);
            $("#person_info_carrier").html(data.person_info.carrier);
            $("#person_info_mobile_location").html(data.person_info.mobile_location);
            $("#person_info_email").html(data.person_info.email);
            $("#person_info_education_info_level").html(DictList.education_info[data.person_info.education_info.level]);
            $("#person_info_education_info_is_graduation").html(data.person_info.education_info.is_graduation ? '是' : '否');

            // 认证信息
            $('#register_info_other_count').html(data.auth_queried_detail.register_info.other_count);
            $('#register_info_org_count').html(data.auth_queried_detail.register_info.org_count);
            $('#register_info_org_types').html(data.auth_queried_detail.register_info.org_types);
            $('#queried_detail_org_count').html(data.auth_queried_detail.queried_detail_org_count);
            $('#queried_analyze_org_type').html(DictList.searched_org_type[data.auth_queried_detail.queried_analyze.org_type]);
            $('#queried_analyze_loan_cnt_15d').html(data.auth_queried_detail.queried_analyze.loan_cnt_15d);
            $('#queried_analyze_loan_cnt_30d').html(data.auth_queried_detail.queried_analyze.loan_cnt_30d);
            $('#queried_analyze_loan_cnt_90d').html(data.auth_queried_detail.queried_analyze.loan_cnt_90d);
            $('#queried_analyze_loan_cnt_180d').html(data.auth_queried_detail.queried_analyze.loan_cnt_180d);
            $('#queried_infos_date').html(data.auth_queried_detail.queried_infos.date);
            $('#queried_infos_org_type').html(DictList.searched_org_type[data.auth_queried_detail.queried_infos.org_type]);
            $('#queried_infos_is_self').html(data.auth_queried_detail.queried_infos.is_self);
            $('#loan_org_cnt_all').html(data.auth_queried_detail.loan_org_cnt_all);
            $('#loan_info_loan_org_cnt').html(data.auth_queried_detail.loan_info.loan_org_cnt);
            $('#loan_info_loan_cnt').html(data.auth_queried_detail.loan_info.loan_cnt);
            $('#loan_info_loan_org_cnt_15d').html(data.auth_queried_detail.loan_info.loan_org_cnt_15d);
            $('#loan_info_loan_org_cnt_30d').html(data.auth_queried_detail.loan_info.loan_org_cnt_30d);
            $('#loan_info_loan_org_cnt_90d').html(data.auth_queried_detail.loan_info.loan_org_cnt_90d);
            $('#loan_info_loan_org_cnt_180d').html(data.auth_queried_detail.loan_info.loan_org_cnt_180d);
            $('#loan_info_loan_cnt_15d').html(data.auth_queried_detail.loan_info.loan_org_cnt_15d);
            $('#loan_info_loan_cnt_30d').html(data.auth_queried_detail.loan_info.loan_org_cnt_30d);
            $('#loan_info_loan_cnt_90d').html(data.auth_queried_detail.loan_info.loan_org_cnt_90d);
            $('#loan_info_loan_cnt_180d').html(data.auth_queried_detail.loan_info.loan_org_cnt_180d);

        }
    }, hideLoading);
});