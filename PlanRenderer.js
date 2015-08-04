MY_GLOBAL.planRenderer = {
    renderDivFromPlan: function(plan) {
        MY_GLOBAL.typeChecker.assertIsPlan(plan);
        
        var divv = $('<div/>');
        divv.addClass('planDiv');
        divv.addClass('unselected');
        
        // render thumbnail img
        var thumbnail = $('<img>');
        thumbnail.attr('src', plan.thumbnailSrc);
        thumbnail.addClass("thumbnail");
//        thumbnail.addClass("unselected");  
        divv.append(thumbnail); // append may not work b/c div is not in document yet???
        
        return divv;
    }, 
    
    calcLineCoordsFromPlan: function(plan) {
        // FUTURE: call line renderer with coords
    }
}