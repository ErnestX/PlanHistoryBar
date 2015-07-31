"use strict";

MY_GLOBAL.planProto = {
    thumbnailSrc: '', 
    previewWindowSrc: '', 
    initWithSrcs: function(thumbnailSource, previewWindowSource) { //FUTURE: add more para
        MY_GLOBAL.typeChecker.assertIsString(thumbnailSource);
        MY_GLOBAL.typeChecker.assertIsString(previewWindowSource);
        
        this.thumbnailSrc = thumbnailSource;
        this.previewWindowSrc = previewWindowSource;
    }
};
