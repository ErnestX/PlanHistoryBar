MY_GLOBAL.plansRenderer = {
    plansContainer: null, 
    midXPosArray:[], 
    
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this.plansContainer = c;
    }, 
    
    highlightPlanOnScreenAtIndex: function(index) {
        for (var i=0; i<this.midXPosArray.length; i++) {
            if (i < index) {
                this.midXPosArray[i] -= MY_GLOBAL.selectedThumbnailPadding;
            } else if(i > index) {
                this.midXPosArray[i] += MY_GLOBAL.selectedThumbnailPadding;
            }
        }
        this.centerXPosArrayRelativeToContainer();
        MY_GLOBAL.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this.midXPosArray);
        MY_GLOBAL.graphsRenderer.syncAllDataPointsXPosWithArray(this.midXPosArray);
    }, 
    
    unhighlightAllPlansOnScreen: function() {
        for (var i=1; i<this.midXPosArray.length; i++) {
            if (this.midXPosArray[i] - this.midXPosArray[i-1] 
                > MY_GLOBAL.thumbnailPadding + MY_GLOBAL.thumbnailWidth) {
                // ...[][][] space []...
                for (var j=0; j < i; j++) { //j from 0 to i-1
                    this.midXPosArray[j] += (this.midXPosArray[i] - this.midXPosArray[i-1]) 
                                            - (MY_GLOBAL.thumbnailWidth + MY_GLOBAL.thumbnailPadding);
                }
            }
        }
        this.centerXPosArrayRelativeToContainer();
        MY_GLOBAL.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this.midXPosArray);
        MY_GLOBAL.graphsRenderer.syncAllDataPointsXPosWithArray(this.midXPosArray);
    },
    
    appendPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newXPos;
        if (this.midXPosArray.length === 0) {
            // the first plan. Put at the center
            newXPos = this.plansContainer.width()/2;
        } else {
            // follow the last entry
            newXPos = this.midXPosArray[this.midXPosArray.length - 1] 
                + MY_GLOBAL.thumbnailWidth 
                + MY_GLOBAL.thumbnailPadding;
        }
        this.midXPosArray.push(newXPos);
    
        MY_GLOBAL.thumbnailsRenderer.appendThumbnailFromPlanAtMidXPos(p, newXPos);
        MY_GLOBAL.graphsRenderer.appendDataPointFromPlanAtMidXPos(p, newXPos);
        
        this.centerXPosArrayRelativeToContainer();
        MY_GLOBAL.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this.midXPosArray);
        MY_GLOBAL.graphsRenderer.syncAllDataPointsXPosWithArray(this.midXPosArray);
//        console.log(this.midXPosArray);
    }, 
    
    prependPlan: function(p) {
        // TODO: REFACTOR
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newXPos;
        if (this.midXPosArray.length === 0) {
            // the first plan. Put at the center
            newXPos = this.plansContainer.width()/2;
        } else {
            // follow the first entry
            newXPos = this.midXPosArray[0] 
                - MY_GLOBAL.thumbnailWidth 
                - MY_GLOBAL.thumbnailPadding;
        }
        this.midXPosArray.push(newXPos);
    
        MY_GLOBAL.thumbnailsRenderer.appendThumbnailFromPlanAtMidXPos(p, newXPos);
        MY_GLOBAL.graphsRenderer.appendDataPointFromPlanAtMidXPos(p, newXPos);
        
        this.centerXPosArrayRelativeToContainer();
        MY_GLOBAL.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this.midXPosArray);
        MY_GLOBAL.graphsRenderer.syncAllDataPointsXPosWithArray(this.midXPosArray);
    }, 
    
    removeHeadPlan: function() {
        this.midXPosArray.shift();
        MY_GLOBAL.thumbnailsRenderer.removeHeadThumbnail();
        MY_GLOBAL.graphsRenderer.removeHeadDataPoint();
    }, 
    
    removeTailPlan: function() {
        this.midXPosArray.pop();
        MY_GLOBAL.thumbnailsRenderer.removeTailThumbnail();
        MY_GLOBAL.graphsRenderer.removeTailDataPoint();
    }, 
    
    centerXPosArrayRelativeToContainer: function() {
        // based on formula: mid-(x1+t) + mid-(x2+t) + ... + mid-(xn+t) = 0
        var sum = 0;
        for (var i=0; i<this.midXPosArray.length; i++) {
            sum += this.midXPosArray[i];
        }
        var midY = this.plansContainer.width()/2;
        var translation = (midY * this.midXPosArray.length - sum) / this.midXPosArray.length;
        
        for (var i=0; i<this.midXPosArray.length; i++) {
            this.midXPosArray[i] += translation;
        }
    }
};