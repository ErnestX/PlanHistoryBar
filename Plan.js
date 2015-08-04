"use strict";

MY_GLOBAL.planProto = {
    thumbnailSrc: '', 
    previewWindowSrc: '', 
    timeStamp: null, 
    initWithSrcs: function(thumbnailSource, previewWindowSource, date) { //FUTURE: add more para
        MY_GLOBAL.typeChecker.assertIsString(thumbnailSource);
        MY_GLOBAL.typeChecker.assertIsString(previewWindowSource);
        MY_GLOBAL.typeChecker.assertIsDate(date);
        
        this.timeStamp = date;
        this.thumbnailSrc = thumbnailSource;
        this.previewWindowSrc = previewWindowSource;
    }
};
