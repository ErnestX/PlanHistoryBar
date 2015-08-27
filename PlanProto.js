"use strict";

MY_GLOBAL.planProto = {
    timeStamp: null, 
    saveName: '',
    thumbnailSrc: '', 
    previewWindowSrc: '', 
    saver: '', 
    initWithFields: function(date, name, thumbnailSource, previewWindowSource) { //FUTURE: add more para
        MY_GLOBAL.typeChecker.assertIsDate(date);
        MY_GLOBAL.typeChecker.assertIsString(name);
        MY_GLOBAL.typeChecker.assertIsString(thumbnailSource);
        MY_GLOBAL.typeChecker.assertIsString(previewWindowSource);
        
        this.timeStamp = date;
        this.saveName = name;
        this.thumbnailSrc = thumbnailSource;
        this.previewWindowSrc = previewWindowSource;
        this.saver = 'placeHolderSaver';
    }, 
    
    getValueOfIndicator: function(indicatorName) {
        MY_GLOBAL.typeChecker.assertIsString(indicatorName);
        
        var fakeValue = Math.random() * (MY_GLOBAL.canvasHeightSmall - 10) + 5;
        return fakeValue;
    }
};
