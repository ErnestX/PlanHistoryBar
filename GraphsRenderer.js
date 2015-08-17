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
    
    appendDataPointFromPlanAtMidXPos: function(p, midXPos) {
        var newPoint = this.graphsContainerSnap.circle(midXPos, 100, 10);
        newPoint.attr({
            fill:'#FFFFFF',
//            x: 100
        });
        this.circlesArray.push(newPoint);
    }, 
    
    syncAllDataPointsXPosWithArray: function(midXPosArray) {
        for(var i=0; i<this.circlesArray.length; i++) {
            //            this.container.velocity({left: "-=83"}, 150, realCallBackFunction);
            $(this.circlesArray[i].node).velocity({cx: midXPosArray[i].toString()}, {queue: false, duration: 1000});
//            this.circlesArray[i].attr({
//               x: midXPosArray[i]
//            });
        }
    }
};