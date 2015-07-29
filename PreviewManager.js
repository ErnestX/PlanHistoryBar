MY_GLOBAL.previewManager = {
    window: null, 
    initWithWindowAndIndex: function(w, i) {
        MY_GLOBAL.typeChecker.assertIsObject(w);
        MY_GLOBAL.typeChecker.assertIsInteger(i);
        
        this.window = w;
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(i);
        
        this.window.append(newPlan.getPreviewImage());
    }
}