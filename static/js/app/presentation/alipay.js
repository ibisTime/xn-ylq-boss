$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623060",
        json: {
            userId: userId,
            key: 'INFO_ZHIFUBAO'
        }
    }).then(function (data) {
        hideLoading();
        data && $('.report-place .status').html('（' + OSS.reportFlagList[data.flag] + '）');
        data && $('.report-box .status').html('（' + OSS.reportFlagList[data.flag] + '）');
        if (data && data.result) {
          $('#code').html(data.ref);
          $('#validDatetime').html(dateTimeFormat(data.cerDatetime));
          data = JSON.parse(data.result);
          for (var k in data.userinfo) {
            $('#user_info_' + k).html(data.userinfo[k]);
          }
          $('#user_info_alipay_gender').html(data.userinfo.gender === 'MALE' ? '男' : '女');
          $('#user_info_certified').html(data.userinfo.certified === true ? '是' : '否');
          $('#user_info_register_time').html(data.userinfo.register_time.split('T')[0]);
          for (var k in data.wealth) {
              $('#wealth_' + k).html(data.wealth[k]);
          }
          $('#wealth_huabei_overdue').html(data.wealth.huabei_overdue === true ? '是' : '否');
          $('#wealth_yue').html(data.wealth.yue/100);
          $('#wealth_yeb').html(data.wealth.yeb/100);
          $('#wealth_zcb').html(data.wealth.zcb/100);
          $('#wealth_fund').html(data.wealth.fund/100);
          $('#wealth_cjb').html(data.wealth.cjb/100);
          $('#wealth_taolicai').html(data.wealth.taolicai/100);
          $('#wealth_huabai_limit').html(data.wealth.huabai_limit/100);
          $('#wealth_huabai_balance').html(data.wealth.huabai_balance/100);
          $('#wealth_huabei_overdue_amount').html(data.wealth.huabei_overdue_amount/100);
          $('#wealth_huabei_overdue_interest').html(data.wealth.huabei_overdue_interest/100);

          // 借呗额度信息
          if(data.alipayjiebei && Object.keys(data.alipayjiebei).length > 0) {
            $('#alipayjiebei').html(`<tr>
                        <td>借呗额度</td>
                        <td><i id="alipayjiebei_credit_amt"></i></td>
                    </tr>
                    <tr>
                        <td>借呗可用额度</td>
                        <td><i id="alipayjiebei_loanable_amt"></i></td>
                    </tr>
                    <tr>
                        <td>日利率</td>
                        <td><i id="alipayjiebei_risk_int_by_thousand"></i></td>
                    </tr>
                    <tr>
                        <td>是否逾期</td>
                        <td><i id="alipayjiebei_ovd_able"></i></td>
                    </tr>
                    <tr>
                        <td>是否未开通</td>
                        <td><i id="alipayjiebei_new_able"></i></td>
                    </tr>
                    <tr>
                        <td>绑定的手机号码</td>
                        <td><i id="alipayjiebei_binded_mobile"></i></td>
                    </tr>
                    <tr>
                        <td>未开通帮助描述</td>
                        <td><i id="alipayjiebei_refuse_reason"></i></td>
                    </tr>`);
            for (var k in data.alipayjiebei) {
              if(k === 'credit_amt' || k === 'loanable_amt') {
                $('#alipayjiebei_' + k).html(data.alipayjiebei[k]/100);
              } else {
                $('#alipayjiebei_' + k).html(data.alipayjiebei[k]);
              }
            }
            $('#alipayjiebei_ovd_able').html(data.alipayjiebei.ovd_able === true ? '是' : '否');
            $('#alipayjiebei_new_able').html(data.alipayjiebei.new_able === true ? '是' : '否');
          } else {
            $('#table_alipayjiebei').parent().empty();
          }

            // 主要支出 - 交易记录table_tradeinfo
            var table_tradeinfo_thead = '';
            var table_tradeinfo_tbody = '';
            var tradeinfo = data.tradeinfo; // 获取当前数据
            Object.keys(tradeinfo).forEach(function (d, i) {
                var tradeinfo_data = tradeinfo[d];// 获取当前行数据

                table_tradeinfo_tbody += '<tr>';
                // 遍历列
                Object.keys(tradeinfo_data).forEach(function (v, j) {
                  if(v!== 'mapping_id') {
                    if (i === 0) {
                      table_tradeinfo_thead += '<th>' + DictList.tradeinfo[v] + '</th>';
                    }
                    if(v === 'trade_amount' || v === 'service_charge' || v === 'refund') {
                      table_tradeinfo_tbody += '<td>' + tradeinfo_data[v]/100 + '</td>';
                    } else {
                      table_tradeinfo_tbody += '<td>' + tradeinfo_data[v] + '</td>';
                    }
                  }
                });
                table_tradeinfo_thead += '</tr>';
                table_tradeinfo_tbody += '</tr>';
            });
            $('#table_tradeinfo thead').html(table_tradeinfo_thead);
            $('#table_tradeinfo tbody').html(table_tradeinfo_tbody);

          // 主要支出 - 3.2银行卡信息bankinfo
          var table_bankinfo_html = '';
          if (data.bankinfo && data.bankinfo.length > 0) {
            $('#table_bankinfo thead').html(`<tr class="center hideborder" style="text-align: center">
                        <th>该银行卡预留的手机号码</th>
                        <th>该银行卡后4位</th>
                        <th>该银行卡绑定的姓名</th>
                        <th>该银行卡的银行名称</th>
                        <th>该银行卡类型</th>
                        <th>是否已开通快捷支付</th>
                    </tr>`);
            data.bankinfo.forEach(function (d, i) {
              d.open_fpcard = d.open_fpcard === true ? '是' : '否';
              table_bankinfo_html += '<tr class="center">' +
                '<td>' + d.mobile + '</td>' +
                '<td>' + d.card_number + '</td>' +
                '<td>' + d.user_name + '</td>' +
                '<td>' + d.bank_name + '</td>' +
                '<td>' + d.card_type + '</td>' +
                '<td>' + d.open_fpcard + '</td>' +
                '</tr>';
            });
          } else {
            $('#table_bankinfo').parent().empty();
          }
          $('#table_bankinfo tbody').html(table_bankinfo_html);

          // 主要支出 - 3.3收货地址信息table_alipaydeliveraddresses
          var table_alipaydeliveraddresses_thead = '';
          var table_alipaydeliveraddresses_tbody = '';
          var alipaydeliveraddresses = data.alipaydeliveraddresses; // 获取当前数据
          Object.keys(alipaydeliveraddresses).forEach(function (d, i) {
              var alipaydeliveraddresses_data = alipaydeliveraddresses[d];// 获取当前行数据

              table_alipaydeliveraddresses_tbody += '<tr>';
              // 遍历列
              Object.keys(alipaydeliveraddresses_data).forEach(function (v, j) {
                if(v!== 'mapping_id') {
                  if (i === 0) {
                    table_alipaydeliveraddresses_thead += '<th>' + DictList.alipaydeliveraddresses[v] + '</th>';
                  }
                  table_alipaydeliveraddresses_tbody += '<td>' + alipaydeliveraddresses_data[v] + '</td>';
                }
              });
              table_alipaydeliveraddresses_thead += '</tr>';
              table_alipaydeliveraddresses_tbody += '</tr>';
          });
          $('#table_alipaydeliveraddresses thead').html(table_alipaydeliveraddresses_thead);
          $('#table_alipaydeliveraddresses tbody').html(table_alipaydeliveraddresses_tbody);

          // 主要支出 - 3.4 联系人  table_alipaycontact
          var table_alipaycontact_thead = '';
          var table_alipaycontact_tbody = '';
          var alipaycontact = data.alipaycontacts; // 获取当前数据
          Object.keys(alipaycontact).forEach(function (d, i) {
              var alipaycontact_data = alipaycontact[d];// 获取当前行数据
              table_alipaycontact_tbody += '<tr>';
              // 遍历列
              Object.keys(alipaycontact_data).forEach(function (v, j) {
                if(v!== 'mapping_id') {
                  if (i === 0) {
                    table_alipaycontact_thead += '<th>' + DictList.alipaycontact[v] + '</th>';
                  }
                  table_alipaycontact_tbody += '<td>' + alipaycontact_data[v] + '</td>';
                }
              });
              table_alipaycontact_thead += '</tr>';
              table_alipaycontact_tbody += '</tr>';
          });
          $('#table_alipaycontact thead').html(table_alipaycontact_thead);
          $('#table_alipaycontact tbody').html(table_alipaycontact_tbody);

          // 主要支出 - 3.5 最近交易人recenttraders
          var table_recenttraders_thead = '';
          var table_recenttraders_tbody = '';
          var recenttraders = data.recenttraders; // 获取当前数据
          Object.keys(recenttraders).forEach(function (d, i) {
              var recenttraders_data = recenttraders[d];// 获取当前行数据
              table_recenttraders_tbody += '<tr>';
              // 遍历列
              Object.keys(recenttraders_data).forEach(function (v, j) {
                if(v!== 'mapping_id') {
                  if (i === 0) {
                    table_recenttraders_thead += '<th>' + DictList.recenttraders[v] + '</th>';
                  }
                  table_recenttraders_tbody += '<td>' + recenttraders_data[v] + '</td>';
                }
              });
              table_recenttraders_thead += '</tr>';
              table_recenttraders_tbody += '</tr>';
          });
          $('#table_recenttraders thead').html(table_recenttraders_thead);
          $('#table_recenttraders tbody').html(table_recenttraders_tbody);


          // 流入资金 - 4.1水电煤缴费信息table_jiaofeiinfo
          var table_jiaofeiinfo_thead = '';
          var table_jiaofeiinfo_tbody = '';
          var jiaofeiinfo = data.jiaofeiinfo; // 获取当前数据
          jiaofeiinfo && Object.keys(jiaofeiinfo).forEach(function (d, i) {
              var jiaofeiinfo_data = jiaofeiinfo[d];// 获取当前行数据
              table_jiaofeiinfo_tbody += '<tr>';
              // 遍历列
              Object.keys(jiaofeiinfo_data).forEach(function (v, j) {
                if(v!== 'mapping_id') {
                  if (i === 0) {
                    table_jiaofeiinfo_thead += '<th>' + DictList.jiaofeiinfo[v] + '</th>';
                  }
                  if(v === 'balance' || v === 'amount') {
                    table_jiaofeiinfo_tbody += '<td>' + jiaofeiinfo_data[v]/100 + '</td>';

                  } else {
                    table_jiaofeiinfo_tbody += '<td>' + jiaofeiinfo_data[v] + '</td>';
                  }
                }
              });
              table_jiaofeiinfo_thead += '</tr>';
              table_jiaofeiinfo_tbody += '</tr>';
          });
          $('#table_jiaofeiinfo thead').html(table_jiaofeiinfo_thead);
          $('#table_jiaofeiinfo tbody').html(table_jiaofeiinfo_tbody);

            // 流入资金 - 4.2 花呗和银行卡消费记录assetinfo
          var table_assetinfo_html = '';
          if (data.assetinfo && data.assetinfo.length > 0) {
            $('#table_assetinfo thead').html(`<tr class="center hideborder" style="text-align: center">
                        <th>交易单号</th>
                        <th>交易时间</th>
                        <th>交易详情</th>
                        <th>交易金额</th>
                        <th>交易类型</th>
                        <th>银行卡类型</th>
                        <th>银行卡尾号</th>
                        <th>银行名称英文缩写</th>
                    </tr>`);
            data.assetinfo.forEach(function (d, i) {
              table_assetinfo_html += '<tr class="center">' +
                '<td>' + d.trade_number + '</td>' +
                '<td>' + d.trade_time + '</td>' +
                '<td>' + d.trade_detail + '</td>' +
                '<td>' + d.trade_amount/100 + '</td>' +
                '<td>' + d.trade_type + '</td>' +
                '<td>' + d.asset_type + '</td>' +
                '<td>' + d.card_number + '</td>' +
                '<td>' + d.bank_name + '</td>' +
                '</tr>';
            });
          } else {
            $('#table_assetinfo').parent().empty();
          }
          $('#table_assetinfo tbody').html(table_assetinfo_html);


        }
    }, hideLoading);
});