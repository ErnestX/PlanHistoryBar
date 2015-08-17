MY_GLOBAL.plansRenderer = {
    thumbnailWidth: 80, 
    thumbnailPadding: 1.5, 
    plansContainer: null, 
    yPosArray:[], 
    
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this.plansContainer = c;
    }, 
    
    highlightPlanOnScreenAtIndex: function(index) {
       // unselect all plans on screen
        this.plansContainer.children().removeClass("selected");
        this.plansContainer.children().addClass("unselected");
        // select plan
        this.plansContainer.children().eq(index).removeClass("unselected");
        this.plansContainer.children().eq(index).addClass("selected"); 
    }, 
    
    appendPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newPlanJQuery = MY_GLOBAL.thumbnailGroupRenderer.renderDivFromPlan(p);
        this.plansContainer.append(newPlanJQuery);
    }, 
    
    prependPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        this.plansContainer.prepend(MY_GLOBAL.thumbnailGroupRenderer.renderDivFromPlan(p));
    }, 
    
    removeHeadPlan: function() {
        this.plansContainer.children().eq(0).remove();
    }, 
    
    removeTailPlan: function() {
        this.plansContainer.children().last().remove();
    }
};