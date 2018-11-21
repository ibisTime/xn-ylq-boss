 $(function() {
    var userId = getQueryString('userId');
    var html, html1, html2, html3, html4, html5, html6, html7, html8,
        infoBasic, infoContact, infoOccupation, infoBankcard, infoCarrier, infoIdentify,
        infoAntifraud, infoIdentifyPic, infoZMCredit, infoIdentifyFace, infoAddressBook,
        infoAntifraudFlag, infoAddressBookFlag, infoZMCreditFlag, infoCarrierFlag,
        infoBasicFlag, infoIdentifyFlag, infoIdentifyFaceFlag, infoIdentifyPicFlag,
        infoOccupationFlag, infoContactFlag, infoBankcardFlag;

    var verifyInfo = "",
        riskInfoList="",
        td_data = {},
        person_info = {};

    loading.createLoading();
    
    
    reqApi({
        code:"623050" ,
        json:{userId:userId}
    }).then(function(data){
        loading.hideLoading();
        infoBasic = data.infoBasic;
        infoContact = data.infoContact;
        infoOccupation = data.infoOccupation;
        infoBankcard = data.infoBankcard;
        infoIdentify = data.infoIdentify;
        infoAntifraud = data.infoAntifraud;
        infoIdentifyPic = data.infoIdentifyPic;
        infoZMCredit = data.infoZMCredit;
        infoIdentifyFace = data.infoIdentifyFace;
        infoCarrier = data.infoCarrier;
        infoAddressBook = data.infoAddressBook

        infoAntifraudFlag = data.infoAntifraudFlag;
        infoAddressBookFlag =  data.infoAddressBookFlag;
        infoZMCreditFlag = data.infoZMCreditFlag;
        infoCarrierFlag = data.infoCarrierFlag;
        infoBasicFlag = data.infoBasicFlag;
        infoIdentifyFlag = data.infoIdentifyFlag;
        infoIdentifyFaceFlag = data.infoIdentifyFaceFlag;
        infoIdentifyPicFlag = data.infoIdentifyPicFlag;
        infoOccupationFlag = data.infoOccupationFlag;
        infoContactFlag = data.infoContactFlag;
        infoBankcardFlag = data.infoBankcardFlag; 

        if(infoBasicFlag !== "0" && infoIdentifyFlag !== "0" ){
            html ='<div class="bootstrap-table" style="width: 80%;">'+
                '<div class="fixed-table-container" style="padding-bottom: 0px;">'+
                    '<div class="fixed-table-header" style="display: none;">'+
                        '<table></table>'+
                    '</div>'+
                    '<div class="fixed-table-body">'+
                        '<div class="fixed-table-loading" style="top: 294px; display: none;">正在努力地加载数据中，请稍候……</div>'+
                        '<table id="tableList" data-show-export="true" class="table table-hover table-striped"  >'+
                            '<thead>'+
                                '<tr>'+
                                    '<th style="" colspan="4" tabindex="0">'+
                                        '<div class="th-inner ">基本信息</div>'+
                                        '<div class="fht-cell"></div>'+
                                   '</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>'+
                                '<tr data-index="0">'+
                                    '<td style="" colspan="4" tabindex="0">'+
                                        '<div class="th-inner ">姓名：'+ infoIdentify.realName +'</div>'+
                                         '<div class="fht-cell"></div>'+
                                '</tr>'+
                                '<tr data-index="1">'+
                                '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">身份证号：'+ infoIdentify.idNo +'</div>'+
                                         '<div class="fht-cell"></div>'+
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">学历：'+ Dict.getNameForList1('education','623907',infoBasic.education) +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+                                         
                                    '</td>'+
                                '</tr>'+                                
                                '<tr data-index="2">'+
                                    '<td style=""  colspan="2" data-field="" tabindex="0">'+
                                        '<div class="th-inner ">婚姻状况：' +Dict.getNameForList1('marriage','623907',infoBasic.marriage) +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                    '<td style=""  colspan="2" data-field="" tabindex="0">'+
                                        '<div class="th-inner ">子女个数：'+ infoBasic.childrenNum +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                '</tr>'+                                
                                '<tr data-index="3">'+
                                    '<td style=""  colspan="2"  data-field="" tabindex="0">'+
                                        '<div class="th-inner ">QQ：'+ infoBasic.qq +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                    '<td style=""  colspan="2"  data-field="" tabindex="0">'+
                                        '<div class="th-inner ">邮箱：'+ infoBasic.email +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                '</tr>'+ 
                                '<tr data-index="4">'+
                                    '<td style=""  colspan="2" data-field="" tabindex="0">'+
                                        '<div class="th-inner ">居住地址：'+ infoBasic.provinceCity +infoBasic.address +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                    '<td style=""  colspan="2" data-field="" tabindex="0">'+
                                        '<div class="th-inner ">居住时长：'+ Dict.getNameForList1('live_time','623907',infoBasic.liveTime) +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                '</tr>'+  
                                '<tr data-index="5">'+
                                    '<td style=""  colspan="4" data-field="" tabindex="0">'+
                                        '<div class="th-inner ">注册地址：';
                                        if(data.userInfo.province){
                                            if(data.userInfo.address){
                                                if(data.userInfo.province == data.userInfo.city ){
                                                    html += data.userInfo.city + data.userInfo.area + data.userInfo.address;
                                                }else{
                                                    html += data.userInfo.province + data.userInfo.city + data.userInfo.area + data.userInfo.address;
                                                }                        
                                            }else{
                                                if(data.userInfo.province == data.userInfo.city ){
                                                    html += data.userInfo.city + data.userInfo.area;
                                                }else {
                                                    html += data.userInfo.province + data.userInfo.city + data.userInfo.area;
                                                }                        
                                            }                    
                                        }else{
                                            html += '-';
                                        }                                        

                                html += '</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                '</tr>'+                                                                                            
                            '</tbody>'+
                    '</div>'+
                    '<div class="fixed-table-footer" style="display: none;">'+
                        '<table>'+
                            '<tbody>'+
                                '<tr></tr>'+
                            '</tbody>'+
                        '</table>'+
                    '</div>'+
                '</div>'+
            '</div>';        
            $('#tableList').append(html);                   
        }
        
        if(infoOccupationFlag !== "0" ){
            html1 = '<div class="bootstrap-table" style="width: 80%;">'+
                '<div class="fixed-table-container" style="padding-bottom: 0px;">'+
                    '<div class="fixed-table-header" style="display: none;">'+
                        '<table></table>'+
                    '</div>'+
                    '<div class="fixed-table-body">'+
                        '<div class="fixed-table-loading" style="top: 294px; display: none;">正在努力地加载数据中，请稍候……</div>'+
                        '<table id="tableList1" data-show-export="true" class="table table-hover table-striped"  >'+
                            '<thead>'+
                                '<tr>'+
                                    '<th style="" colspan="4" tabindex="0">'+
                                        '<div class="th-inner ">职业信息</div>'+
                                        '<div class="fht-cell"></div>'+
                                   '</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>'+
                                '<tr data-index="0">'+
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">职业：'+ Dict.getNameForList1('occupation','623907',infoOccupation.occupation) +'</div>'+
                                         '<div class="fht-cell"></div>'+
                                    '</td>'+
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">月收入：'+ Dict.getNameForList1('income','623907',infoOccupation.income) +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+                                    
                                '</tr>'+
                                '<tr data-index="1">'+
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">单位名称：'+ infoOccupation.company +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+                                    
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">单位电话：'+ infoOccupation.phone +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                '</tr>'+
                                '<tr data-index="2">'+
                                    '<td style=""  colspan="4" data-field="" tabindex="0">'+
                                        '<div class="th-inner ">单位地址：'+infoOccupation.provinceCity +' , '+infoOccupation.address +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                '</tr>'+                                                              
                            '</tbody>'+
                    '</div>'+
                    '<div class="fixed-table-footer" style="display: none;">'+
                        '<table>'+
                            '<tbody>'+
                                '<tr></tr>'+
                            '</tbody>'+
                        '</table>'+
                    '</div>'+
                '</div>'+
            '</div>';   

            $('#tableList1').append(html1);   
        }
        
        if (infoContactFlag  !== "0" ) {
            html2 = '<div class="bootstrap-table" style="width: 80%;">'+
                '<div class="fixed-table-container" style="padding-bottom: 0px;">'+
                    '<div class="fixed-table-header" style="display: none;">'+
                        '<table></table>'+
                    '</div>'+
                    '<div class="fixed-table-body">'+
                        '<div class="fixed-table-loading" style="top: 294px; display: none;">正在努力地加载数据中，请稍候……</div>'+
                        '<table id="tableList2" data-show-export="true" class="table table-hover table-striped"  >'+
                            '<thead>'+
                                '<tr>'+
                                    '<th style="" colspan="4" tabindex="0">'+
                                        '<div class="th-inner ">紧急联系人</div>'+
                                        '<div class="fht-cell"></div>'+
                                   '</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>'+
                                '<tr data-index="0">'+
                                    '<td style="" colspan="1" tabindex="0">'+
                                        '<div class="th-inner ">家庭关系：'+  Dict.getNameForList1('family_relation','623907',infoContact.familyRelation) +'</div>'+
                                         '<div class="fht-cell"></div>'+
                                    '</td>'+
                                    '<td style="" colspan="1" tabindex="0">'+
                                        '<div class="th-inner ">姓名：'+ (infoContact.familyName?infoContact.familyName:"") +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+                                    
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">联系方式：'+ infoContact.familyMobile +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+                                    
                                '</tr>'+
                                '<tr data-index="1">'+
                                    '<td style="" colspan="1" tabindex="0">'+
                                        '<div class="th-inner ">社会关系：'+ Dict.getNameForList1('society_relation','623907',infoContact.societyRelation) +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+  
                                    '<td style="" colspan="1" tabindex="0">'+
                                        '<div class="th-inner ">姓名：'+ (infoContact.societyName?infoContact.societyName:"") +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+                                                                      
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">联系方式：'+ infoContact.societyMobile +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                '</tr>'+                                                          
                            '</tbody>'+
                    '</div>'+
                    '<div class="fixed-table-footer" style="display: none;">'+
                        '<table>'+
                            '<tbody>'+
                                '<tr></tr>'+
                            '</tbody>'+
                        '</table>'+
                    '</div>'+
                '</div>'+
            '</div>';
            $('#tableList2').append(html2);              
        }

        if (infoBankcardFlag && infoBankcardFlag  !== "0" ) {
               html3 = '<div class="bootstrap-table" style="width: 80%;">'+
                '<div class="fixed-table-container" style="padding-bottom: 0px;">'+
                    '<div class="fixed-table-header" style="display: none;">'+
                        '<table></table>'+
                    '</div>'+
                    '<div class="fixed-table-body">'+
                        '<div class="fixed-table-loading" style="top: 294px; display: none;">正在努力地加载数据中，请稍候……</div>'+
                        '<table id="tableList3" data-show-export="true" class="table table-hover table-striped"  >'+
                            '<thead>'+
                                '<tr>'+
                                    '<th style="" colspan="4" tabindex="0">'+
                                        '<div class="th-inner ">银行卡信息</div>'+
                                        '<div class="fht-cell"></div>'+
                                   '</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>'+
                                '<tr data-index="0">'+
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">银行卡号：'+ infoBankcard.cardNo +'</div>'+
                                         '<div class="fht-cell"></div>'+
                                    '</td>'+
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">开户行：'+ Dict.getNameForList1('bank','623907',infoBankcard.bank) +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+                                    
                                '</tr>'+
                                '<tr data-index="1">'+
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">预留手机号：'+ infoBankcard.mobile +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+                                    
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">开户省市：'+ infoBankcard.privinceCity +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                '</tr>'+                                                          
                            '</tbody>'+
                    '</div>'+
                    '<div class="fixed-table-footer" style="display: none;">'+
                        '<table>'+
                            '<tbody>'+
                                '<tr></tr>'+
                            '</tbody>'+
                        '</table>'+
                    '</div>'+
                '</div>'+
            '</div>';
            $('#tableList3').append(html3);  
        }

        // if(infoAntifraudFlag  !== "0" ){
        //     if(infoAntifraud.verifyInfoList){
        //         infoAntifraud.verifyInfoList.each(function(i, index) {
        //             verifyInfo += i+"</br>"
        //         });            
        //     }

        //     if(infoAntifraud.riskInfoList){
        //         infoAntifraud.riskInfoList.each(function(i, index) {
        //             riskInfoList += i+"</br>"
        //         });            
        //     }  

        //     html10='<div class="bootstrap-table" style="width: 80%;">'+
        //         '<div class="fixed-table-container" style="padding-bottom: 0px;">'+
        //             '<div class="fixed-table-header" style="display: none;">'+
        //                 '<table></table>'+
        //             '</div>'+
        //             '<div class="fixed-table-body">'+
        //                 '<div class="fixed-table-loading" style="top: 294px; display: none;">正在努力地加载数据中，请稍候……</div>'+
        //                 '<table id="" data-show-export="true" class="table table-hover table-striped"  >'+
        //                     '<thead>'+
        //                         '<tr>'+
        //                             '<th style="" colspan="4" tabindex="0">'+
        //                                 '<div class="th-inner ">欺诈识别</div>'+
        //                                 '<div class="fht-cell"></div>'+
        //                            '</th>'+
        //                         '</tr>'+
        //                     '</thead>'+
        //                     '<tbody>'+
        //                         '<tr data-index="0"><td style="">欺诈评分</td><td style="">'+ infoAntifraud.score +'</td></tr>'+
        //                         '<tr data-index="1"><td style="">欺诈信息验证</td><td style="">'+ verifyInfo +'</td></tr>'+
        //                         '<tr data-index="2"><td style="">欺诈关注清单</td><td style="">'+ (infoAntifraud.hit == 'yes'? riskInfoList:'否') +'</td></tr>'+
        //                     '</div>'+
        //                     '<div class="fixed-table-footer" style="display: none;">'+
        //                         '<table>'+
        //                             '<tbody>'+
        //                         '<tr></tr>'+
        //                     '</tbody>'+
        //                 '</table>'+
        //             '</div>'+
        //         '</div>'+
        //     '</div>';  
        //     $('#tableList11').append(html10);                            
        // }
         
        if(infoIdentifyFaceFlag !== "0" && infoIdentifyPicFlag !== "0"){
            html4 = '<div class="bootstrap-table" style="width: 80%;">'+
                '<div class="fixed-table-container" style="padding-bottom: 0px;">'+
                    '<div class="fixed-table-header" style="display: none;">'+
                        '<table></table>'+
                    '</div>'+
                    '<div class="fixed-table-body">'+
                        '<div class="fixed-table-loading" style="top: 294px; display: none;">正在努力地加载数据中，请稍候……</div>'+
                        '<table id="tableList4" data-show-export="true" class="table table-hover table-striped"  >'+
                            '<thead>'+
                                '<tr>'+
                                    '<th style="" colspan="4" tabindex="0">'+
                                        '<div class="th-inner ">身份信息</div>'+
                                        '<div class="fht-cell"></div>'+
                                   '</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>'+
                                '<tr data-index="0">'+
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">姓名：'+ infoIdentifyFace.realName  +'</div>'+
                                         '<div class="fht-cell"></div>'+
                                    '</td>'+                                    
                                    '<td style="" colspan="2" tabindex="0">'+
                                        '<div class="th-inner ">身份证号：'+ infoIdentifyFace.idNo  +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+                                    
                                '</tr>'+
                                '<tr data-index="1">'+
                                    '<td style=""  colspan="2" data-field="" tabindex="0">'+
                                        '<div class="th-inner ">身份证照片</div>'+
                                         '<div class="fht-cell"></div>'+                                        
                                    '</td>'+
                                    '<td style=""  colspan="2" data-field="" tabindex="0">'+
                                        '<div class="th-inner ">'+
                                            '<img src="'+OSS.picBaseUrl+'/'+infoIdentifyPic.identifyPic+'" style="max-width:100px;height:100px;" class="personal">'+
                                            '<img src="'+OSS.picBaseUrl+'/'+infoIdentifyPic.identifyPicReverse+'" style="max-width:100px;height:100px;" class="personal1">'+
                                            '<img src="'+OSS.picBaseUrl+'/'+infoIdentifyPic.identifyPicHand+'" style="max-width:100px;height:100px;" class="personal2">'+
                                        '</div>'+
                                         '<div class="fht-cell"></div>'+                                         
                                    '</td>'+ 
                                '</tr>'+                                               
                            '</tbody>'+
                    '</div>'+
                    '<div class="fixed-table-footer" style="display: none;">'+
                        '<table>'+
                            '<tbody>'+
                                '<tr></tr>'+
                            '</tbody>'+
                        '</table>'+
                    '</div>'+
                '</div>'+
            '</div>';
            $('#tableList4').append(html4);            
        }
            
        if(infoZMCreditFlag  !== "0" ){
            html5 = '<div class="bootstrap-table" style="width: 80%;">'+
                '<div class="fixed-table-container" style="padding-bottom: 0px;">'+
                    '<div class="fixed-table-header" style="display: none;">'+
                        '<table></table>'+
                    '</div>'+
                    '<div class="fixed-table-body">'+
                        '<div class="fixed-table-loading" style="top: 294px; display: none;">正在努力地加载数据中，请稍候……</div>'+
                        '<table id="tableList5" data-show-export="true" class="table table-hover table-striped"  >'+
                            '<thead>'+
                                '<tr>'+
                                    '<th style="" colspan="4" tabindex="0">'+
                                        '<div class="th-inner ">认证信息</div>'+
                                        '<div class="fht-cell"></div>'+
                                   '</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>'+
                                '<tr data-index="0">'+
                                    '<td style="" colspan="4" tabindex="0">'+
                                        '<div class="th-inner ">芝麻信用分：' + infoZMCredit.zmScore +'</div>'+
                                         '<div class="fht-cell"></div>'+
                                    '</td>'+                                    
                                '</tr>'+
                                '<tr data-index="1">'+                                    
                                    '<td style="" colspan="4" tabindex="0">'+
                                        '<div class="th-inner ">是否被关注：'+ (infoZMCredit.isMatched ? '是' : '否') +'</div>'+
                                        '<div class="fht-cell"></div>'+
                                    '</td>'+
                                '</tr>'+                                                          
                            '</tbody>'+
                        '</table>' +
                    '</div></div></div>';
            if (infoZMCredit.details) {
                html5 += '<table id="hygzqdTableList"></table>';
                setTimeout(function () {
                  var result = analyzeHygzqd(infoZMCredit);
                  $('#hygzqdTableList').bootstrapTable({
                    striped: true,
                    columns: [{
                      title: '行业类型',
                      field: 'bizCode'
                    }, {
                      title: '风险类型',
                      field: 'type'
                    }, {
                      title: '风险代码',
                      field: 'code'
                    }, {
                      title: '扩展信息',
                      field: 'extendInfo',
                      formatter: function (v, item) {
                        var html = '';
                        item.extendInfo.forEach(function(info) {
                          html += '<p>' + info + '</p>';
                        });
                        return '<div>' + html + '</div>';
                      }
                    }],
                    data: result,
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 20, 30, 40, 50]
                  });
                }, 20);
            }
            $('#tableList5').append(html5);
        }

        if(infoCarrierFlag  !== "0"){
            infoCarrier = JSON.parse(infoCarrier);
            if (infoCarrier.user_id) {
                $('#yysrzPannel').hide();
                $('#CompatibleBtn').on('click',function(){
                    compatible(infoContactFlag)
                });
            } else {
                $('#yysrzTool').hide();
                addYysrz(infoCarrier);
            }
        }

        if(infoAddressBookFlag  !== "0"){
            infoAddressBook = JSON.parse(infoAddressBook);
            $('#tableList33').bootstrapTable('append', infoAddressBook);
        }   

        if(infoIdentifyPicFlag !== "0"){
            personImg('personal' ,infoIdentifyPic.identifyPic,"closepic")
            personImg('personal1' ,infoIdentifyPic.identifyPicReverse ,"closepic1")
            personImg('personal2' ,infoIdentifyPic.identifyPicHand ,"closepic2")                
        }  

        if(infoAntifraudFlag == "0"){
            unverified("page-title");
            unverified("page-title6");
        }else if(infoAntifraudFlag == "1"){
            verified("page-title");
            verified("page-title6");
        }else{
            expired("page-title");
            expired("page-title6");
        } 

        if(infoAddressBookFlag == "0"){
            unverified("page-title5");  
        }else if(infoAddressBookFlag == "1"){
            verified("page-title5");  
        }else{
            expired("page-title5");
        }

        if(infoIdentifyPicFlag == "0" && infoIdentifyFaceFlag == "0"){
            unverified("page-title2"); 
        }else if(infoIdentifyPicFlag == "1" && infoIdentifyFaceFlag == "1"){
            verified("page-title2"); 
        }else{
            expired("page-title2");
        }        

        if(infoZMCreditFlag == "0"){
            unverified("page-title3");
        }else if(infoZMCreditFlag == "1"){
            verified("page-title3");
        }else{
            expired("page-title3");
        }        

        if(infoCarrierFlag == "0"){
            unverified("page-title4");
            $('#yysrzTool').css('display','none');
            $('#yysrzPannel').css('display','none');
        }else if(infoCarrierFlag == "1"){
            verified("page-title4");
        }else{
            expired("page-title4");
        }                

    });        

    $('#tableList33').bootstrapTable({
        columns: [{
            field: 'name',
            title: '通讯录姓名',
        },{
            field: 'mobile',
            title: '手机号'
        }
    ]});  


    $('.bootstrap-table').css("width","80%");    

    togglePanel("pageTitle","pannel");
    togglePanel("pageTitle2","pannel1");
    togglePanel("pageTitle3","pannel2");
    togglePanel("pageTitle4","pannel3");
    togglePanel("pageTitle5","pannel4");
    // togglePanel("pageTitle6","pannel5");
    togglePanel("pageTitle7","pannel6");


    $('#backBtn').click(function() {
        goBack()
    });

    $('#preLoanReviewBtn').on('click',function(){
        getTDReport()                
    });

    $('#updatePreLoanReviewBtn').on('click',function(){
        updateTDReport()                
    });

    function unverified(title){
        $('#'+title).append('<p style="float:right;color: red;">(未认证)</p>');
    }
    function verified(title){
        $('#'+title).append('<p style="float:right;color: green;">(已认证)</p>');
    }

    function expired(title){
        $('#'+title).append('<p style="float:right;color: orange;">(已过期)</p>');
    }    

    function personImg(imgClass,imgPic,closeClass){
        $('.'+imgClass).on('click',function(){

            var dw = dialog({
                content: '<img src="'+OSS.picBaseUrl+'/'+imgPic+'" style="min-width:100%;width:400px;heiht:400px;" class="'+closeClass+'">'
            });                

            dw.showModal(); 
            dw.__center();

            $('.ui-popup-backdrop').on('click', function() {
                dw.close().remove();
            }); 
             
            $('.ui-popup').on('click', function() {
                dw.close().remove();
            });                          
          
        })                
    }           

    function togglePanel(title,panel,left){
        $("."+title).on('click', function() {
        if($(this).siblings('i').hasClass('opean')){
            $(this).siblings('i').removeClass('opean').addClass('close').css("margin-left",left)
            $("."+panel).hide()            
        }else{
            $(this).siblings('i').removeClass('close').addClass('opean').css("margin-left",left)
            $("."+panel).show()                
        } 
    });        
    }

    function compatible(infoContactFlag){
        html7 = '<div class="tools"><ul class="toolbar"><li style="display:block;" id="backBtn1"><span><img src="/static/images/t01.png"></span>返回</li></ul></div>';
        if(infoContactFlag  !== "0" ){
            html6 = '<iframe src="https://tenant.51datakey.com/carrier/mxreport_data?data='+infoCarrier.message+'&contact='+infoContact.familyMobile+':'+ (infoContact.familyName?infoContact.familyName:'未知') +':'+ Dict.getNameForList1('family_relation','623907',infoContact.familyRelation) +','+ infoContact.societyMobile +':'+ (infoContact.societyName?infoContact.societyName:'未知') +':'+ Dict.getNameForList1('society_relation','623907',infoContact.societyRelation)+'" width="100%" height="650px"></iframe>';
        }else{
            html6 = '<iframe src="https://tenant.51datakey.com/carrier/mxreport_data?data='+infoCarrier.message+'" width="100%" height="650px"></iframe>';
        }

        $('#form-info').css('display','none');
        $('.form-body').append(html7);
        $('.form-body').append(html6);
        $('#backBtn1').click(function() {
            $('#form-info').css('display','block');
            $('.form-body #backBtn1').remove();
            $('.form-body iframe').remove();
        });                 
    }

    function getTDReport(){
        loading.createLoading(); 
        reqApi1({
            code:'623054',
            json:{userId:userId}
        }).then(function(res){
            loading.hideLoading();
            if (res.errorCode != '0') {
                toastr.warning(res.errorInfo);
                return $.Deferred().reject(res, 'Not YES').promise();
            } else {
                td_data = JSON.parse(res.data.tdData); 
                person_info = JSON.parse(res.data.personInfo); 
            }                                 
        }).then(function(){ 
            $.showTDReport(td_data,person_info);
            $('.label-span').css({
                display: 'inline-block'
            });            
        });        
    } 

    function updateTDReport(){
        loading.createLoading();
        reqApi1({
            code:'623055',
            json:{userId:userId}
        }).then(function(res){
            loading.hideLoading();
            if (res.errorCode != '0') {
                toastr.warning(res.errorInfo);
                return $.Deferred().reject(res, 'Not YES').promise();
            } else {
                toastr.success("操作成功");
            }
        });
    }
   // 解析行业关注清单
   function analyzeHygzqd(data) {
     if (data.details) {
       var hygzList = data.details.map(function(item) {
         var result = {
           bizCode: '',
           type: '',
           code: '',
           extendInfo: []
         };
         // 解析bizCode和type
         var bizCode = HY_DATA.bizCode[item.bizCode];
         result.bizCode = bizCode.name;
         var type = bizCode.type[item.type];
         result.type = type.name;
         // 解析code
         var codePrefix = type.code.name ? type.code.name + '：' : '';
         result.code = codePrefix + type.code[item.code];
         // 解析extendInfo
         if (type.extendInfo && item.extendInfo) {
           item.extendInfo.forEach(function(info) {
             if (info.key !== 'id') {
               var key = type.extendInfo[info.key];
               var keyPrefix = key.name + '：';
               var value = info.value;
               if (info.key === 'event_max_amt_code') {
                 value = key[info.value] || '未知';
               }
               result.extendInfo.push(keyPrefix + value);
             }
           });
         }
         return result;
       });
       return hygzList;
     }
     return null;
   }
   // 添加运营商数据
   function addYysrz (data) {
        addYysUserInfo(data);
        addYysMobInfo(data);
        addYysJjlxrInfo(data);
        addYysFxlxrInfo(data);
        addYysJrjglxrInfo(data);
        addYysJrjglxrmxInfo(data);
        addQbthtjInfo(data);
        addMythtjInfo(data);
        addLxrgsdtjInfo(data);
        addYysxftjInfo(data);
        addMyxftjInfo(data);
        addJmhytjInfo(data);
        addJmdy3tInfo(data);
        addJmdy15tInfo(data);
        addCxjlInfo(data);
        addJ3ythtjInfo(data);
        addQblxrmxInfo(data);
   }
   // 添加运营商用户信息数据
   function addYysUserInfo (data) {
     var html = '<li class="clearfix">' +
       '<label>姓名:</label>' +
       '<span>'+ data.user_info.real_name + '（和运营商数据' + realnameCheck(data) + '）</span>' +
       '</li>' +
       '<li class="clearfix">' +
       '<label>运营商登记姓名:</label>' +
       '<span>'+ data.mobile_info.real_name + '</span>' +
       '</li>' +
       '<li class="clearfix">' +
       '<label>身份证:</label>' +
       '<span>'+ data.user_info.identity_code + '（' + idNoValid(data) + '、和运营商数据' + idNoCheck(data) + '）</span>' +
       '</li>' +
       '<li class="clearfix">' +
       '<label>运营商登记身份证:</label>' +
       '<span>'+ data.mobile_info.identity_code + '</span>' +
       '</li>';
     var titles = ['性别', '年龄', '家庭地址', '家庭电话', '工作单位', '单位地址', '单位电话', '邮箱'];
     var keys = ['gender', 'age', 'home_addr', 'home_tel', 'company_name', 'work_addr', 'work_tel', 'email'];
     for (var i = 0; i < titles.length; i++) {
       html += '<li class="clearfix">' +
         '<label>' + titles[i] + ':</label>' +
         '<span>'+ (data.user_info[keys[i]] || '未填写') + '</span>' +
         '</li>';
     }
     $('#userInfoList').html(html);
   }
   // 真实姓名校验
   function realnameCheck (data) {
     if (data) {
       if (data.info_match.real_name_check_yys === '无数据') {
         return '匹配度未知';
       }
       return data.info_match.real_name_check_yys;
     }
     return '';
   }
   // 身份证是否有效
   function idNoValid(data) {
     if (data) {
       if (data.info_check.is_identity_code_valid === '是') {
         return '身份证有效';
       }
       if (data.info_check.is_identity_code_valid === '否') {
         return '身份证无效';
       }
       return '身份证有效性未知';
     }
   }
   // 身份证校验
   function idNoCheck(data) {
     if (data) {
       if (data.info_match.identity_code_check_yys === '无数据') {
         return '匹配度未知';
       }
       return data.info_match.identity_code_check_yys;
     }
     return '';
   }
   // 添加运营商手机信息数据
   function addYysMobInfo(data) {
     var html = '<li class="clearfix">' +
       '<label>手机号:</label>' +
       '<span>'+ data.mobile_info.user_mobile + '（' + isMobIdentity(data) + '）</span>' +
       '</li>';
     var titles = ['号码归属地', '运营商', '账号状态', '账户余额', '入网时间'];
     var keys = ['mobile_net_addr', 'mobile_carrier', 'account_status', 'account_balance', 'mobile_net_time'];
     for (var i = 0; i < titles.length; i++) {
       html += '<li class="clearfix">' +
         '<label>' + titles[i] + ':</label>';
       if (i === 3) {
         html += '<span>'+ (data.mobile_info[keys[i]] / 100) + '元</span>';
       } else {
         html += '<span>'+ (data.mobile_info[keys[i]] || '未知') + '</span>';
       }
       html += '</li>';
     }
     $('#mobileInfoList').html(html);
   }
   // 手机号是否实名认证
   function isMobIdentity (data) {
     var flag = !!(data && data.mobile_info.identity_code);
     return flag ? '已实名' : '未实名';
   }
   // 添加运营商紧急联系人数据
   function addYysJjlxrInfo (data) {
     var keys = ['emergency_contact1_detail', 'emergency_contact2_detail',
       'emergency_contact3_detail', 'emergency_contact4_detail', 'emergency_contact5_detail'];
     var tableData = [];
     keys.forEach(function (t) {
       if (data[t]) {
         tableData.push(data[t]);
       }
     });
     var contactDict = {
       'FATHER': '父亲',
       'MOTHER': '母亲',
       'SPOUSE': '配偶',
       'CHILD': '子女',
       'OTHER_RELATIVE': '其他亲属',
       'FRIEND': '朋友',
       'COWORKER': '同事',
       'OTHERS': '其他关系'
     };
     $('#jjlxrInfoList').bootstrapTable({
       striped: true,
       columns: [{
         field: 'contact_number',
         title: '手机号码'
       }, {
         field: 'contact_relation',
         title: '号码标签',
         formatter: function (v) {
           return contactDict[v];
         }
       }, {
         field: 'contact_area',
         title: '号码归属地'
       }, {
         field: 'call_count_3month',
         title: '近3月通话次数(次)'
       }, {
         field: 'call_time_3month',
         title: '近3月通话时长(秒)'
       }, {
         field: 'call_count_6month',
         title: '近6月通话次数(次)'
       }, {
         field: 'call_time_6month',
         title: '近6月通话时长(秒)'
       }, {
         field: 'call_count_active_6month',
         title: '近6月主叫通话次数(次)'
       }, {
         field: 'call_count_passive_6month',
         title: '近6月被叫通话次数(次)'
       }],
       data: tableData
     });
   }
   // 添加运营商风险联系人数据
   function addYysFxlxrInfo (data) {
     var tableData = data.risk_contact_stats;
     $('#fxlxrInfoList').bootstrapTable({
       striped: true,
       columns: [{
         field: 'risk_type',
         title: '风险类型'
       }, {
         field: 'contact_count_3month',
         title: '近3月通话号码数量'
       }, {
         field: 'call_count_3month',
         title: '近3月通话次数(次)'
       }, {
         field: 'call_time_3month',
         title: '近3月通话时长(秒)'
       }, {
         field: 'msg_count_3month',
         title: '近3月短信次数(次)'
       }, {
         field: 'contact_count_6month',
         title: '近6月通话号码数量'
       }, {
         field: 'call_count_6month',
         title: '近6月通话次数(次)'
       }, {
         field: 'call_time_6month',
         title: '近6月通话时长(秒)'
       }, {
         field: 'msg_count_6month',
         title: '近6月短信次数(次)'
       }],
       data: tableData
     });
   }
   // 添加运营商金融机构联系人数据
   function addYysJrjglxrInfo (data) {
     var tableData = data.finance_contact_stats;
     $('#jrjglxrInfoList').bootstrapTable({
       striped: true,
       columns: [{
         field: 'contact_type',
         title: '金融机构'
       }, {
         field: 'contact_count_3month',
         title: '近3月通话号码数量'
       }, {
         field: 'call_count_3month',
         title: '近3月通话次数(次)'
       }, {
         field: 'call_time_3month',
         title: '近3月通话时长(秒)'
       }, {
         field: 'msg_count_3month',
         title: '近3月短信次数(次)'
       }, {
         field: 'contact_count_6month',
         title: '近6月通话号码数量'
       }, {
         field: 'call_count_6month',
         title: '近6月通话次数(次)'
       }, {
         field: 'call_time_6month',
         title: '近6月通话时长(秒)'
       }, {
         field: 'msg_count_6month',
         title: '近6月短信次数(次)'
       }],
       data: tableData
     });
   }
   // 添加运营商金融机构联系人明细数据
   function addYysJrjglxrmxInfo (data) {
     var tableData = data.finance_contact_detail;
     $('#jrjglxrmxInfoList').bootstrapTable({
       striped: true,
       columns: [{
         field: 'contact_number',
         title: '号码'
       }, {
         field: 'contact_name',
         title: '号码标签',
         formatter: function (v) {
           return v.split(';').join('、');
         }
       }, {
         field: 'contact_area',
         title: '号码归属地'
       }, {
         field: 'call_count_3month',
         title: '近3月通话次数(次)'
       }, {
         field: 'call_time_3month',
         title: '近3月通话时长(秒)'
       }, {
         field: 'call_count_6month',
         title: '近6月通话次数(次)'
       }, {
         field: 'call_time_6month',
         title: '近6月通话时长(秒)'
       }, {
         field: 'call_count_active_6month',
         title: '近6月主叫通话次数(次)'
       }, {
         field: 'call_count_passive_6month',
         title: '近6月被叫通话次数(次)'
       }],
       data: tableData
     });
   }
   // 添加运营商全部通话统计数据
   function addQbthtjInfo (data) {
     var info = data.all_contact_stats;
     var keys = [
       'contact_count_1month;contact_count_3month;contact_count_6month',
       'contact_count_mutual_1month;contact_count_mutual_3month;contact_count_mutual_6month',
       'call_count_1month;call_count_3month;call_count_6month',
       'call_count_active_1month;call_count_active_3month;call_count_active_6month',
       'call_count_passive_1month;call_count_passive_3month;call_count_passive_6month',
       'call_time_1month;call_time_3month;call_time_6month',
       'call_time_active_1month;call_time_active_3month;call_time_active_6month',
       'call_time_passive_1month;call_time_passive_3month;call_time_passive_6month',
       'call_count_late_night_1month;call_count_late_night_3month;call_count_late_night_6month',
       'call_count_work_time_1month;call_count_work_time_3month;call_count_work_time_6month',
       'call_count_offwork_time_1month;call_count_offwork_time_3month;call_count_offwork_time_6month'
     ];
     var values = ['通话号码数量(个)', '互通号码数量(个)', '通话次数(次)', '主叫通话次数(次)', '被叫通话次数(次)',
       '通话时长(秒)', '主叫通话时长(秒)', '被叫通话时长(秒)', '深夜时间通话(次)', '工作时间通话(次)', '非工作时间通话(次)'];
     var tableData = [];
     var idx2key = ['one', 'three', 'six'];
     for (var i = 0; i < keys.length; i++) {
       var result = {
         title: values[i]
       };
       keys[i].split(';').forEach(function (t, idx) {
         result[idx2key[idx]] = info[t] || '--';
       });
       tableData.push(result);
     }

     $('#qbthtjInfoList').bootstrapTable({
       striped: true,
       columns: [{
         field: 'title',
         title: '项目'
       }, {
         field: 'one',
         title: '近1个月'
       }, {
         field: 'three',
         title: '近3个月'
       }, {
         field: 'six',
         title: '近6个月'
       }],
       data: tableData
     });
   }
   // 添加运营商每月通话统计数据
   function addMythtjInfo (data) {
     var tableData = data.all_contact_stats_per_month;
     $('#mythtjInfoList').bootstrapTable({
       striped: true,
       columns: [{
         title: '月份',
         field: 'month'
       }, {
         title: '通话号码数量(个)',
         field: 'contact_count'
       }, {
         title: '通话次数(次)',
         field: 'call_count'
       }, {
         title: '主叫通话次数(次)',
         field: 'call_count_active'
       }, {
         title: '被叫通话次数(次)',
         field: 'call_count_passive'
       }, {
         title: '通话时长(秒)',
         field: 'call_time'
       }, {
         title: '主叫通话时长(秒)',
         field: 'call_time_active'
       }, {
         title: '被叫通话时长(秒)',
         field: 'call_time_passive'
       }, {
         title: '短信次数(次)',
         field: 'msg_count'
       }],
       data: tableData
     });
   }
   // 添加运营商联系人归属地统计数据
   function addLxrgsdtjInfo (data) {
     var tableData = data.contact_area_stats_per_city;
     $('#lxrgsdtjInfoList').bootstrapTable({
       striped: true,
       columns: [{
         title: '归属地',
         field: 'contact_area_city'
       }, {
         title: '近3月通话号码数量',
         field: 'contact_count_3month'
       }, {
         title: '近3月通话次数(次)',
         field: 'call_count_3month'
       }, {
         title: '近3月通话时长(秒)',
         field: 'call_time_3month'
       }, {
         title: '近6月通话号码数量',
         field: 'contact_count_6month'
       }, {
         title: '近6月通话次数(次)',
         field: 'call_count_6month'
       }, {
         title: '近6月通话时长(秒)',
         field: 'call_time_6month'
       }, {
         title: '近6月主叫通话次数(次)',
         field: 'call_count_active_6month'
       }, {
         title: '近6月被叫通话次数(次)',
         field: 'call_count_passive_6month'
       }],
       data: tableData,
       pagination: true,
       pageSize: 10,
       pageList: [10, 20, 30, 40, 50]
     });
   }
   // 添加运营商消费统计数据
   function addYysxftjInfo (data) {
     var info = data.carrier_consumption_stats;
     var keys = [
       'consume_amount_1month;consume_amount_3month;consume_amount_6month',
       'consume_amount_call_1month;consume_amount_call_3month;consume_amount_call_6month',
       'consume_amount_data_1month;consume_amount_data_3month;consume_amount_data_6month',
       'consume_amount_msg_1month;consume_amount_msg_3month;consume_amount_msg_6month',
       'consume_amount_extra_1month;consume_amount_extra_3month;consume_amount_extra_6month',
       'consume_amount_other_1month;consume_amount_other_3month;consume_amount_other_6month',
       'recharge_count_1month;recharge_count_3month;recharge_count_6month',
       'recharge_amount_1month;recharge_amount_3month;recharge_amount_6month'
     ];
     var values = ['消费金额(元)', '通话消费金额(元)', '流量消费金额(元)', '短信消费金额(元)',
       '增值业务消费金额(元)', '其他消费金额(元)', '充值次数(次)', '充值金额(元)'];
     var tableData = [];
     var idx2key = ['one', 'three', 'six'];
     for (var i = 0; i < keys.length; i++) {
       var result = {
         title: values[i]
       };
       keys[i].split(';').forEach(function (t, idx) {
         if (i === 6) {
           result[idx2key[idx]] = info[t] || '--';
         } else {
           result[idx2key[idx]] = info[t] ? info[t] / 100 : '--';
         }
       });
       tableData.push(result);
     }

     $('#yysxftjInfoList').bootstrapTable({
       striped: true,
       columns: [{
         field: 'title',
         title: '项目'
       }, {
         field: 'one',
         title: '近1个月'
       }, {
         field: 'three',
         title: '近3个月'
       }, {
         field: 'six',
         title: '近6个月'
       }],
       data: tableData
     });
   }
   // 添加运营商每月消费统计数据
   function addMyxftjInfo (data) {
     var tableData = data.carrier_consumption_stats_per_month;
     $('#myxftjInfoList').bootstrapTable({
       striped: true,
       columns: [{
         title: '月份',
         field: 'month'
       }, {
         title: '月消费金额(元)',
         field: 'consume_amount',
         formatter: function (v) {
           return v / 100;
         }
       }, {
         title: '月充值金额(元)',
         field: 'recharge_amount',
         formatter: function (v) {
           return v / 100;
         }
       }],
       data: tableData
     });
   }
   // 添加运营商静默活跃统计数据
   function addJmhytjInfo (data) {
     var info = data.active_silence_stats;
     var keys = [
       'active_day_1call_3month;active_day_1call_6month',
       'max_continue_active_day_1call_3month;max_continue_active_day_1call_6month',
       'silence_day_0call_3month;silence_day_0call_6month',
       'continue_silence_day_over3_0call_3month;continue_silence_day_over3_0call_6month',
       'continue_silence_day_over15_0call_3month;continue_silence_day_over15_0call_6month',
       'max_continue_silence_day_0call_3month;max_continue_silence_day_0call_6month'
     ];
     var values = ['通话活跃天数(天)', '最大连续通话活跃天数(天)', '无通话静默天数(天)',
       '连续无通话静默大于3天(次)', '连续无通话静默大于15天(次)', '最大连续无通话静默天数(天)'];
     var tableData = [];
     var idx2key = ['three', 'six'];
     for (var i = 0; i < keys.length; i++) {
       var result = {
         title: values[i]
       };
       keys[i].split(';').forEach(function (t, idx) {
         result[idx2key[idx]] = info[t] || '--';
       });
       tableData.push(result);
     }

     $('#jmhytjInfoList').bootstrapTable({
       striped: true,
       columns: [{
         field: 'title',
         title: '项目'
       }, {
         field: 'three',
         title: '近3个月'
       }, {
         field: 'six',
         title: '近6个月'
       }],
       data: tableData
     });
   }
   // 添加运营商连续无通话静默大于3天纪录数据
   function addJmdy3tInfo (data) {
     var tableData = data.active_silence_stats.continue_silence_day_over3_0call_6month_detail;
     $('#jmdy3tInfoList').bootstrapTable({
       striped: true,
       columns: [{
         title: '开始日期',
         field: 'start_date'
       }, {
         title: '结束日期',
         field: 'end_date'
       }],
       data: tableData,
       pagination: true,
       pageSize: 10,
       pageList: [10, 20, 30, 40, 50]
     });
   }
   // 添加运营商连续无通话静默大于15天纪录数据
   function addJmdy15tInfo (data) {
     var tableData = data.active_silence_stats.continue_silence_day_over15_0call_6month_detail;
     $('#jmdy15tInfoList').bootstrapTable({
       striped: true,
       columns: [{
         title: '开始日期',
         field: 'start_date'
       }, {
         title: '结束日期',
         field: 'end_date'
       }],
       data: tableData,
       pagination: true,
       pageSize: 10,
       pageList: [10, 20, 30, 40, 50]
     });
   }
   // 添加运营商出行记录分析数据
   function addCxjlInfo (data) {
     $('#cxjlfxInfoList').bootstrapTable({
       striped: true,
       columns: [{
         title: '出发城市',
         field: 'leave_city'
       }, {
         title: '出发日期',
         field: 'leave_day'
       }, {
         title: '到达城市',
         field: 'arrive_city'
       }, {
         title: '到达日期',
         field: 'arrive_day'
       }],
       data: data.travel_track_analysis_per_city
     });
   }
   // 添加运营商近3个月各时间段通话统计数据
   function addJ3ythtjInfo (data) {
     var info = data.call_duration_stats_2hour;
     var tableData = [{
       title: '00:00-02:00',
       holiday: info.call_duration_holiday_3month.t_0,
       workday: info.call_duration_workday_3month.t_0
     }, {
       title: '02:00-04:00',
       holiday: info.call_duration_holiday_3month.t_1,
       workday: info.call_duration_workday_3month.t_1
     }, {
       title: '04:00-06:00',
       holiday: info.call_duration_holiday_3month.t_2,
       workday: info.call_duration_workday_3month.t_2
     }, {
       title: '06:00-08:00',
       holiday: info.call_duration_holiday_3month.t_3,
       workday: info.call_duration_workday_3month.t_3
     }, {
       title: '08:00-10:00',
       holiday: info.call_duration_holiday_3month.t_4,
       workday: info.call_duration_workday_3month.t_4
     }, {
       title: '10:00-12:00',
       holiday: info.call_duration_holiday_3month.t_5,
       workday: info.call_duration_workday_3month.t_5
     }, {
       title: '12:00-14:00',
       holiday: info.call_duration_holiday_3month.t_6,
       workday: info.call_duration_workday_3month.t_6
     }, {
       title: '14:00-16:00',
       holiday: info.call_duration_holiday_3month.t_7,
       workday: info.call_duration_workday_3month.t_7
     }, {
       title: '16:00-18:00',
       holiday: info.call_duration_holiday_3month.t_8,
       workday: info.call_duration_workday_3month.t_8
     }, {
       title: '18:00-20:00',
       holiday: info.call_duration_holiday_3month.t_9,
       workday: info.call_duration_workday_3month.t_9
     }, {
       title: '20:00-22:00',
       holiday: info.call_duration_holiday_3month.t_10,
       workday: info.call_duration_workday_3month.t_10
     }, {
       title: '22:00-24:00',
       holiday: info.call_duration_holiday_3month.t_11,
       workday: info.call_duration_workday_3month.t_11
     }];
     $('#j3ythtjInfoList').bootstrapTable({
       striped: true,
       columns: [{
         title: '时间段',
         field: 'title'
       }, {
         title: '工作日通话时长(秒)',
         field: 'workday'
       }, {
         title: '节假日通话时长(秒)',
         field: 'holiday'
       }],
       data: tableData
     });
   }
   // 添加运营商全部联系人明细数据
   function addQblxrmxInfo (data) {
     $('#qblxrmxInfoList').bootstrapTable({
       striped: true,
       columns: [{
         title: '号码',
         field: 'contact_number'
       }, {
         title: '号码标签',
         field: 'contact_name'
       }, {
         title: '号码归属地',
         field: 'contact_area'
       }, {
         title: '近3月通话次数(次)',
         field: 'call_count_3month'
       }, {
         title: '近3月通话时长(秒)',
         field: 'call_time_3month'
       }, {
         title: '近6月通话次数',
         field: 'call_count_6month'
       }, {
         title: '近6月通话时长(秒)',
         field: 'call_time_6month'
       }, {
         title: '近6月主叫通话次数',
         field: 'call_count_active_6month'
       }, {
         title: '近6月被叫通话次数',
         field: 'call_count_passive_6month'
       }],
       data: data.all_contact_detail,
       pagination: true,
       pageSize: 10,
       pageList: [10, 20, 30, 40, 50]
     });
   }
});