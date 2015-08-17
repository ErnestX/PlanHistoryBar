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
        
        var newYPos;
        if (this.yPosArray.length === 0) {
            // the first plan. Put at the center
            newYPos = this.plansContainer.width()/2;
        } else {
            // follow the last entry
            newYPos = this.yPosArray[this.yPosArray.length - 1] 
                + this.thumbnailWidth 
                + this.thumbnailPadding;
        }
        this.yPosArray.push(newYPos);
        var newPlanJQuery = MY_GLOBAL.thumbnailsRenderer.renderDivFromPlan(p);
        newPlanJQuery.css('left', newYPos);
        this.plansContainer.append(newPlanJQuery);
        
        this.centerYPosArrayEntriesWithinPlansContainer();
        this.syncAllThumbnailsYPosWithArray();
        console.log(this.yPosArray);
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
        for (var i=0; i<this.yPosArray.length; i++) {
            sum += this.yPosArray[i];
        }
        var midY = this.plansContainer.width()/2;
        var translation = (midY * this.yPosArray.length - sum) / this.yPosArray.length;
        
        for (var i=0; i<this.yPosArray.length; i++) {
            this.yPosArray[i] += translation;
        }
    }, 
    
    syncAllThumbnailsYPosWithArray: function() {
        for(var i=0; i<this.plansContainer.children().length; i++) {
            this.plansContainer.children().eq(i).
            css('left', this.yPosArray[i].toString() + 'px');
        }
    }
};