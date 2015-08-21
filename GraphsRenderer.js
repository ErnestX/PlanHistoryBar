"use strict";

MY_GLOBAL.plansManager.plansRenderer.graphsRenderer = {
    indicatorRendererArray:[], 
    graphsContainerSnap:null,
    
    initWithGraphsContainerInString: function(container) {
        MY_GLOBAL.typeChecker.assertIsString(container);
        
        if (container.charAt(0) !== '#') {
            container = '#' + container;
        }
        
        this.indicatorRendererArray = [];
        this.graphsContainerSnap = Snap(container);
    },
    
    appendLinearRendererForMetricNameAndInitWithPlansAndMidXPoses: function(name, plans, poses) {
        MY_GLOBAL.typeChecker.assertIsString(name);
        MY_GLOBAL.assert(Array.isArray(plans));
        MY_GLOBAL.assert(Array.isArray(poses));
        
        console.log('try to add: ' + name);
        
        var newRenderer = Object.create(this.linearRendererProto);
        newRenderer.initWithNameAndGraphsSnapContainer(name, this.graphsContainerSnap);
        this.indicatorRendererArray.push(newRenderer);
        
        for (var i=0; i<plans.length; i++) {
            newRenderer.appendDataPointFromPlanAtMidXPos(plans[i], poses[i]);
        }
    }, 
    
    deleteIndicatorByMetricsNameFromRow: function(name, row) {
        // TODO: row
        var indexToDelete = this.getRendererIndexByName(name);
        if (indexToDelete !== -1) {
            this.indicatorRendererArray[indexToDelete].deleteGraph();
            this.indicatorRendererArray.splice(indexToDelete, 1);
            console.log('deleted ' + name);
        } else {
            console.log('unable to delete ' + name + ': indicator not found');
        }
    },
    
    getRendererIndexByName: function(name) {
        for (var i=0; i<this.indicatorRendererArray.length; i++) {
            if (name === this.indicatorRendererArray[i].metricsName) {
                return i;
            }
        }
        return -1; // not found
    }, 
    
    syncAllDataPointsXPosWithArray: function(midXPosArray) {
        for (var i=0; i<this.indicatorRendererArray.length; i++) {
            this.indicatorRendererArray[i].syncAllDataPointsXPosWithArray(midXPosArray);
        }
    }, 
    
    appendDataPointFromPlanAtMidXPos: function(p, midXPos) {
        for (var i=0; i<this.indicatorRendererArray.length; i++) {
            this.indicatorRendererArray[i].appendDataPointFromPlanAtMidXPos(p, midXPos);
        }
    }, 
    
    prependDataPointFromPlanAtMidXPos: function(p, midXPos) {
        for (var i=0; i<this.indicatorRendererArray.length; i++) {
            this.indicatorRendererArray[i].prependDataPointFromPlanAtMidXPos(p, midXPos);
        }
    },
    
    removeHeadDataPoint: function() {
        for (var i=0; i<this.indicatorRendererArray.length; i++) {
            this.indicatorRendererArray[i].removeHeadDataPoint();
        }
    }, 
    
    removeTailDataPoint: function() {
        for (var i=0; i<this.indicatorRendererArray.length; i++) {
            this.indicatorRendererArray[i].removeTailDataPoint();
        }
    }
};
