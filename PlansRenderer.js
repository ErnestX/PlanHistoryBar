"use strict";

MY_GLOBAL.plansManager.plansRenderer = {
    _plansContainer: null, 
    // invariable: _midXPosArray.length = _plansOnScreenCache.length
    _midXPosArray:[], 
    _plansOnScreenCache:[], 
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this._plansContainer = c;
        this._midXPosArray = [];
        this._plansOnScreenCache = [];
        
        this.thumbnailsRenderer.initWithContainer($("#thumbnailsBar"));
        this.graphsRenderer.initWithGraphsContainerInString('#graphsContainer');
        // init indicator renderers
        this.graphsRenderer.appendLinearRendererForMetricNameAndInitWithPlansAndMidXPoses('testing', this._plansOnScreenCache, this._midXPosArray);
    }, 
    
    highlightPlanOnScreenAtIndex: function(index) {
        for (var i=0; i<this._midXPosArray.length; i++) {
            if (i < index) {
                this._midXPosArray[i] -= MY_GLOBAL.selectedThumbnailPadding;
            } else if(i > index) {
                this._midXPosArray[i] += MY_GLOBAL.selectedThumbnailPadding;
            }
        }
        this._centerXPosRelativeToPlan(index);
        
        this.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this._midXPosArray);
        this.graphsRenderer.syncAllDataPointsXPosWithArray(this._midXPosArray);
    }, 
    
    unhighlightAllPlansOnScreen: function() {
        for (var i=1; i<this._midXPosArray.length; i++) {
            if (this._midXPosArray[i] - this._midXPosArray[i-1] 
                > MY_GLOBAL.thumbnailPadding + MY_GLOBAL.thumbnailWidth) {
                // ...[][][] space []...
                for (var j=0; j < i; j++) { //j from 0 to i-1
                    this._midXPosArray[j] += (this._midXPosArray[i] - this._midXPosArray[i-1]) 
                                            - (MY_GLOBAL.thumbnailWidth + MY_GLOBAL.thumbnailPadding);
                }
            }
        }
        this.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this._midXPosArray);
        this.graphsRenderer.syncAllDataPointsXPosWithArray(this._midXPosArray);
    },
    
    appendPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newXPos;
        if (this._midXPosArray.length === 0) {
            // the first plan. Put at the center
            newXPos = this._plansContainer.width()/2;
        } else {
            // follow the last entry
            newXPos = this._midXPosArray[this._midXPosArray.length - 1] 
                + MY_GLOBAL.thumbnailWidth 
                + MY_GLOBAL.thumbnailPadding;
        }
        this._midXPosArray.push(newXPos);
        this._plansOnScreenCache.push(p);
        
        this.thumbnailsRenderer.appendThumbnailFromPlanAtMidXPos(p, newXPos);
        this.graphsRenderer.appendDataPointFromPlanAtMidXPos(p, newXPos);
        
        this.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this._midXPosArray);
        this.graphsRenderer.syncAllDataPointsXPosWithArray(this._midXPosArray);
    }, 
    
    prependPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newXPos;
        if (this._midXPosArray.length === 0) {
            // the first plan. Put at the center
            newXPos = this._plansContainer.width()/2;
        } else {
            // before the first entry
            newXPos = this._midXPosArray[0] 
                - MY_GLOBAL.thumbnailWidth 
                - MY_GLOBAL.thumbnailPadding;
        }
        this._midXPosArray.unshift(newXPos);
        this._plansOnScreenCache.unshift(p);
        
        this.thumbnailsRenderer.prependThumbnailFromPlanAtMidXPos(p, newXPos);
        this.graphsRenderer.prependDataPointFromPlanAtMidXPos(p, newXPos);
        
        this.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this._midXPosArray);
        this.graphsRenderer.syncAllDataPointsXPosWithArray(this._midXPosArray);
    }, 
    
    removeHeadPlan: function() {
        this._midXPosArray.shift();
        this._plansOnScreenCache.shift();
        
        this.thumbnailsRenderer.removeHeadThumbnail();
        this.graphsRenderer.removeHeadDataPoint();
    }, 
    
    removeTailPlan: function() {
        this._midXPosArray.pop();
        this._plansOnScreenCache.pop();
        
        this.thumbnailsRenderer.removeTailThumbnail();
        this.graphsRenderer.removeTailDataPoint();
    }, 
    
    _centerXPosRelativeToPlan: function(index) {
        if (isNaN(index) 
            || typeof(this._midXPosArray[index]) === 'undefined') {
            console.log('ATTENTION: index is NAN')
            this._centerXPosArrayRelativeToContainer();
        } else {
            // based on formula: translation = midX - selectedPlan.midX
            var midX = this._plansContainer.width()/2;
            var translation = midX - this._midXPosArray[index];

            for (var i=0; i<this._midXPosArray.length; i++) {
                this._midXPosArray[i] += translation;
            }
        }
    }, 
    
    _centerXPosArrayRelativeToContainer: function() {
        // based on formula: mid-(x1+t) + mid-(x2+t) + ... + mid-(xn+t) = 0
        var sum = 0;
        for (var i=0; i<this._midXPosArray.length; i++) {
            sum += this._midXPosArray[i];
        }
        var midX = this._plansContainer.width()/2;
        var translation = (midX * this._midXPosArray.length - sum) / this._midXPosArray.length;

        for (var i=0; i<this._midXPosArray.length; i++) {
            this._midXPosArray[i] += translation;
        }
    }, 
    
    appendLinearIndicatorWithMetricName(name) {
        MY_GLOBAL.typeChecker.assertIsString(name);
        this.graphsRenderer.
        appendLinearRendererForMetricNameAndInitWithPlansAndMidXPoses(name, this._plansOnScreenCache, this._midXPosArray);
    }, 
    
    deleteIndicatorByMetricsNameFromRow: function(name, row) {
        this.graphsRenderer.deleteIndicatorByMetricsNameFromRow(name, row);
    }
};