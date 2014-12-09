//document.addEventListener("deviceready", onDeviceReady, false);

var myData = ""; 
function id(element) {
    return document.getElementById(element);
}

function onDeviceReady() 
{
    //cameraApp = new cameraApp();
    //cameraApp.run();
}


function RunCamera() {
  
    if (jQuery.isEmptyObject(cameraApp))
    {
     cameraApp = new cameraApp()
     cameraApp.run();       
    }
    else 
    {
        cameraApp.run();       
    }
     
}



function SaveImage()
{
 
             
                 var imageData = myData;
    imageData = imageData.replace("http://localfile/Simulator////", "");
                 $.ajax({
                     type : "POST",

                     url : pageUrl =doGetCurrentURL()+ "doUploadFile",

                     data : {
                         image : imageData
                     },

                     beforeSend : function() {

                        // $("#comment2").text("Start ajax " + imageData.length);
                     },

                     success : function(data) {

                        // $("#comment2").text("Uploaded! " + data);
                     },

                     error : function(request, error) {

                        // $("#comment2").text("Error! " + error);
                     }
                 });
             
}



function cameraApp(){}

cameraApp.prototype={
    _pictureSource: null,
    
    _destinationType: null,
    
    run: function(){
        var that=this;
	    that._pictureSource = navigator.camera.PictureSourceType;
	    that._destinationType = navigator.camera.DestinationType;
         if (id("cmdTakePhoto") !== null )
        {
            try 
            {
                var new_element = id("cmdTakePhoto").cloneNode(true);
                id("cmdTakePhoto").parentNode.replaceChild(new_element, id("cmdTakePhoto"));
            }
            catch (e)
            {}
           id("cmdTakePhoto").addEventListener("click", function(){
            that._capturePhoto.apply(that,arguments);
            }, false);    
        }
        
        if (id("cmdTakePhoto2")!== null )
        {
            
            try 
            {
                var new_element2 = id("cmdTakePhoto2").cloneNode(true);
                id("cmdTakePhoto2").parentNode.replaceChild(new_element2,  id("cmdTakePhoto2"));
            }
            catch (e)
            {}
           id("cmdTakePhoto2").addEventListener("click", function(){
            that._capturePhoto.apply(that,arguments);
            }, false);    
        }
	    
	   // id("capturePhotoEditButton").addEventListener("click", function(){
         //   that._capturePhotoEdit.apply(that,arguments)
        //});
        if (id("cmdUploadPhoto")!== null )
        {
            try 
            {
                var new_element3 = id("cmdUploadPhoto").cloneNode(true);
                id("cmdUploadPhoto").parentNode.replaceChild(new_element3, id("cmdUploadPhoto"));  
            }
            catch (e)
            {}
             id("cmdUploadPhoto").addEventListener("click", function(){
                that._getPhotoFromLibrary.apply(that,arguments)
            }, false);   
        }
        
        if (id("cmdUploadPhoto2")!== null )
        {
            try 
            {
                var new_element4 = id("cmdUploadPhoto2").cloneNode(true);
                id("cmdUploadPhoto2").parentNode.replaceChild(new_element4,  id("cmdUploadPhoto2"));  
            }
            catch (e)
            {}
             id("cmdUploadPhoto2").addEventListener("click", function(){
                that._getPhotoFromLibrary.apply(that,arguments)
            }, false);   
        }
	    
	    //id("getPhotoFromAlbumButton").addEventListener("click", function(){
          //  that._getPhotoFromAlbum.apply(that,arguments);
        //});
    },
    
    _capturePhoto: function() {
        var that = this;
        
        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        },function(){
            that._onFail.apply(that,arguments);
        },{
            quality: 50,
            destinationType: that._destinationType.DATA_URL
        });
    },
    
    _capturePhotoEdit: function() {
        var that = this;
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        }, function(){
            that._onFail.apply(that,arguments);
        }, {
            quality: 20, allowEdit: true,
            destinationType: cameraApp._destinationType.DATA_URL
        });
    },
    
    _getPhotoFromLibrary: function() {
        var that= this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.PHOTOLIBRARY);         
    },
    
    _getPhotoFromAlbum: function() {
        var that= this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.SAVEDPHOTOALBUM)
    },
    
    _getPhoto: function(source) {
        var that = this;
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(function(){
            that._onPhotoURISuccess.apply(that,arguments);
        }, function(){
            cameraApp._onFail.apply(that,arguments);
        }, {
            quality: 50,
            destinationType: cameraApp._destinationType.FILE_URI,
            sourceType: source
        });
    },
    
   
    
    _onPhotoDataSuccess: function(imageData) {
        
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'inline-block';
        document.getElementById('smallImage').style.display = 'inline-block'
        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + imageData;
        
        myData = imageData;
       $.pgwModal({
                            target: '#ShowPreview',
           titleBar: false
                           
          });
    },
    
    _onPhotoURISuccess: function(imageURI) {
        
        // Show the captured photo.
        
        myData = imageURI;
        var URL = document.URL
        var n = URL.indexOf("DepositUpload.html");
        
        if (n>0)
        {
            
            var DepositImage = document.getElementById('DepositImage');
            DepositImage.style.display = 'inline-block';
            document.getElementById('DepositImage').style.display = 'inline-block'
            DepositImage.src = imageURI;
             $.pgwModal({
                            target: "#ShowPreviewDeposit",
            titleBar: false,
            
                           
          });
        
         
        }
        else
        {
            
             var IdDImage = document.getElementById('IdDImage');
             IdDImage.style.display = 'inline-block';
            document.getElementById('IdDImage').style.display = 'inline-block'
            IdDImage.src = imageURI;
            $.pgwModal({
                            target:"#ShowPreviewID",
            titleBar: false,
            
                           
          });
             
        }
        
        
        
    },
    
    _onFail: function(message) {
        //alert(message);
    }
  
}
 

