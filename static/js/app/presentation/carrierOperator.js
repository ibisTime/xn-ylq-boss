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
            $('#code').html(data.ref);
            $('#validDatetime').html(dateTimeFormat(data.validDatetime));
            data = JSON.parse(data.result);
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

            // 电话号码组合过其他身份证
            var phone_with_other_idcards_html = '';
            if (data.user_info_check[0].check_search_info.phone_with_other_idcards.length > 0) {
                data.user_info_check[0].check_search_info.phone_with_other_idcards.forEach(function (d, i) {
                    phone_with_other_idcards_html += d;
                    if (data.user_info_check[0].check_search_info.phone_with_other_idcards.length-1 > i) {
                        phone_with_other_idcards_html += ','
                    }
                });
            }
            $('#userInfoCheck_search_phone_with_other_idcards').html(phone_with_other_idcards_html);

            // 电话号码注册过的相关企业数量
            $('#userInfoCheck_search_register_org_cnt').html(data.user_info_check[0].check_search_info.register_org_cnt);

            // 电话号码注册过的相关企业类型
            $('#userInfoCheck_search_register_org_type').html(DictList.searched_org_type[data.user_info_check[0].check_search_info.register_org_type]);

            // 电话号码出现过的公开信息网站
            $('#userInfoCheck_search_arised_open_web').html(data.user_info_check[0].check_search_info.arised_open_web);

            // 用户信息检测(黑名单)
            if (data.user_info_check[0].check_black_info) {
                var check_black_info = data.user_info_check[0].check_black_info;
                Object.keys(check_black_info).forEach(function (d) {
                    $('#checkBlackInfo_'+ d).html(check_black_info[d]);
                });
            }

            // 数据来源
            var table_report_html = '';
            if (data.report.length > 0) {
                var source_name_zh = '';
                var data_type = '';
                var data_gain_time = '';
                data.report.forEach(function (d) {
                    if(d.key === 'source_name_zh') {
                        source_name_zh = d.value;
                    }
                    if(d.key === 'data_type') {
                        data_type = d.value;
                    }
                    if(d.key === 'data_gain_time') {
                        data_gain_time = d.value;
                    }
                });
                table_report_html += '<tr class="center">' +
                    '<td>' + source_name_zh + '</td>' +
                    '<td>' + data_type + '</td>' +
                    '<td>' + data_gain_time + '</td>' +
                    '</tr>';
            } else {
                table_report_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_report tbody').html(table_report_html);


            // 信息校验
            if (data.basic_check_items.length > 0) {
                data.basic_check_items.forEach(function (d, i) {
                    // 身份证号码有效性
                    if (d.check_item === 'idcard_check') {
                        $('#table_basic_check_items .td1_1').html(d.result);
                    }
                    // 邮箱有效性
                    if (d.check_item === 'email_check') {
                        $('#table_basic_check_items .td2_1').html(d.result);
                    }
                    // 通讯地址有效性
                    if (d.check_item === 'address_check') {
                        $('#table_basic_check_items .td3_1').html(d.result);
                    }

                    // 身份证号码是否与运营商数据匹配
                    if (d.check_item === 'idcard_match') {
                        $('#table_basic_check_items .td4_1').html(d.result);
                    }

                    // 姓名是否与运营商数据匹配
                    if (d.check_item === 'name_match') {
                        $('#table_basic_check_items .td5_1').html(d.result);
                    }

                    // 通话记录完整性
                    if (d.check_item === 'call_data_check') {
                        $('#table_basic_check_items .td6_1').html(d.result);
                    }
                });
            }

            // 朋友圈
            if (data.friend_circle['summary'].length > 0) {
                data.friend_circle['summary'].forEach(function (d, i) {
                    // 朋友圈大小 近3月联系号码数
                    if (d.key === 'friend_num_3m') {
                        $('#table_friend_circle_summary .td1_1').html(d.value);
                    }
                    // 朋友圈大小 近6月联系号码数
                    if (d.key === 'friend_num_6m') {
                        $('#table_friend_circle_summary .td1_2').html(d.value);
                    }
                    // 朋友圈亲密度 近3月联系十次以上的号码数量
                    if (d.key === 'good_friend_num_3m') {
                        $('#table_friend_circle_summary .td2_1').html(d.value);
                    }

                    // 朋友圈亲密度 近6月联系十次以上的号码数量
                    if (d.key === 'good_friend_num_6m') {
                        $('#table_friend_circle_summary .td2_2').html(d.value);
                    }

                    // 朋友圈中心地 近3月联系次数最多的归属地
                    if (d.key === 'friend_city_center_3m') {
                        $('#table_friend_circle_summary .td3_1').html(d.value);
                    }

                    // 朋友圈中心地 近6月联系次数最多的归属地
                    if (d.key === 'friend_city_center_6m') {
                        $('#table_friend_circle_summary .td3_2').html(d.value);
                    }

                    // 朋友圈是否在本地 近3月朋友圈中心地是否与手机归属地一致
                    if (d.key === 'is_city_match_friend_city_center_3m') {
                        $('#table_friend_circle_summary .td4_1').html(d.value);
                    }

                    // 朋友圈是否在本地 近6月朋友圈中心地是否与手机归属地一致
                    if (d.key === 'is_city_match_friend_city_center_6m') {
                        $('#table_friend_circle_summary .td4_2').html(d.value);
                    }

                    // 互通电话的号码数目 近3月互有主叫和被叫的联系人电话号码数目(去重)
                    if (d.key === 'inter_peer_num_3m') {
                        $('#table_friend_circle_summary .td5_1').html(d.value);
                    }

                    // 互通电话的号码数目 近6月互有主叫和被叫的联系人电话号码数目(去重)
                    if (d.key === 'inter_peer_num_6m') {
                        $('#table_friend_circle_summary .td5_2').html(d.value);
                    }
                });
            }

            // 联系人Top3 (近3/6月通话次数降序)
            var table_friend_circle_peer_top3_3m_html = '';
            var table_friend_circle_peer_top3_6m_html = '';

            if (data.friend_circle.peer_num_top_list.length > 0) {
                data.friend_circle.peer_num_top_list.forEach(function (f, i) {
                    if(f.key === 'peer_num_top3_3m' && f.top_item.length > 0) {
                        f.top_item.forEach(function (d, i) {
                            table_friend_circle_peer_top3_3m_html += '<tr class="center">' +
                                '<td>' + d.peer_number + '</td>' +
                                '<td>' + d.peer_num_loc + '</td>' +
                                '<td>' + d.call_cnt + '</td>' +
                                '<td>' + d.call_time + '</td>' +
                                '<td>' + d.dial_cnt + '</td>' +
                                '<td>' + d.dialed_cnt + '</td>' +
                                '</tr>';
                        })
                    } else if(f.key === 'peer_num_top3_3m') {
                        table_friend_circle_peer_top3_3m_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
                    }

                    if(f.key === 'peer_num_top3_6m' && f.top_item.length > 0) {
                        f.top_item.forEach(function (d, i) {
                            table_friend_circle_peer_top3_6m_html += '<tr class="center">' +
                                '<td>' + d.peer_number + '</td>' +
                                '<td>' + d.peer_num_loc + '</td>' +
                                '<td>' + d.call_cnt + '</td>' +
                                '<td>' + d.call_time + '</td>' +
                                '<td>' + d.dial_cnt + '</td>' +
                                '<td>' + d.dialed_cnt + '</td>' +
                                '</tr>';
                        })
                    } else if(f.key === 'peer_num_top3_6m') {
                        table_friend_circle_peer_top3_6m_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
                    }
                });
            }
            $('#table_friend_circle_peer_top3_3m tbody').html(table_friend_circle_peer_top3_3m_html);
            $('#table_friend_circle_peer_top3_6m tbody').html(table_friend_circle_peer_top3_6m_html);

            // 联系人号码归属地Top3 (近3/6月通话次数降序)
            var table_friend_circle_loc_top3_3m_html = '';
            var table_friend_circle_loc_top3_6m_html = '';

            if (data.friend_circle.location_top_list.length > 0) {
                data.friend_circle.location_top_list.forEach(function (f, i) {
                    if(f.key === 'location_top3_3m' && f.top_item.length > 0) {
                        f.top_item.forEach(function (d, i) {
                            table_friend_circle_loc_top3_3m_html += '<tr class="center">' +
                                '<td>' + d.location + '</td>' +
                                '<td>' + d.call_cnt + '</td>' +
                                '<td>' + d.peer_number_cnt + '</td>' +
                                '<td>' + d.call_time + '</td>' +
                                '<td>' + d.dial_cnt + '</td>' +
                                '<td>' + d.dialed_cnt + '</td>' +
                                '</tr>';
                        })
                    } else if(f.key === 'location_top3_3m') {
                        table_friend_circle_loc_top3_3m_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
                    }

                    if(f.key === 'location_top3_6m' && f.top_item.length > 0) {
                        f.top_item.forEach(function (d, i) {
                            table_friend_circle_loc_top3_6m_html += '<tr class="center">' +
                                '<td>' + d.location + '</td>' +
                                '<td>' + d.call_cnt + '</td>' +
                                '<td>' + d.peer_number_cnt + '</td>' +
                                '<td>' + d.call_time + '</td>' +
                                '<td>' + d.dial_cnt + '</td>' +
                                '<td>' + d.dialed_cnt + '</td>' +
                                '</tr>';
                        })
                    } else if(f.key === 'location_top3_6m') {
                        table_friend_circle_loc_top3_6m_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
                    }
                });
            }
            $('#table_friend_circle_loc_top3_3m tbody').html(table_friend_circle_loc_top3_3m_html);
            $('#table_friend_circle_loc_top3_6m tbody').html(table_friend_circle_loc_top3_6m_html);

            // 风险识别
            if (data.basic_check_items.length > 0) {
                data.basic_check_items.forEach(function (d, i) {
                    // 号码沉默度 3月
                    if (d.check_item === 'mobile_silence_3m') {
                        $('#table_basic_check_items_info .info1_1').html(d.result);
                    }
                    // 号码沉默度 6月
                    if (d.check_item === 'mobile_silence_6m') {
                        $('#table_basic_check_items_info .info1_2').html(d.result);
                    }
                    // 欠费风险度 3月
                    if (d.check_item === 'arrearage_risk_3m') {
                        $('#table_basic_check_items_info .info2_1').html(d.result);
                    }
                    // 欠费风险度 6月
                    if (d.check_item === 'arrearage_risk_6m') {
                        $('#table_basic_check_items_info .info2_2').html(d.result);
                    }
                    // 亲情网风险度
                    if (d.check_item === 'binding_risk') {
                        $('#table_basic_check_items_info .info3_1').html(d.result);
                    }
                    // 申请人姓名+身份证号码是否出现在法院黑名单
                    if (d.check_item === 'is_name_and_idcard_in_court_black') {
                        $('#table_basic_check_items_result .result1').html(d.result);
                    }
                    // 申请人姓名+身份证号码是否出现在金融机构黑名单
                    if (d.check_item === 'is_name_and_idcard_in_finance_black') {
                        $('#table_basic_check_items_result .result2').html(d.result);
                    }
                    // 申请人姓名+手机号码是否出现在金融机构黑名单
                    if (d.check_item === 'is_name_and_mobile_in_finance_black') {
                        $('#table_basic_check_items_result .result3').html(d.result);
                    }
                });
            }

            // 风险联系
            var table_call_risk_analysis_contact_html = '';
            if (data.call_risk_analysis.length > 0) {
                data.call_risk_analysis.forEach(function (d, i) {
                    if(d.analysis_item === '110' || d.analysis_item === '120' || d.analysis_item === 'loan' ||
                        d.analysis_item === 'credit_card' || d.analysis_item === 'collection') {
                        table_call_risk_analysis_contact_html += '<tr class="center">' +
                            '<td>' + d.analysis_desc + '</td>' +
                            '<td>' + d.analysis_point.call_cnt_3m + '</td>' +
                            '<td>' + d.analysis_point.call_cnt_6m + '</td>' +
                            '<td>' + d.analysis_point.avg_call_time_3m + '</td>' +
                            '<td>' + d.analysis_point.avg_call_time_6m + '</td>' +
                            '</tr>';
                    }
                });
            } else {
                table_call_risk_analysis_contact_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_call_risk_analysis_contact tbody').html(table_call_risk_analysis_contact_html);

            // 活跃识别
            var table_active_degree_active_html = '';
            if (data.active_degree.length > 0) {
                data.active_degree.forEach(function (d, i) {
                    if(d.app_point === 'call_day' || d.app_point === 'dial_cnt' || d.app_point === 'dialed_cnt' ||
                        d.app_point === 'dial_time' || d.app_point === 'dialed_time') {
                        table_active_degree_active_html += '<tr class="center">' +
                            '<td>' + d.app_point_zh + '</td>' +
                            '<td>' + d.item.item_3m + '</td>' +
                            '<td>' + d.item.item_6m + '</td>' +
                            '</tr>';
                    }
                });
            } else {
                table_active_degree_active_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_active_degree_active tbody').html(table_active_degree_active_html);



            // 消费识别
            var table_consumption_detail_recognition_html = '';
            if (data.consumption_detail.length > 0) {
                data.consumption_detail.forEach(function (d, i) {
                    if (d.app_point === 'total_fee' || d.app_point === 'max_single_recharge') {
                        table_consumption_detail_recognition_html += '<tr class="center">' +
                            '<td>' + d.app_point_zh + '</td>' +
                            '<td>' + d.item.item_3m + '</td>' +
                            '<td>' + d.item.item_6m + '</td>' +
                            '</tr>';
                    }
                });
            }
            if (data.active_degree.length > 0) {
                data.active_degree.forEach(function (d, i) {
                    if (d.app_point === 'call_cnt') {
                        table_consumption_detail_recognition_html += '<tr class="center">' +
                            '<td>' + d.app_point_zh + '</td>' +
                            '<td>' + d.item.item_3m + '</td>' +
                            '<td>' + d.item.item_6m + '</td>' +
                            '</tr>';
                    }
                });
            }
            if (data.report.length > 0) {
                data.report.forEach(function (d, i) {
                    if (d.key === 'data_gain_time') {
                        table_consumption_detail_recognition_html += '<tr class="center">' +
                            '<td>账单最新认证时间</td>' +
                            '<td>' + d.value + '</td>' +
                            '<td>--</td>' +
                            '</tr>';
                    }
                });
            }
            $('#table_consumption_detail_recognition tbody').html(table_consumption_detail_recognition_html);

            // 消费细类统计
            var table_consumption_detail_statistics_html = '';
            if (data.consumption_detail.length > 0) {
                data.consumption_detail.forEach(function (d, i) {
                    if (d.app_point === 'net_fee' || d.app_point === 'voice_fee' ||
                        d.app_point === 'sms_fee' || d.app_point === 'vas_fee') {
                        table_consumption_detail_statistics_html += '<tr class="center">' +
                            '<td>' + d.app_point_zh + '</td>' +
                            '<td>' + d.item.item_1m + '</td>' +
                            '<td>' + d.item.item_3m + '</td>' +
                            '<td>' + d.item.item_6m + '</td>' +
                            '<td>' + d.item.avg_item_3m + '</td>' +
                            '<td>' + d.item.avg_item_6m + '</td>' +
                            '</tr>';
                    }
                });
            } else {
                table_consumption_detail_statistics_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_consumption_detail_statistics tbody').html(table_consumption_detail_statistics_html);

            // 运营商消费数据
            var table_cell_behavior_html = '';
            if (data.cell_behavior.length > 0) {
                if (data.cell_behavior[0].behavior.length > 0) {
                    data.cell_behavior[0].behavior.forEach(function (d) {
                        table_cell_behavior_html += '<tr class="center">' +
                            '<td>' + d.cell_operator_zh + '</td>' +
                            '<td>' + d.cell_phone_num + '</td>' +
                            '<td>' + d.cell_loc + '</td>' +
                            '<td>' + d.cell_mth + '</td>' +
                            '<td>' + d.call_cnt + '</td>' +
                            '<td>' + d.dial_cnt + '</td>' +
                            '<td>' + (d.dial_time / 60).toFixed(0) + '</td>' +
                            '<td>' + d.dialed_cnt + '</td>' +
                            '<td>' + (d.dialed_time / 60).toFixed(0) + '</td>' +
                            '<td>' + d.sms_cnt + '</td>' +
                            '<td>' + (d.total_amount / 100).toFixed(2) + '</td>' +
                            '</tr>';
                    });
                }
            } else {
                table_cell_behavior_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_cell_behavior tbody').html(table_cell_behavior_html);

            // 漫游分析摘要(近6月)
            var table_roam_analysis_html = '';
            if (data.roam_analysis.length > 0) {
                data.roam_analysis.forEach(function (d) {
                    table_roam_analysis_html += '<tr class="center">' +
                        '<td>' + d.roam_location + '</td>' +
                        '<td>' + d.roam_day_cnt_3m + '</td>' +
                        '<td>' + d.roam_day_cnt_6m + '</td>' +
                        '<td>' + d.continue_roam_cnt_3m + '</td>' +
                        '<td>' + d.continue_roam_cnt_6m + '</td>' +
                        '<td>' + d.max_roam_day_cnt_3m + '</td>' +
                        '<td>' + d.max_roam_day_cnt_6m + '</td>' +
                        '</tr>';
                });
            } else {
                table_roam_analysis_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_roam_analysis tbody').html(table_roam_analysis_html);

            // 通话社交 总体统计
            var table_active_degree_statistics_html = '';
            if (data.active_degree.length > 0) {
                data.active_degree.forEach(function (d, i) {
                    if(d.app_point === 'call_cnt' || d.app_point === 'peer_num_cnt' || d.app_point === 'peer_num_cnt' ||
                        d.app_point === 'peer_loc_cnt' || d.app_point === 'dial_cnt' || d.app_point === 'dialed_cnt' ||
                        d.app_point === 'dial_peer_num_cnt' || d.app_point === 'dialed_peer_num_cnt' || d.app_point === 'call_time') {
                        table_active_degree_statistics_html += '<tr class="center">' +
                            '<td>' + d.app_point_zh + '</td>' +
                            '<td>' + d.item.item_1m + '</td>' +
                            '<td>' + d.item.item_3m + '</td>' +
                            '<td>' + d.item.item_6m + '</td>' +
                            '<td>' + d.item.avg_item_3m + '</td>' +
                            '<td>' + d.item.avg_item_6m + '</td>' +
                            '</tr>';
                    }
                });
            } else {
                table_active_degree_statistics_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_active_degree_statistics tbody').html(table_active_degree_statistics_html);


            // 联系人
            var table_call_contact_detail_html = '';
            if (data.call_contact_detail.length > 0) {
                data.call_contact_detail.forEach(function (d, i) {
                    d.call_if_whole_day_3m = d.call_if_whole_day_3m ? '是' : '否';
                    d.call_if_whole_day_6m = d.call_if_whole_day_6m ? '是' : '否';
                    table_call_contact_detail_html += '<tr class="center">' +
                        '<td>' + d.peer_num + '</td>' +
                        '<td>' + d.company_name + '</td>' +
                        '<td>' + d.group_name + '</td>' +
                        '<td>' + d.city + '</td>' +
                        '<td>' + d.call_cnt_1w + '</td>' +
                        '<td>' + d.call_cnt_1m + '</td>' +
                        '<td>' + d.call_cnt_3m + '</td>' +
                        '<td>' + d.call_cnt_6m + '</td>' +
                        '<td>' + d.call_time_3m + '</td>' +
                        '<td>' + d.call_time_6m + '</td>' +
                        '<td>' + d.dial_cnt_3m + '</td>' +
                        '<td>' + d.dial_cnt_6m + '</td>' +
                        '<td>' + d.dialed_cnt_3m + '</td>' +
                        '<td>' + d.dialed_cnt_6m + '</td>' +
                        '<td>' + d.call_cnt_morning_3m + '</td>' +
                        '<td>' + d.call_cnt_morning_6m + '</td>' +
                        '<td>' + d.call_cnt_noon_3m + '</td>' +
                        '<td>' + d.call_cnt_noon_6m + '</td>' +
                        '<td>' + d.call_cnt_afternoon_3m + '</td>' +
                        '<td>' + d.call_cnt_afternoon_6m + '</td>' +
                        '<td>' + d.call_cnt_evening_3m + '</td>' +
                        '<td>' + d.call_cnt_evening_6m + '</td>' +
                        '<td>' + d.call_cnt_night_3m + '</td>' +
                        '<td>' + d.call_cnt_night_6m + '</td>' +
                        '<td>' + d.call_cnt_weekday_3m + '</td>' +
                        '<td>' + d.call_cnt_weekday_6m + '</td>' +
                        '<td>' + d.call_cnt_weekend_3m + '</td>' +
                        '<td>' + d.call_cnt_weekend_6m + '</td>' +
                        '<td>' + d.call_cnt_holiday_3m + '</td>' +
                        '<td>' + d.call_cnt_holiday_6m + '</td>' +
                        '<td>' + d.call_if_whole_day_3m + '</td>' +
                        '<td>' + d.call_if_whole_day_6m + '</td>' +
                        '</tr>';
                });
            } else {
                table_call_contact_detail_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
            }
            $('#table_call_contact_detail tbody').html(table_call_contact_detail_html);


            // 通话时段(3月/6月)
            var table_call_duration_detail_3m_html = '';
            var table_call_duration_detail_6m_html = '';
            data.call_duration_detail.forEach(function (r) {
                if (r.key === 'call_duration_detail_3m') {
                    if (r.duration_list.length > 0) {
                        r.duration_list.forEach(function (d, i) {
                            table_call_duration_detail_3m_html += '<tr class="center">' +
                                '<td>' + d.time_step_zh + '</td>' +
                                '<td>' + d.item.total_cnt + '</td>' +
                                '<td>' + d.item.uniq_num_cnt + '</td>' +
                                '<td>' + d.item.total_time + '</td>' +
                                '<td>' + d.item.dial_cnt + '</td>' +
                                '<td>' + d.item.dialed_cnt + '</td>' +
                                '<td>' + d.item.dial_time + '</td>' +
                                '<td>' + d.item.dialed_time + '</td>' +
                                '<td>' + d.item.latest_call_time + '</td>' +
                                '<td>' + d.item.farthest_call_time + '</td>' +
                                '</tr>';
                        });
                    } else {
                        table_call_duration_detail_3m_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
                    }
                } else if (r.key === 'call_duration_detail_6m') {
                    if (r.duration_list.length > 0) {
                        r.duration_list.forEach(function (d, i) {
                            table_call_duration_detail_6m_html += '<tr class="center">' +
                                '<td>' + d.time_step_zh + '</td>' +
                                '<td>' + d.item.total_cnt + '</td>' +
                                '<td>' + d.item.uniq_num_cnt + '</td>' +
                                '<td>' + d.item.total_time + '</td>' +
                                '<td>' + d.item.dial_cnt + '</td>' +
                                '<td>' + d.item.dialed_cnt + '</td>' +
                                '<td>' + d.item.dial_time + '</td>' +
                                '<td>' + d.item.dialed_time + '</td>' +
                                '<td>' + d.item.latest_call_time + '</td>' +
                                '<td>' + d.item.farthest_call_time + '</td>' +
                                '</tr>';
                        });
                    } else {
                        table_call_duration_detail_6m_html = '<tr class="center"><td colspan="5">暂无数据</td></tr>'
                    }
                }
            });
            $('#table_call_duration_detail_3m tbody').html(table_call_duration_detail_3m_html);
            $('#table_call_duration_detail_6m tbody').html(table_call_duration_detail_6m_html);


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