function doGetStatementReportForUtilities()
{
      var dataWeb ="{'Agency':'" +  $('#txtAgencyCode').val()  +    "','Key':'" + $('#hidKey').val()  +  "','Company':'" + $('#hidCompany').val() + "'}";
    
    
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
                       url: pageUrl =doGetCurrentURL()+ "doGetStatementReportForUtilities",
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
               
              
               
               
            });
           
        }
        
        function ShowError(response) 
        {
            alert('hubo un error' + response.d);
                
        }
    dataSource.read();
}
