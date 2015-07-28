"use strict";

MY_GLOBAL.planProto = {
    thumbnailSrc: "", 
    initWithThumbnail: function(t) { //TODO: add more para
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
