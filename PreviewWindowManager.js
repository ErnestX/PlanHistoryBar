'use strict';

MY_GLOBAL.previewWindowManager = {
    previewWindow: null, 
    frontImage: null,
    backImage:null,
    initWithPreviewWindowAndIndex: function(w, i) {
        MY_GLOBAL.typeChecker.assertIsObject(w);
        MY_GLOBAL.typeChecker.assertIsInteger(i);
        
        this.previewWindow = w;
//        this.previewWindow.css('height', '700px');
        
        // create a container with two imgs
        this.frontImage = this.createPlaceHolderImage();
        this.backImage = this.createPlaceHolderImage();
//        console.log(this.backImage);
        this.previewWindow.append(this.backImage);
        this.previewWindow.append(this.frontImage);
        
//        console.log(this.previewWindow.children());
        
        this.showPreviewWindowOfIndex(i);
    }, 
    
    showPreviewWindowOfIndex: function(i) {
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(i);
        
        // Step1: change front img src and fadein
        this.frontImage.addClass('hidden');
        this.frontImage.attr('src', newPlan.previewWindowSrc);
        this.frontImage.removeClass('hidden');
        this.frontImage.addClass('fadingIn');
        
//        var newPreviewImage = this.renderPreviewWindowImageFromSource(newPlan.previewWindowSrc);
//        this.previewWindow.append(newPreviewImage);
//        newPreviewImage.classList.add("fadingIn");
        
        this.frontImage.one('animationend', function() {
            // Step3: remove css animation and update the underlying image
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
    
//    renderPreviewWindowImageFromSource: function(source) {
//        MY_GLOBAL.typeChecker.assertIsString(source);
//        
//        var image = new Image();
//        image.src = source;
//        image.classList.add("previewWindowImage");
//        return image;
//    }
}