function doSearch()
{
    //var app = new kendo.mobile.Application($(document.body));
	//app.navigate("#invoiceSearch",'slide:right');
    Redirect("InvoiceView.html")
                            //'Agency': $("#txtAgencyCode").val() ,  'Transaction': $('#txtTransactionNumber').val() ,  'Folio': $('#txtFolio').val() ,'SenderName': $('#txtSenderName').val() ,'RecipientName': $('#txtRecipientName').val(),'Status': $('#dropdown').val(),'Company': $('#hidCompany').val() }
     var dataWeb ="{'Agency':'" +  $('#txtAgencyCode').val()  + "','Transaction': '" +  $('#txtTransactionNumber').val() + "','Folio': '" + $('#txtFolio').val()  + "','SenderName': '" + $('#txtSenderName').val() +  "','RecipientName': '" + $('#txtRecipientName').val() + "','Status': '" + $('#ddlStatus').val() +    "','Key':'" + $('#hidKey').val()  +  "','Company':'" + $('#hidCompany').val() + "'}";
    
    
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
                       url: pageUrl =doGetCurrentURL()+ "doSearch",
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
             $("#InvoiceList").kendoMobileListView(
			{
                template: $("#InvoiceViewTemplate").html(),
				dataSource: dataSource,
                
                click: function(e)
                {
                    try{
                                        $('#hidIdentityCode').val(e.dataItem.OriginalID)
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


function DoGetStatusList()
{
    var dataWeb ="{'Key':'" + $('#hidKey').val() +    "','Company':'" + $('#hidCompany').val() +  "'}";
    
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
               
               read: function (options) 
                {
                   $.ajax({
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    //dataType: "json",
                    //url: "http://www.smasoftware.com/SMAMobileService/SMAMobileService.asmx/doGetTypeIdentification",
                       url: pageUrl =doGetCurrentURL()+ "DoGetStatusList",
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
            

        });
        
        function BindInfo(response) 
        {
            
           var NewDatasource  =jQuery.parseJSON( response.d );
           dataSource = NewDatasource;  
             $("#ddlStatus").kendoDropDownList(
			{
                index: 0,
        		dataTextField: "Name",
        		dataValueField: "Code",
				dataSource: dataSource,
 			});
            
           
        }
        
        function ShowError(response) 
        {
            alert('hubo un error' + response.d);
                
        }
    dataSource.read();
}

