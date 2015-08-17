MY_GLOBAL.plansRenderer = {
    plansContainer: null, 
    midYPosArray:[], 
    
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this.plansContainer = c;
    }, 
    
    highlightPlanOnScreenAtIndex: function(index) {
        for (var i=0; i<this.midYPosArray.length; i++) {
            if (i < index) {
                this.midYPosArray[i] -= MY_GLOBAL.selectedThumbnailPadding;
            } else if(i > index) {
                this.midYPosArray[i] += MY_GLOBAL.selectedThumbnailPadding;
            }
        }
        this.centerYPosArrayRelativeToContainer();
//        this.syncAllThumbnailsYPosWithArray();
        MY_GLOBAL.thumbnailsRenderer.syncAllThumbnailsYPosWithArray(this.midYPosArray);
    }, 
    
    unhighlightAllPlansOnScreen: function() {
        for (var i=1; i<this.midYPosArray.length; i++) {
            if (this.midYPosArray[i] - this.midYPosArray[i-1] 
                > MY_GLOBAL.thumbnailPadding + MY_GLOBAL.thumbnailWidth) {
                // ...[][][] space []...
                for (var j=0; j < i; j++) { //j from 0 to i-1
                    this.midYPosArray[j] += (this.midYPosArray[i] - this.midYPosArray[i-1]) 
                                            - (MY_GLOBAL.thumbnailWidth + MY_GLOBAL.thumbnailPadding);
                }
            }
        }
        this.centerYPosArrayRelativeToContainer();
//        this.syncAllThumbnailsYPosWithArray();
        MY_GLOBAL.thumbnailsRenderer.syncAllThumbnailsYPosWithArray(this.midYPosArray);
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
                + MY_GLOBAL.thumbnailWidth 
                + MY_GLOBAL.thumbnailPadding;
        }
        this.midYPosArray.push(newYPos);
        
//        var newPlanJQuery = MY_GLOBAL.thumbnailDivRenderer.renderDivFromPlan(p);
//        newPlanJQuery.css('left', this.midYPosToLeftEdgePos(newYPos));
//        this.plansContainer.append(newPlanJQuery);
        MY_GLOBAL.thumbnailsRenderer.appendThumbnailFromPlanAtMidYPos(p, newYPos);
        
        this.centerYPosArrayRelativeToContainer();
//        this.syncAllThumbnailsYPosWithArray();
        MY_GLOBAL.thumbnailsRenderer.syncAllThumbnailsYPosWithArray(this.midYPosArray);
        console.log(this.midYPosArray);
    }, 
    
    prependPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        this.plansContainer.prepend(MY_GLOBAL.thumbnailDivRenderer.renderDivFromPlan(p));
    }, 
    
    removeHeadPlan: function() {
        this.midYPosArray.shift();
//        this.plansContainer.children().eq(0).remove();
        MY_GLOBAL.thumbnailsRenderer.removeHeadThumbnail();
    }, 
    
    removeTailPlan: function() {
        this.midYPosArray.pop();
//        this.plansContainer.children().last().remove();
        MY_GLOBAL.thumbnailsRenderer.removeTailThumbnail();
    }, 
    
    centerYPosArrayRelativeToContainer: function() {
        // based on formula: mid-(y1+t) + mid-(y2+t) + ... + mid-(yn+t) = 0
        var sum = 0;
        for (var i=0; i<this.midYPosArray.length; i++) {
            sum += this.midYPosArray[i];
        }
        var midY = this.plansContainer.width()/2;
        var translation = (midY * this.midYPosArray.length - sum) / this.midYPosArray.length;
        
        for (var i=0; i<this.midYPosArray.length; i++) {
            this.midYPosArray[i] += translation;
        }
    }
    
//    syncAllThumbnailsYPosWithArray: function() {
//        for(var i=0; i<this.plansContainer.children().length; i++) {
//            this.plansContainer.children().eq(i).
//            css('left', this.midYPosToLeftEdgePos(this.midYPosArray[i]).toString() + 'px');
//        }
//    }, 
    
//    midYPosToLeftEdgePos: function(y) {
//        return y - MY_GLOBAL.thumbnailWidth/2;
//    }
};