
var app = new kendo.mobile.Application($(document.body));
function doGetCurrentURL()
{
    
   
    return "http://www.smasoftware.com/SMAMobileServiceForTest/SMAMobileServiceForTest.asmx/"
}


function Redirect(NextPage) 
{
  $('#floatingBarsG').show();  // show the loading message.
 app.navigate(NextPage);
}




function BackToPreviousPage() 
{
 
 //var app = new kendo.mobile.Application();
 app.navigate("#:back");
    

}



function BackToPreviousPage2() 
{
 
 //var app = new kendo.mobile.Application();
    //app.navigate("#:back");
    doSearch()
 
    

}








function PageLoad()
{
      $('#floatingBarsG').hide(); // hide the loading message 
}  







function fade()
{
    $("li").fadeIn(300,function(){
        $("li").show();
    });
}







