'use strict';

MY_GLOBAL.previewWindowManager = {
    previewWindow: null, 
    initWithPreviewWindowAndIndex: function(w, i) {
        MY_GLOBAL.typeChecker.assertIsObject(w);
        MY_GLOBAL.typeChecker.assertIsInteger(i);
        
        this.previewWindow = w;
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(i);
        
        this.previewWindow.append(newPlan.getPreviewWindowImage());
    }, 
    showPreviewWindowOfIndex: function(i) {
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(i);
        this.previewWindow.children().remove(); //TODO: be careful of the mask
        
        this.previewWindow.removeClass('fadingIn');
        this.previewWindow.removeClass('fadingOut');
        this.previewWindow.addClass('fadingOut');
        this.previewWindow.one('animationend', function() {
            MY_GLOBAL.previewWindowManager.previewWindow.append(newPlan.getPreviewWindowImage());
            MY_GLOBAL.previewWindowManager.previewWindow.addClass('fadingIn');
        });
    }
}