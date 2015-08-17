MY_GLOBAL.graphsRenderer = {
    graphsContainerSnap:null,
    circlesArray:[],
    
    initWithGraphsContainerInString: function(container) {
        MY_GLOBAL.typeChecker.assertIsString(container);
        
        if (container.charAt(0) === '#') {
            container = container.slice(1); // remove '#'
        }
        
        this.graphsContainerSnap = Snap('#' + container);
    },
    
    syncAllDataPointsXPosWithArray: function(midXPosArray) {
        for(var i=0; i<this.circlesArray.length; i++) {
            $(this.circlesArray[i].node).velocity({cx: midXPosArray[i].toString()}, 
                                                  {queue: false, duration: 1000});
        }
    }, 
    
    appendDataPointFromPlanAtMidXPos: function(p, midXPos) {
        var newPoint = this.graphsContainerSnap.circle(midXPos, Math.random() * 100 + 30, 10);
        newPoint.attr({
            fill:'#FFFFFF',
        });
        this.circlesArray.push(newPoint);
    }, 
    
    prependDataPointFromPlanAtMidXPos: function(p, midXPos) {
        // TODO: stub
    },
    
    removeHeadDataPoint: function() {
        this.circlesArray[0].remove();
        this.circlesArray.shift();
    }, 
    
    removeTailDataPoint: function() {
        this.circlesArray[this.circlesArray.length - 1].remove();
        this.circlesArray.pop();
    }
};