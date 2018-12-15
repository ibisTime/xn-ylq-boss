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
        data && $('.report-box .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
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

            // 联系人手机号码归属地(3月/6月)
            var table_contact_region_3m_html = '';
            var table_contact_region_6m_html = '';
            data.contact_region.forEach(function (r) {
                if (r.key === 'contact_region_3m') {
                    if (r.region_list.length > 0) {
                        r.region_list.forEach(function (d, i) {
                            table_contact_region_3m_html += '<tr class="center">' +
                                '<td>' + d.region_loc + '</td>' +
                                '<td>' + d.region_call_cnt + '</td>' +
                                '<td>' + d.region_uniq_num_cnt + '</td>' +
                                '<td>' + d.region_call_time + '</td>' +
                                '<td>' + d.region_dial_cnt + '</td>' +
                                '<td>' + d.region_dialed_cnt + '</td>' +
                                '<td>' + d.region_dial_time + '</td>' +
                                '<td>' + d.region_dialed_time + '</td>' +
                                '<td>' + d.region_avg_dial_time + '</td>' +
                                '<td>' + d.region_avg_dialed_time + '</td>' +
                                '<td>' + d.region_dial_cnt_pct + '</td>' +
                                '<td>' + d.region_dialed_cnt_pct + '</td>' +
                                '<td>' + d.region_dial_time_pct + '</td>' +
                                '<td>' + d.region_dialed_time_pct + '</td>' +
                                '</tr>';
                        });
                    } else {
                        table_contact_region_3m_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
                    }
                } else if (r.key === 'contact_region_6m') {
                    if (r.region_list.length > 0) {
                        r.region_list.forEach(function (d, i) {
                            table_contact_region_6m_html += '<tr class="center">' +
                                '<td>' + d.region_loc + '</td>' +
                                '<td>' + d.region_call_cnt + '</td>' +
                                '<td>' + d.region_uniq_num_cnt + '</td>' +
                                '<td>' + d.region_call_time + '</td>' +
                                '<td>' + d.region_dial_cnt + '</td>' +
                                '<td>' + d.region_dialed_cnt + '</td>' +
                                '<td>' + d.region_dial_time + '</td>' +
                                '<td>' + d.region_dialed_time + '</td>' +
                                '<td>' + d.region_avg_dial_time + '</td>' +
                                '<td>' + d.region_avg_dialed_time + '</td>' +
                                '<td>' + d.region_dial_cnt_pct + '</td>' +
                                '<td>' + d.region_dialed_cnt_pct + '</td>' +
                                '<td>' + d.region_dial_time_pct + '</td>' +
                                '<td>' + d.region_dialed_time_pct + '</td>' +
                                '</tr>';
                        });
                    } else {
                        table_contact_region_6m_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
                    }
                }
            });
            $('#table_contact_region_3m tbody').html(table_contact_region_3m_html);
            $('#table_contact_region_6m tbody').html(table_contact_region_6m_html);

            // 通话时间详细统计
            var table_call_time_detail_html = '';
            if (data.call_time_detail.length > 0) {
                data.call_time_detail.forEach(function (d, i) {
                    table_call_time_detail_html += '<tr class="center">' +
                        '<td>' + d.app_point_zh + '</td>' +
                        '<td>' + d.item.item_1m + '</td>' +
                        '<td>' + d.item.item_3m + '</td>' +
                        '<td>' + d.item.item_6m + '</td>' +
                        '<td>' + d.item.avg_item_3m + '</td>' +
                        '<td>' + d.item.avg_item_6m + '</td>' +
                        '</tr>';
                });
            } else {
                table_call_time_detail_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_call_time_detail tbody').html(table_call_time_detail_html);

            // 风险统计 通话风险
            var table_call_risk_analysis_html = '';
            if (data.call_risk_analysis.length > 0) {
                data.call_risk_analysis.forEach(function (d, i) {
                    table_call_risk_analysis_html += '<tr class="center">' +
                        '<td>与' + d.analysis_desc + '通话次数</td>' +
                        '<td>' + d.analysis_point.call_cnt_1m + '</td>' +
                        '<td>' + d.analysis_point.call_cnt_3m + '</td>' +
                        '<td>' + d.analysis_point.call_cnt_6m + '</td>' +
                        '<td>' + d.analysis_point.avg_call_time_3m + '</td>' +
                        '<td>' + d.analysis_point.avg_call_time_6m + '</td>' +
                        '</tr>';
                    table_call_risk_analysis_html += '<tr class="center">' +
                        '<td>与' + d.analysis_desc + '通话时长(秒)</td>' +
                        '<td>' + d.analysis_point.call_time_1m + '</td>' +
                        '<td>' + d.analysis_point.call_time_3m + '</td>' +
                        '<td>' + d.analysis_point.call_time_6m + '</td>' +
                        '<td>' + d.analysis_point.avg_call_time_3m + '</td>' +
                        '<td>' + d.analysis_point.avg_call_time_6m + '</td>' +
                        '</tr>';
                });
            } else {
                table_call_risk_analysis_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_call_risk_analysis tbody').html(table_call_risk_analysis_html);

            // 稳定性 亲情号通话分析项
            var table_call_family_detail_html = '';
            if (data.call_family_detail.length > 0) {
                data.call_family_detail.forEach(function (d, i) {
                    table_call_family_detail_html += '<tr class="center">' +
                        '<td>' + d.app_point_zh + '</td>' +
                        '<td>' + d.item.item_1m + '</td>' +
                        '<td>' + d.item.item_3m + '</td>' +
                        '<td>' + d.item.item_6m + '</td>' +
                        '</tr>';
                });
            } else {
                table_call_family_detail_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_call_family_detail tbody').html(table_call_family_detail_html);

            // 常用服务 通话服务
            var table_call_service_analysis_html = '';
            if (data.call_service_analysis.length > 0) {
                data.call_service_analysis.forEach(function (d, i) {
                    table_call_service_analysis_html += '<tr class="center">' +
                        '<td>与' + d.analysis_desc + '通话次数</td>' +
                        '<td>' + d.analysis_point.call_cnt_1m + '</td>' +
                        '<td>' + d.analysis_point.call_cnt_3m + '</td>' +
                        '<td>' + d.analysis_point.call_cnt_6m + '</td>' +
                        '</tr>';
                    table_call_service_analysis_html += '<tr class="center">' +
                        '<td>与' + d.analysis_desc + '通话时长(秒)</td>' +
                        '<td>' + d.analysis_point.call_time_1m + '</td>' +
                        '<td>' + d.analysis_point.call_time_3m + '</td>' +
                        '<td>' + d.analysis_point.call_time_6m + '</td>' +
                        '</tr>';
                });
            } else {
                table_call_service_analysis_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_call_service_analysis tbody').html(table_call_service_analysis_html);

            // 与服务号通话详情
            var table_main_service_html = '';
            if (data.main_service.length > 0) {
                data.main_service.forEach(function (s) {
                    s.service_details.forEach(function (d) {
                        table_main_service_html += '<tr class="center">' +
                            '<td>' + s.service_num + '</td>' +
                            '<td>' + d.interact_mth + '</td>' +
                            '<td>' + d.interact_cnt + '</td>' +
                            '<td>' + d.interact_time + '</td>' +
                            '<td>' + d.dial_cnt + '</td>' +
                            '<td>' + d.dialed_cnt + '</td>' +
                            '<td>' + d.dial_time + '</td>' +
                            '<td>' + d.dialed_time + '</td>' +
                            '</tr>';
                    });
                });
            } else {
                table_main_service_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_main_service tbody').html(table_main_service_html);

            // 通话活跃
            var table_active_degree_html = '';
            if (data.active_degree.length > 0) {
                data.active_degree.forEach(function (d, i) {
                    table_active_degree_html += '<tr class="center">' +
                        '<td>' + d.app_point_zh + '</td>' +
                        '<td>' + d.item.item_1m + '</td>' +
                        '<td>' + d.item.item_3m + '</td>' +
                        '<td>' + d.item.item_6m + '</td>' +
                        '<td>' + d.item.avg_item_3m + '</td>' +
                        '<td>' + d.item.avg_item_6m + '</td>' +
                        '</tr>';
                });
            } else {
                table_active_degree_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_active_degree tbody').html(table_active_degree_html);

            // 消费统计
            var table_consumption_detail_html = '';
            if (data.consumption_detail.length > 0) {
                data.consumption_detail.forEach(function (d, i) {
                    table_consumption_detail_html += '<tr class="center">' +
                        '<td>' + d.app_point_zh + '</td>' +
                        '<td>' + d.item.item_1m + '</td>' +
                        '<td>' + d.item.item_3m + '</td>' +
                        '<td>' + d.item.item_6m + '</td>' +
                        '<td>' + d.item.avg_item_3m + '</td>' +
                        '<td>' + d.item.avg_item_6m + '</td>' +
                        '</tr>';
                });
            } else {
                table_consumption_detail_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_consumption_detail tbody').html(table_consumption_detail_html);

            // 漫游详情统计
            var table_roam_detail_html = '';
            if (data.roam_detail.length > 0) {
                data.roam_detail.forEach(function (d, i) {
                    table_roam_detail_html += '<tr class="center">' +
                        '<td>' + d.roam_day + '</td>' +
                        '<td>' + d.roam_location + '</td>' +
                        '</tr>';
                });
            } else {
                table_roam_detail_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_roam_detail tbody').html(table_roam_detail_html);

            // 出行数据分析
            var table_trip_info_html = '';
            if (data.trip_info.length > 0) {
                data.trip_info.forEach(function (d, i) {
                    table_trip_info_html += '<tr class="center">' +
                        '<td>' + d.trip_leave + '</td>' +
                        '<td>' + d.trip_dest + '</td>' +
                        '<td>' + d.trip_start_time + '</td>' +
                        '<td>' + d.trip_end_time + '</td>' +
                        '<td>' + d.trip_type + '</td>' +
                        '</tr>';
                });
            } else {
                table_trip_info_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_trip_info tbody').html(table_trip_info_html);
        }
    }, hideLoading);
});