'use strict';

MY_GLOBAL.plansManager.previewWindowRenderer = {
    _previewWindow: null, 
    _frontImage: null,
    _backImage:null,
    initWithPreviewWindow: function(w, p) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(w);
        
        this._previewWindow = w;
        /*NOTE: can dynamically adjust image size by setting pewviewWindow's height, 
        e.g. this._previewWindow.css('height', '700px'); */
        
        // create two imgs place holders
        this._frontImage = this._createPlaceHolderImage();
        this._backImage = this._createPlaceHolderImage();
        this._previewWindow.append(this._backImage);
        this._previewWindow.append(this._frontImage);
    }, 
    
    showPreviewForPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newPlan = p;
        
        if((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
        
            // Step1: update front img src and fadein
            this._frontImage.addClass('hidden');
            this._frontImage.attr('src', newPlan.previewWindowSrc);
            this._frontImage.removeClass('hidden');
            this._frontImage.addClass('fadingIn');

            // Step2: once finished fading in, remove css animation and update the back image
            var that = this;
            this._frontImage.one('animationend', function() {
                that._frontImage.removeClass('fadingIn');
                that._backImage.attr('src', newPlan.previewWindowSrc);
            });
        }
    }, 
    
    _createPlaceHolderImage: function() {
        var image = $('<img>');
        image.addClass("previewWindowImage");
        return image;
    }
};