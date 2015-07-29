"use strict";

MY_GLOBAL.planProto = {
    thumbnailSrc: '', 
    previewSrc: '', 
    initWithSrcs: function(thumbnailSource, previewSource) { //TODO: add more para
        MY_GLOBAL.typeChecker.assertIsString(thumbnailSource);
        MY_GLOBAL.typeChecker.assertIsString(previewSource);
        
        this.thumbnailSrc = thumbnailSource;
        this.previewSrc = previewSource;
    }, 
    
    getThumbnailImage: function() {
        var thumbnail = new Image();
        thumbnail.src = this.thumbnailSrc;
        thumbnail.classList.add("photo");
        thumbnail.classList.add("unselected");    
        return thumbnail;
    }, 
    
    getPreviewImage: function() {
        var image = new Image();
        image.src = this.previewSrc;
        image.classList.add("photo");
        image.classList.add("unselected");    
        return image;
    }
};
