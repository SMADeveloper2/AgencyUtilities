function doDepositUpload()
{
     $('#floatingBarsG').show();
        if(document.getElementById('DepositImage').src === "")
      {
          $.pgwModal({
                           content: "Please select image first",
                           title: "Error" 
                    });
      }
     else
     {
         
        var ImagePath = document.getElementById('DepositImage').src ;
        ImagePath = ImagePath.replace("http://localfile/Simulator////", "");
        
        var TextConvertedtoBase64;
         
        var myCanvas  =   document.getElementById('cs')
        var ctx = document.getElementById('cs').getContext('2d');
        var img = new Image();
        img.src=document.getElementById('DepositImage').src;
        document.getElementById('cs').height=document.getElementById('DepositImage').naturalHeight;
        document.getElementById('cs').width=document.getElementById('DepositImage').naturalWidth;
        ctx.drawImage(img,0,0);
        TextConvertedtoBase64=myCanvas.toDataURL('image/jpeg');
        //TextConvertedtoBase64=myCanvas.toDataURL();
        
         
         
        var dataWeb ="{'base64String':'" + TextConvertedtoBase64 
         + "','Agency':'" + $('#txtAgencyCode').val()
         + "','Bank':'" + $('#ddlBank').val()
         + "','BankAccount':'" + $('#ddlBankAccount').val()
         + "','DateReal':'" + $('#txtDateToBePosted').val()
         + "','Total':'" + $('#txtTotalDeposit').val()
         + "','Description':'" + $('#txtDepositDescription').val()
         + "','AgencyUser':'" + $('#hidAgencyUser').val()
         + "','Company':'" + $('#hidCompany').val() + "'}"
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
               
               read: function (options) 
                {
                   $.ajax({
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    url: pageUrl =doGetCurrentURL()+ "doUploadDeposit",
                       
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
               
               if(obj.Code === "-1")
               {
	               $.pgwModal({
                           content: obj.Description,
                           title: "Error" 
                    });
               }
               else
               {
                     $.pgwModal({
                           content: "Successfully Uploaded!!",
                           title: "Successfully" 
                    });
               }
               
            });
           
                    }
        
        //function ShowError(response) 
        //{
        //    $('#floatingBarsG').hide(); // hide the loading message 
        //    alert ('hubo un error' +response.statusText )
        //   alert ('hubo un error' +response.responseText )
        //}
         
         function ShowError (jqXHR, textStatus, errorThrown)
         {
                alert(jqXHR.status);
                alert(jqXHR.statusText);
                alert(jqXHR.responseText);
         }
    
    dataSource.read();
    
           
     
     
     
     }
    
}

function DoGetBank()
{
   document.getElementById('txtDateToBePosted').valueAsDate = new Date();
    var dataWeb ="{'Key':'" + $('#hidKey').val() +  "','Company':'" + $('#hidCompany').val() +  "'}";
    
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
               
               read: function (options) 
                {
                   $.ajax({
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    //dataType: "json",
                    //url: "http://www.smasoftware.com/SMAMobileService/SMAMobileService.asmx/doGetBank",
                       url: pageUrl =doGetCurrentURL()+ "doGetBank",
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
             $("#ddlBank").kendoDropDownList(
			{
                index: 0,
        		dataTextField: "Name",
        		dataValueField: "Code",
				dataSource: dataSource,
 			});
            var ddlGeneric= $("#ddlBank").data("kendoDropDownList");
            ddlGeneric.bind("cascade", dropdownlist_changeBank );
            DoGetBankAccount()
        }
        
        function ShowError(response) 
        {
            alert('hubo un error' + response.d);
                
        }
    dataSource.read();
    
    
   
   
        
}

function DoGetBankAccount()
{
    var dataWeb ="{'Key':'" + $('#hidKey').val() +    "','Bank':'" + $('#ddlBank').val() +    "','Company':'" + $('#hidCompany').val() +  "'}";
    
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
               
               read: function (options) 
                {
                   $.ajax({
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    //dataType: "json",
                    //url: "http://www.smasoftware.com/SMAMobileService/SMAMobileService.asmx/doGetBank",
                       url: pageUrl =doGetCurrentURL()+ "doGetBankAccount",
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
             $("#ddlBankAccount").kendoDropDownList(
			{
                index: 0,
        		dataTextField: "AccountNumber",
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


function dropdownlist_changeBank()
{
    
    DoGetBankAccount()
}

