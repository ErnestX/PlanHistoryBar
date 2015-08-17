MY_GLOBAL.plansRenderer = {
    thumbnailWidth: 80, 
    thumbnailPadding: 1.5, 
    plansContainer: null, 
    midYPosArray:[], 
    
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this.plansContainer = c;
    }, 
    
    highlightPlanOnScreenAtIndex: function(index) {
//       // unselect all plans on screen
//        this.plansContainer.children().removeClass("selected");
//        this.plansContainer.children().addClass("unselected");
//        // select plan
//        this.plansContainer.children().eq(index).removeClass("unselected");
//        this.plansContainer.children().eq(index).addClass("selected");
    }, 
    
    appendPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newYPos;
        if (this.midYPosArray.length === 0) {
            // the first plan. Put at the center
            newYPos = this.plansContainer.width()/2;
        } else {
            // follow the last entry
            newYPos = this.midYPosArray[this.midYPosArray.length - 1] 
                + this.thumbnailWidth 
                + this.thumbnailPadding;
        }
        this.midYPosArray.push(newYPos);
        var newPlanJQuery = MY_GLOBAL.thumbnailsRenderer.renderDivFromPlan(p);
        newPlanJQuery.css('left', this.midYPosToLeftEdgePos(newYPos));
        this.plansContainer.append(newPlanJQuery);
        
        this.centerYPosArrayEntriesWithinPlansContainer();
        this.syncAllThumbnailsYPosWithArray();
        console.log(this.midYPosArray);
    }, 
    
    prependPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        this.plansContainer.prepend(MY_GLOBAL.thumbnailsRenderer.renderDivFromPlan(p));
    }, 
    
    removeHeadPlan: function() {
        this.plansContainer.children().eq(0).remove();
    }, 
    
    removeTailPlan: function() {
        this.plansContainer.children().last().remove();
    }, 
    
    centerYPosArrayEntriesWithinPlansContainer: function() {
        var sum = 0;
        for (var i=0; i<this.midYPosArray.length; i++) {
            sum += this.midYPosArray[i];
        }
        var midY = this.plansContainer.width()/2;
        var translation = (midY * this.midYPosArray.length - sum) / this.midYPosArray.length;
        
        for (var i=0; i<this.midYPosArray.length; i++) {
            this.midYPosArray[i] += translation;
        }
    }, 
    
    syncAllThumbnailsYPosWithArray: function() {
        for(var i=0; i<this.plansContainer.children().length; i++) {
            this.plansContainer.children().eq(i).
            css('left', this.midYPosToLeftEdgePos(this.midYPosArray[i]).toString() + 'px');
        }
    }, 
    
    midYPosToLeftEdgePos: function(y) {
        return y - this.thumbnailWidth/2;
    }
};