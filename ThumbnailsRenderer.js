MY_GLOBAL.plansManager.plansRenderer.thumbnailsRenderer = {
    thumbnailsContainer: null, 
    
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this.thumbnailsContainer = c;
    }, 
    
    syncAllThumbnailsXPosWithArray: function(midXPosArray) {
        for(var i=0; i<this.thumbnailsContainer.children().length; i++) {
            this.thumbnailsContainer.children().eq(i).velocity({left: this.midXPosToLeftEdgePos(midXPosArray[i]).toString()}, {queue: false, duration: MY_GLOBAL.animationDuration});
        }
    }, 
    
    appendThumbnailFromPlanAtMidXPos: function(p, midXPos) {
        var newPlanJQuery = MY_GLOBAL.thumbnailDivRenderer.renderDivFromPlan(p);
        newPlanJQuery.css('left', this.midXPosToLeftEdgePos(midXPos));
        
        newPlanJQuery.css('opacity', 0);
        this.thumbnailsContainer.append(newPlanJQuery);
        newPlanJQuery.velocity({opacity: 1.0}, {queue: false, duration: MY_GLOBAL.animationDuration});
    },
    
    prependThumbnailFromPlanAtMidXPos: function(p, midXPos) {
        var newPlanJQuery = MY_GLOBAL.thumbnailDivRenderer.renderDivFromPlan(p);
        newPlanJQuery.css('left', this.midXPosToLeftEdgePos(midXPos));
        
        newPlanJQuery.css('opacity', 0);
        this.thumbnailsContainer.prepend(newPlanJQuery);
        newPlanJQuery.velocity({opacity: 1.0}, {queue: false, duration: MY_GLOBAL.animationDuration});
    },
    
    removeHeadThumbnail: function() {
        this.thumbnailsContainer.children().eq(0).remove();
    },
    
    removeTailThumbnail: function() {
        this.thumbnailsContainer.children().last().remove();
    },
    
    midXPosToLeftEdgePos: function(x) {
        return x - MY_GLOBAL.thumbnailWidth/2;
    }
};