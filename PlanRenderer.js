MY_GLOBAL.planRenderer = {
    renderDivFromPlan: function(plan) {
        MY_GLOBAL.typeChecker.assertIsPlan(plan);
        
        var div = $('<div>');
        div.addClass('planDiv');
        div.addClass('unselected');
        
        // render thumbnail img
        var thumbnail = $('<img>');
        thumbnail.attr('src', plan.thumbnailSrc);
        thumbnail.addClass("thumbnail");
//        thumbnail.addClass("unselected");  
        div.append(thumbnail);
        
        return div;
    }, 
    
    calcLineCoordsFromPlan: function(plan) {
        // FUTURE: call line renderer with coords
    }
}