"use strict";

MY_GLOBAL.planProto = {
    thumbnailSrc: '', 
    previewWindowSrc: '', 
    initWithSrcs: function(thumbnailSource, previewWindowSource) { //TODO: add more para
        MY_GLOBAL.typeChecker.assertIsString(thumbnailSource);
        MY_GLOBAL.typeChecker.assertIsString(previewWindowSource);
        
        this.thumbnailSrc = thumbnailSource;
        this.previewWindowSrc = previewWindowSource;
    }, 
    
    getThumbnailImage: function() {
        var thumbnail = new Image();
        thumbnail.src = this.thumbnailSrc;
        thumbnail.classList.add("photo");
        thumbnail.classList.add("unselected");    
        return thumbnail;
    }, 
    
    getPreviewWindowImage: function() {
        var image = new Image();
//        console.log(this.previewWindowSrc);
        image.src = this.previewWindowSrc;
        image.classList.add("previewWindow");
        return image;
    }
};
