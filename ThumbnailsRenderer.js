MY_GLOBAL.plansManager.plansRenderer.thumbnailsRenderer = {
    _thumbnailsContainer: null, 
    
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this._thumbnailsContainer = c;
    }, 
    
    syncAllThumbnailsXPosWithArray: function(midXPosArray) {
        for(var i=0; i<this._thumbnailsContainer.children().length; i++) {
            this._thumbnailsContainer.children().eq(i).velocity({left: this._midXPosToLeftEdgePos(midXPosArray[i]).toString()}, {queue: false, duration: MY_GLOBAL.animationDurationInMS, easing: 'linear'});
        }
    }, 
    
    appendThumbnailFromPlanAtMidXPos: function(p, midXPos) {
        var newPlanJQuery = MY_GLOBAL.thumbnailDivRenderer.renderDivFromPlan(p);
        newPlanJQuery.css('left', this._midXPosToLeftEdgePos(midXPos));
        
        newPlanJQuery.css('opacity', 0);
        this._thumbnailsContainer.append(newPlanJQuery);
        newPlanJQuery.velocity({opacity: 1.0}, {queue: false, duration: MY_GLOBAL.animationDurationInMS, easing: 'linear'});
    },
    
    prependThumbnailFromPlanAtMidXPos: function(p, midXPos) {
        var newPlanJQuery = MY_GLOBAL.thumbnailDivRenderer.renderDivFromPlan(p);
        newPlanJQuery.css('left', this._midXPosToLeftEdgePos(midXPos));
        
        newPlanJQuery.css('opacity', 0);
        this._thumbnailsContainer.prepend(newPlanJQuery);
        newPlanJQuery.velocity({opacity: 1.0}, {queue: false, duration: MY_GLOBAL.animationDurationInMS, easing: 'linear'});
    },
    
    removeHeadThumbnail: function() {
        this._thumbnailsContainer.children().eq(0).remove();
    },
    
    removeTailThumbnail: function() {
        this._thumbnailsContainer.children().last().remove();
    },
    
    _midXPosToLeftEdgePos: function(x) {
        return x - MY_GLOBAL.thumbnailWidth/2;
    }
};