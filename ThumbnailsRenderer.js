MY_GLOBAL.thumbnailsRenderer = {
    thumbnailsContainer: null, 
    
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this.thumbnailsContainer = c;
    }, 
    
    syncAllThumbnailsXPosWithArray: function(midXPosArray) {
        for(var i=0; i<this.thumbnailsContainer.children().length; i++) {
            this.thumbnailsContainer.children().eq(i).velocity({left: this.midXPosToLeftEdgePos(midXPosArray[i]).toString()}, {queue: false, duration: 1000});
//            css('left', this.midXPosToLeftEdgePos(midXPosArray[i]).toString() + 'px');
        }
    }, 
    
    appendThumbnailFromPlanAtMidXPos: function(p, midXPos) {
        var newPlanJQuery = MY_GLOBAL.thumbnailDivRenderer.renderDivFromPlan(p);
        newPlanJQuery.css('left', this.midXPosToLeftEdgePos(midXPos));
        this.thumbnailsContainer.append(newPlanJQuery);
    },
    
    prependThumbnailFromPlanAtMidXPos: function(p, midXPos) {
        // TODO: stub
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