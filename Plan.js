"use strict";

MY_GLOBAL.planProto = {
    thumbnailSrc: "", 
    initWithThumbnail: function(t) { //TODO: add more para
        MY_GLOBAL.typeChecker.assertIsString(t);
        
        this.thumbnailSrc = t;
    }, 
    
    getThumbnailImage: function() {
        var thumbnail = new Image();
        thumbnail.src = this.thumbnailSrc;
        thumbnail.classList.add("photo");
        thumbnail.classList.add("unselected");    
        return thumbnail;
    }
};
