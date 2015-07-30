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
        this.previewWindow.addClass("fadingOut");
        this.previewWindow.one('animationend', function() {
            MY_GLOBAL.previewWindowManager.previewWindow.children().remove(); //NOTE: be careful about the mask
            MY_GLOBAL.previewWindowManager.previewWindow.append(newPlan.getPreviewWindowImage());
            MY_GLOBAL.previewWindowManager.previewWindow.addClass('fadingIn');
            MY_GLOBAL.previewWindowManager.previewWindow.removeClass('fadingOut');
            MY_GLOBAL.previewWindowManager.previewWindow.one('animationend', function() {
                MY_GLOBAL.previewWindowManager.previewWindow.removeClass('fadingIn');
            });
        });
    }
}