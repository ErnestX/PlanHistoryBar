MY_GLOBAL.plansManager.plansRenderer.graphsRenderer = {
    indicatorRendererArray:[], 
    graphsContainerSnap:null,
    
    initWithGraphsContainerInString: function(container) {
        MY_GLOBAL.typeChecker.assertIsString(container);
        
        if (container.charAt(0) !== '#') {
            container = '#' + container;
        }
        this.graphsContainerSnap = Snap(container);
        
        this.appendLinearRendererForMetricName('testing');
    },
    
    appendLinearRendererForMetricName(name) {
        var newRenderer = Object.create(this.linearRendererProto);
        newRenderer.initWithNameAndGraphsSnapContainer(name, this.graphsContainerSnap);
        this.indicatorRendererArray.push(newRenderer);
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