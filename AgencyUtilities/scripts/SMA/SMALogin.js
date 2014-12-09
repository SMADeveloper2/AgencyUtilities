
function Login()
{

    

   $('#floatingBarsG').show();  // show the loading message.
    
     if ($('#check').is(':checked'))
    {
        localStorage.setItem("AgencyCode",$('#txtAgencyCode').val())
        localStorage.setItem("Username",$('#txtUsername').val()) 
		localStorage.setItem("Password",$('#txtPassword').val())
        
    }
    
    
    
    
   //var dataWeb ="{'invoiceID':'" + "48023" +   "','Key':'" + "12345"  +    "','Message':'" + $('#txtMessage').val()  +   "','User':'" + "65"  +   "','Company':'" + "ALB" + "'}";
    //var dataWeb ="{'IdentityCode':'" + OriginalId  +   "','Key':'" + $('#hidKey').val()  +   "','Company':'" + $('#hidCompany').val() + "'}";
    var dataWeb ="{'Agency':'" +  $('#txtAgencyCode').val()  + "','Username': '" +  $('#txtUsername').val() + "','Password': '" + $('#txtPassword').val() + "','Company':'" + $('#hidCompany').val() + "'}"
    
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
                    url: pageUrl =doGetCurrentURL()+ "doLogin2",
                       
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
                    $('#hidAgencyUser').val(obj.User)
                     Redirect("MainFrame.html")
               }
               
            });
           
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

function doGetCredentials()
{
   
     $('#floatingBarsG').hide(); // hide the loading message 
    var Remember  =  localStorage.getItem("Remember")
    if (Remember==="ON")
    {
        
        $('#txtAgencyCode').val(localStorage.getItem("AgencyCode"))  
        $('#txtUsername').val(localStorage.getItem("Username")) 
		$('#txtPassword').val(localStorage.getItem("Password"))
        $('#check').attr('checked','checked');
        
    }
    else
    {
        localStorage.removeItem("AgencyCode");
        localStorage.removeItem("Username");
		localStorage.removeItem("Password")
    }
  
}


 $(document).ready(function() {
      doGetCredentials()
  });


function SetRemember()
{
     if ($('#check').is(':checked'))
    {
        localStorage.setItem("Remember","ON")
    }
    else
    {
        localStorage.removeItem("Remember");
    }
}

//----------------------------------------------------------------------------------------------------------------------


function Login2()
{

    

   $('#floatingBarsG').show();  // show the loading message.
    
     if ($('#check').is(':checked'))
    {
        localStorage.setItem("AgencyCode",$('#txtAgencyCode').val())
        localStorage.setItem("Username",$('#txtUsername').val()) 
		localStorage.setItem("Password",$('#txtPassword').val())
        
    }
    
    
    
    
   //var dataWeb ="{'invoiceID':'" + "48023" +   "','Key':'" + "12345"  +    "','Message':'" + $('#txtMessage').val()  +   "','User':'" + "65"  +   "','Company':'" + "ALB" + "'}";
    //var dataWeb ="{'IdentityCode':'" + OriginalId  +   "','Key':'" + $('#hidKey').val()  +   "','Company':'" + $('#hidCompany').val() + "'}";
    var dataWeb ="{'Agency':'" +  "US"  + "','Username': '" +  "ALB2" + "','Password': '" + "DALANDA07" + "','Company':'" + "ALB" + "'}"
    
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
                    url: pageUrl =doGetCurrentURL()+ "doLogin2",
                       
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
                     Redirect("MainFrame.html")
               }
               
            });
           
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

function doGetCredentials()
{
   
     $('#floatingBarsG').hide(); // hide the loading message 
    var Remember  =  localStorage.getItem("Remember")
    if (Remember==="ON")
    {
        
        $('#txtAgencyCode').val(localStorage.getItem("AgencyCode"))  
        $('#txtUsername').val(localStorage.getItem("Username")) 
		$('#txtPassword').val(localStorage.getItem("Password"))
        $('#check').attr('checked','checked');
        
    }
    else
    {
        localStorage.removeItem("AgencyCode");
        localStorage.removeItem("Username");
		localStorage.removeItem("Password")
    }
  
}


 $(document).ready(function() {
      doGetCredentials()
  });


function SetRemember()
{
     if ($('#check').is(':checked'))
    {
        localStorage.setItem("Remember","ON")
    }
    else
    {
        localStorage.removeItem("Remember");
    }
}