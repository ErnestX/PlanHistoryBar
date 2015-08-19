'use strict';

MY_GLOBAL.previewWindowRenderer = {
    previewWindow: null, 
    frontImage: null,
    backImage:null,
    initWithPreviewWindow: function(w, p) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(w);
        
        this.previewWindow = w;
        /*NOTE: can dynamically adjust image size by setting pewviewWindow's height, 
        e.g. this.previewWindow.css('height', '700px'); */
        
        // create two imgs place holders
        this.frontImage = this.createPlaceHolderImage();
        this.backImage = this.createPlaceHolderImage();
        this.previewWindow.append(this.backImage);
        this.previewWindow.append(this.frontImage);
    }, 
    
    showPreviewForPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newPlan = p;
        
        if((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
        
            // Step1: update front img src and fadein
            this.frontImage.addClass('hidden');
            this.frontImage.attr('src', newPlan.previewWindowSrc);
            this.frontImage.removeClass('hidden');
            this.frontImage.addClass('fadingIn');

            // Step2: once finished fading in, remove css animation and update the back image
            this.frontImage.one('animationend', function() {
                MY_GLOBAL.
                previewWindowRenderer.
                frontImage.removeClass('fadingIn');

                MY_GLOBAL.
                previewWindowRenderer.
                backImage.attr('src', newPlan.previewWindowSrc);
            });
        }
    }, 
    
    createPlaceHolderImage: function() {
        var image = $('<img>');
        image.addClass("previewWindowImage");
        return image;
    }
};