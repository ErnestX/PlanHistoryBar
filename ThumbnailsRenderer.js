MY_GLOBAL.thumbnailsRenderer = {
    thumbnailsContainer: null, 
    
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this.thumbnailsContainer = c;
    }, 
    
    syncAllThumbnailsYPosWithArray: function(midYPosArray) {
        for(var i=0; i<this.thumbnailsContainer.children().length; i++) {
            this.thumbnailsContainer.children().eq(i).
            css('left', this.midYPosToLeftEdgePos(midYPosArray[i]).toString() + 'px');
        }
    }, 
    
    appendThumbnailFromPlanAtMidYPos: function(p, midYPos) {
        var newPlanJQuery = MY_GLOBAL.thumbnailDivRenderer.renderDivFromPlan(p);
        newPlanJQuery.css('left', this.midYPosToLeftEdgePos(midYPos));
        this.thumbnailsContainer.append(newPlanJQuery);
    },
    
    prependThumbnailFromPlanAtMidYPos: function(p, midYPos) {
        // TODO: stub
    },
    
    removeHeadThumbnail: function() {
        this.thumbnailsContainer.children().eq(0).remove();
    },
    
    removeTailThumbnail: function() {
        this.thumbnailsContainer.children().last().remove();
    },
    
    midYPosToLeftEdgePos: function(y) {
        return y - MY_GLOBAL.thumbnailWidth/2;
    }
};