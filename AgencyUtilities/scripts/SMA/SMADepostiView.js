function DoGetDepositInfo()
{
    //var app = new kendo.mobile.Application($(document.body));
	//app.navigate("#invoiceSearch",'slide:right');
    Redirect("DepositView.html")
                            //'Agency': $("#txtAgencyCode").val() ,  'Transaction': $('#txtTransactionNumber').val() ,  'Folio': $('#txtFolio').val() ,'SenderName': $('#txtSenderName').val() ,'RecipientName': $('#txtRecipientName').val(),'Status': $('#dropdown').val(),'Company': $('#hidCompany').val() }
     var dataWeb ="{'AgencyUser':'" +  $('#hidAgencyUser').val()  +    "','Key':'" + $('#hidKey').val()  +  "','Company':'" + $('#hidCompany').val() + "'}";
    
    
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
               
               read: function (options) 
                {
                   $.ajax({
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    //dataType: "json",
                    //url: "http://www.smasoftware.com/SMAMobileService/SMAMobileService.asmx/doSearch",
                       url: pageUrl =doGetCurrentURL()+ "doGetDepositInfo",
                    data:  dataWeb ,
                    success: BindInfo,
                    error: ShowError
                   });
                },
                
                parameterMap: function (options) 
                {
                   return kendo.stringify(options);
                }
            },
            pageSize: '"50"',
            schema: {
			data: "d" }

        });
        
        function BindInfo(response) 
        {
            
            
           var NewDatasource  =jQuery.parseJSON( response.d );
           dataSource = NewDatasource;  
             $("#DepositList").kendoMobileListView(
			{
                template: $("#DepositViewTemplate").html(),
				dataSource: dataSource,
                
                click: function(e)
                {
                    try{
                                        $('#hidAtrIdentityCode').val(e.dataItem.Code)
                                        //$('#hidStatusCode').val(e.dataItem.StatusCode)
                    					//doGetInvoiceInfo(e.dataItem.OriginalID);
                    					//var app = new kendo.mobile.Application($(document.body));
   			 						//app.navigate("#invoiceView",'slide:right');
                        }
                    catch(Exception) {}
                    					
                }
                
 			});
           
        }
        
        function ShowError(response) 
        {
            alert('hubo un error' + response.d);
                
        }
    dataSource.read();
}



function DoShowDepositImage()
{
     var dataWeb ="{'AcountingID':'" +  $('#hidAtrIdentityCode').val()  +    "','Key':'" + $('#hidKey').val()  + "'}";
    
    
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
               
               read: function (options) 
                {
                   $.ajax({
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    //dataType: "json",
                    //url: "http://www.smasoftware.com/SMAMobileService/SMAMobileService.asmx/doSearch",
                       url: pageUrl =doGetCurrentURL()+ "doGetDepositImage",
                    data:  dataWeb ,
                    success: BindInfo,
                    error: ShowError
                   });
                },
                
                parameterMap: function (options) 
                {
                   return kendo.stringify(options);
                }
            },
            pageSize: '"50"',
            schema: {
			data: "d" }

        });
        
        function BindInfo(response) 
        {
            
            
           $.each(JSON.parse(response.d), function(idx, obj) 
           {
                var smallprevImage = document.getElementById('smallPrevImage');
                smallprevImage.style.display = 'inline-block';
                document.getElementById('smallPrevImage').style.display = 'inline-block';
               var Base64FromWeb =  obj.Image;
               document.getElementById('smallPrevImage').src= "data:image/png;base64," + Base64FromWeb;
               $.pgwModal({
                            target: '#ShowPreview2',
           titleBar: false
                           
          });
               
            });
           
        }
        
        function ShowError(response) 
        {
            alert('hubo un error' + response.d);
                
        }
    dataSource.read();
    
}