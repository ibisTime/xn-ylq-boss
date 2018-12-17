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
        data && $('.report-place .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        data && $('.report-box .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        if (data && data.result){
            data = JSON.parse(data.result);
            $('#code').html(data.ref);
            $('#validDatetime').html(dateTimeFormat(data.validDatetime));
            for(var k in data.basic_info.user_and_account_basic_info){
              $('#basic_info_'+ k).html(data.basic_info.user_and_account_basic_info[k]);
              $('#basic_info_alipay_gender').html(data.basic_info.user_and_account_basic_info.alipay_gender === 'MALE' ? '男' : '女')
            }

          for(var k in data.wealth_info.total_assets){
            $('#total_assets_'+ k).html(data.wealth_info.total_assets[k]);
          }

            // 主要支出 - 总资产
            var table_major_expenditure_repayment_thead = '';
            var table_major_expenditure_repayment_tbody = '';
            var major_expenditure_repayment = data.major_expenditure.repayment; // 获取当前数据
            Object.keys(major_expenditure_repayment).forEach(function (d, i) {
                var major_expenditure_repayment_data = major_expenditure_repayment[d];// 获取当前行数据

                table_major_expenditure_repayment_tbody += '<tr>' +
                    '<td>' + DictList.major_expenditure_repayment[d] + '</td>';
                if (i === 0) {
                    table_major_expenditure_repayment_thead = '<tr>' +
                        '<th>月份</th>';
                }
                // 遍历列
                Object.keys(major_expenditure_repayment_data).forEach(function (v, j) {
                    if (i === 0) {
                        table_major_expenditure_repayment_thead += '<th>' + v + '</th>';
                    }
                    table_major_expenditure_repayment_tbody += '<td>' + major_expenditure_repayment_data[v] + '</td>';
                });
                table_major_expenditure_repayment_thead += '</tr>';
                table_major_expenditure_repayment_tbody += '</tr>';
            });
            $('#table_major_expenditure_repayment thead').html(table_major_expenditure_repayment_thead);
            $('#table_major_expenditure_repayment tbody').html(table_major_expenditure_repayment_tbody);

            // 主要支出 - 3.2消费
          var table_major_expenditure_consumption_thead = '';
          var table_major_expenditure_consumption_tbody = '';
          var major_expenditure_consumption = data.major_expenditure.consumption; // 获取当前数据
          Object.keys(major_expenditure_consumption).forEach(function (d, i) {
            var major_expenditure_consumption_data = major_expenditure_consumption[d];// 获取当前行数据

            table_major_expenditure_consumption_tbody += '<tr>' +
              '<td>' + DictList.major_expenditure_consumption[d] + '</td>';
            if (i === 0) {
              table_major_expenditure_consumption_thead = '<tr>' +
                '<th>月份</th>';
            }
            // 遍历列
            Object.keys(major_expenditure_consumption_data).forEach(function (v, j) {
              if (i === 0) {
                table_major_expenditure_consumption_thead += '<th>' + v + '</th>';
              }
              table_major_expenditure_consumption_tbody += '<td>' + major_expenditure_consumption_data[v] + '</td>';
            });
            table_major_expenditure_consumption_thead += '</tr>';
            table_major_expenditure_consumption_tbody += '</tr>';
          });
          $('#table_major_expenditure_consumption thead').html(table_major_expenditure_consumption_thead);
          $('#table_major_expenditure_consumption tbody').html(table_major_expenditure_consumption_tbody);

          // 主要支出 - 3.3转账-转出table_major_expenditure_transfer_out_info
          var table_major_expenditure_transfer_out_info_thead = '';
          var table_major_expenditure_transfer_out_info_tbody = '';
          var major_expenditure_transfer_out_info = data.major_expenditure.transfer_out_info; // 获取当前数据
          Object.keys(major_expenditure_transfer_out_info).forEach(function (d, i) {
            var major_expenditure_transfer_out_info_data = major_expenditure_transfer_out_info[d];// 获取当前行数据

            table_major_expenditure_transfer_out_info_tbody += '<tr>' +
              '<td>' + DictList.major_expenditure_transfer_out_info[d] + '</td>';
            if (i === 0) {
              table_major_expenditure_transfer_out_info_thead = '<tr>' +
                '<th>月份</th>';
            }
            // 遍历列
            Object.keys(major_expenditure_transfer_out_info_data).forEach(function (v, j) {
              if (i === 0) {
                table_major_expenditure_transfer_out_info_thead += '<th>' + v + '</th>';
              }
              table_major_expenditure_transfer_out_info_tbody += '<td>' + major_expenditure_transfer_out_info_data[v] + '</td>';
            });
            table_major_expenditure_transfer_out_info_thead += '</tr>';
            table_major_expenditure_transfer_out_info_tbody += '</tr>';
          });
          $('#table_major_expenditure_transfer_out_info thead').html(table_major_expenditure_transfer_out_info_thead);
          $('#table_major_expenditure_transfer_out_info tbody').html(table_major_expenditure_transfer_out_info_tbody);

          // 主要支出 - 3.4 理财  major_expenditure_financial
          var table_major_expenditure_financial_thead = '';
          var table_major_expenditure_financial_tbody = '';
          var major_expenditure_financial = data.major_expenditure.financial; // 获取当前数据
          Object.keys(major_expenditure_financial).forEach(function (d, i) {
            var major_expenditure_financial_data = major_expenditure_financial[d];// 获取当前行数据

            table_major_expenditure_financial_tbody += '<tr>' +
              '<td>' + DictList.major_expenditure_financial[d] + '</td>';
            if (i === 0) {
              table_major_expenditure_financial_thead = '<tr>' +
                '<th>月份</th>';
            }
            // 遍历列
            Object.keys(major_expenditure_financial_data).forEach(function (v, j) {
              if (i === 0) {
                table_major_expenditure_financial_thead += '<th>' + v + '</th>';
              }
              table_major_expenditure_financial_tbody += '<td>' + major_expenditure_financial_data[v] + '</td>';
            });
            table_major_expenditure_financial_thead += '</tr>';
            table_major_expenditure_financial_tbody += '</tr>';
          });
          $('#table_major_expenditure_financial thead').html(table_major_expenditure_financial_thead);
          $('#table_major_expenditure_financial tbody').html(table_major_expenditure_financial_tbody);
        }
    }, hideLoading);
});