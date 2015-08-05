"use strict";

MY_GLOBAL.planProto = {
    timeStamp: null, 
    saveName: '',
    thumbnailSrc: '', 
    previewWindowSrc: '', 
    initWithFields: function(date, name, thumbnailSource, previewWindowSource) { //FUTURE: add more para
        MY_GLOBAL.typeChecker.assertIsDate(date);
        MY_GLOBAL.typeChecker.assertIsString(name);
        MY_GLOBAL.typeChecker.assertIsString(thumbnailSource);
        MY_GLOBAL.typeChecker.assertIsString(previewWindowSource);
        
        this.timeStamp = date;
        this.saveName = name;
        this.thumbnailSrc = thumbnailSource;
        this.previewWindowSrc = previewWindowSource;
    }
};
