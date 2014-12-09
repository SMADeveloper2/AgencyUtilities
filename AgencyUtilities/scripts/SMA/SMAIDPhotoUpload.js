 function doIdUpload()
{
     $('#floatingBarsG').show();
        if(document.getElementById('IdDImage').src === "")
      {
          $.pgwModal({
                           content: "Please select image first",
                           title: "Error" 
                    });
      }
     else
     {
         
        var ImagePath = document.getElementById('IdDImage').src ;
        ImagePath = ImagePath.replace("http://localfile/Simulator////", "");
        
        var TextConvertedtoBase64;
         
        var myCanvas  =   document.getElementById('cs')
        var ctx = document.getElementById('cs').getContext('2d');
        var img = new Image();
        img.src=document.getElementById('IdDImage').src;
        document.getElementById('cs').height=document.getElementById('IdDImage').naturalHeight;
        document.getElementById('cs').width=document.getElementById('IdDImage').naturalWidth;
        ctx.drawImage(img,0,0);
        TextConvertedtoBase64=myCanvas.toDataURL('image/jpeg');
        //TextConvertedtoBase64=myCanvas.toDataURL();
        
         
         
        var dataWeb ="{'base64String':'" + TextConvertedtoBase64 
         + "','InvoiceIdentity':'" + $('#hidIdentityCode').val()
         + "','IdType':'" + $('#ddlTypeIdentification').val()
         + "','IDNumber':'" + $('#txtIDNumber').val()
         + "','IdExpirationDate':'" + $('#txtIDExpirationDate').val()
         + "','Company':'" + $('#hidCompany').val() + "'}"
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
               
               read: function (options) 
                {
                   $.ajax({
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    url: pageUrl =doGetCurrentURL()+ "doUploadSenderIDFile",
                       
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



function DoGetTypeIdentification()
{
    Redirect('IDInvoicePhoto.html');
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
                       url: pageUrl =doGetCurrentURL()+ "doGetTypeIdentification",
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
             $("#ddlTypeIdentification").kendoDropDownList(
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
    
    dogetSenderIDInfo()
    
}

function dogetSenderIDInfo()
{
      var dataWeb ="{'InvoiceID':'" +  $('#hidIdentityCode').val()  +    "','Key':'" + $('#hidKey').val()  +  "','Company':'" + $('#hidCompany').val() + "'}";
    
    
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
                       url: pageUrl =doGetCurrentURL()+ "dogetSenderIDInfo",
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
               
               var ddlTypeIdentification = $("#ddlTypeIdentification").data("kendoDropDownList");
			   ddlTypeIdentification.value(obj.IdType);
               //$('#ddlTypeIdentification').val(obj.IdType)
               $('#txtIDNumber').val(obj.IDNumber)
               
               
               
               
               var from =obj.IDExpirationDate;
               var numbers = from.match(/\d+/g); 
               var date = new Date(numbers[2], numbers[0]-1, numbers[1]);
               date  = date.toISOString();
               
               $('#txtIDExpirationDate').val(date) 
               
               
            });
           
        }
        
        function ShowError(response) 
        {
            alert('hubo un error' + response.d);
                
        }
    dataSource.read();
}















