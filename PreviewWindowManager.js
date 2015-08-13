'use strict';

MY_GLOBAL.previewWindowManager = {
    previewWindow: null, 
    frontImage: null,
    backImage:null,
    initWithPreviewWindowAndIndex: function(w, i) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(w);
        MY_GLOBAL.typeChecker.assertIsInteger(i);
        
        this.previewWindow = w;
        /*NOTE: can dynamically adjust image size by setting pewviewWindow's height, 
        e.g. this.previewWindow.css('height', '700px'); */
        
        // create two imgs place holders
        this.frontImage = this.createPlaceHolderImage();
        this.backImage = this.createPlaceHolderImage();
        this.previewWindow.append(this.backImage);
        this.previewWindow.append(this.frontImage);
        
        this.showPreviewForPlanIndex(i);
    }, 
    
    showPreviewForPlanIndex: function(i) {
        MY_GLOBAL.typeChecker.assertIsInteger(i);
        
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(i);
        
        // Step1: update front img src and fadein
        this.frontImage.addClass('hidden');
        this.frontImage.attr('src', newPlan.previewWindowSrc);
        this.frontImage.removeClass('hidden');
        this.frontImage.addClass('fadingIn');
        
        // Step2: once finished fading in, remove css animation and update the back image
        this.frontImage.one('animationend', function() {
            MY_GLOBAL.
            previewWindowManager.
            frontImage.removeClass('fadingIn');
            
            MY_GLOBAL.
            previewWindowManager.
            backImage.attr('src', newPlan.previewWindowSrc);
        });
    }, 
    
    createPlaceHolderImage: function() {
        var image = $('<img>');
        image.addClass("previewWindowImage");
        return image;
    },
}