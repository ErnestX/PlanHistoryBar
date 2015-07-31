'use strict';

MY_GLOBAL.previewWindowManager = {
    previewWindow: null, 
    initWithPreviewWindowAndIndex: function(w, i) {
        MY_GLOBAL.typeChecker.assertIsObject(w);
        MY_GLOBAL.typeChecker.assertIsInteger(i);
        
        this.previewWindow = w;
        this.showPreviewWindowOfIndex(i);
    }, 
    
    showPreviewWindowOfIndex: function(i) {
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(i);
//        this.previewWindow.addClass("fadingOut");
//        this.previewWindow.css('background-image', 'url(/' + newPlan.previewWindowSrc + ')');
        
        var newPreviewImage = this.renderPreviewWindowImageFromSource(newPlan.previewWindowSrc);
        this.previewWindow.children().remove(); //NOTE: removes all the children of the previewWindow
        this.previewWindow.append(newPreviewImage);
        newPreviewImage.classList.add("fadingIn");
        this.previewWindow.one('animationend', function() {
//            MY_GLOBAL.previewWindowManager.previewWindow.children().remove(); //NOTE: removes all the children of the previewWindow
//            MY_GLOBAL.previewWindowManager.previewWindow.append(MY_GLOBAL.previewWindowManager.renderPreviewWindowImageFromSource(newPlan.previewWindowSrc));
//            console.log(newPlan.previewWindowSrc);
//            MY_GLOBAL.previewWindowManager.previewWindow.css('background-image', 'url(/' + newPlan.previewWindowSrc + ')');
//            MY_GLOBAL.previewWindowManager.previewWindow.addClass('fadingIn');
//            MY_GLOBAL.previewWindowManager.previewWindow.removeClass('fadingOut');
//            MY_GLOBAL.previewWindowManager.previewWindow.one('animationend', function() {
//                MY_GLOBAL.previewWindowManager.previewWindow.removeClass('fadingIn');
//            });
            
            
//-----------------------------------------------------
            MY_GLOBAL.
            previewWindowManager.
            previewWindow.
            css('background-image', 'url(/' + newPlan.previewWindowSrc + ')');
        });
    }, 
    
    renderPreviewWindowImageFromSource: function(source) {
        MY_GLOBAL.typeChecker.assertIsString(source);
        
        var image = new Image();
        image.src = source;
        image.classList.add("previewWindowImage");
        return image;
    }
}