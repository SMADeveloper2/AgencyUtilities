function doCreateMessage()
{

    

   $('#floatingBarsG').show();  // show the loading message.
   var dataWeb ="{'invoiceID':'" + "48023" +   "','Key':'" + "12345"  +    "','Message':'" + $('#txtMessage').val()  +   "','User':'" + "65"  +   "','Company':'" + "ALB" + "'}";
    //var dataWeb ="{'IdentityCode':'" + OriginalId  +   "','Key':'" + $('#hidKey').val()  +   "','Company':'" + $('#hidCompany').val() + "'}";
    
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
               
               read: function (options) 
                {
                   $.ajax({
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    //dataType: "json",
                    //url: "http://www.smasoftware.com/SMAMobileService/SMAMobileService.asmx/doGetInvoiceInfo",
                    url: pageUrl =doGetCurrentURL()+ "doCreateMessage",
                       
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
            
           //aqui tenes que leer la respuesta del Web Service 
             $('#floatingBarsG').hide(); // hide the loading message 
            
           $.each(JSON.parse(response.d), function(idx, obj) 
           {
               var Title = "Success"
               if(obj.Code === "-1")
               {
	               Title = "Error"
               }
               
               $.pgwModal({
                           content: obj.Description,
                           title: Title 
                    });
            });
           
            $('#txtMessage').val('');
        }
        
        function ShowError(response) 
        {
            $('#floatingBarsG').hide(); // hide the loading message 
            
           $.each(JSON.parse(response.d), function(idx, obj) {              
               $.pgwModal({
                           content: obj.Description,
                           title: "Error" 
                    });
 });
        }
    
    dataSource.read();
    

} 