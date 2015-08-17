MY_GLOBAL.graphsRenderer = {
    graphsContainerSnap:null,
    circlesArray:[],
    linesArray:[],
    
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
        
        for(var i=0; i<this.linesArray.length; i++) {
            $(this.linesArray[i].node).velocity({x1: midXPosArray[i].toString(), 
                                                 x2: midXPosArray[i+1].toString()}, 
                                                {queue: false, duration: 1000});
        }
    }, 
    
    appendDataPointFromPlanAtMidXPos: function(p, midXPos) {
        var fakeValue = Math.random() * 100 + 30;
        
        // add line
        if (this.circlesArray.length > 1) {
            // Step1: find the closed circle's xPos to the new data point
            var closestDist = Infinity;
            var resultIndex = -1;
            for (var i=0; i<this.circlesArray.length; i++) {
                var temp = Math.abs(this.circlesArray[i].attr('cx') - midXPos);
                if (temp < closestDist) {
                    closestDist = temp;
                    resultIndex = i; 
                }
            }
            
            // Step2: draw line
            var newLine;
            if (this.circlesArray[resultIndex].attr('cx') < midXPos) {
                newLine = this.
                graphsContainerSnap.
                line(this.circlesArray[resultIndex].attr('cx'), 
                     this.circlesArray[resultIndex].attr('cy'), 
                     midXPos, 
                     fakeValue);
                
            } else {
                newLine = this.
                graphsContainerSnap.
                line(midXPos,
                     fakeValue, 
                     this.circlesArray[resultIndex].attr('cx'), 
                     this.circlesArray[resultIndex].attr('cy'));
                console.log('true');
            }
//            console.log(this.circlesArray[resultIndex].attr('cy'));
            newLine.attr({
                stroke: '#FFFFFF',
                strokeWidth: 5
            });
            this.linesArray.push(newLine);
            console.log("drawn line");
        }
        
        // add point
        var newPoint = this.graphsContainerSnap.circle(midXPos, fakeValue, 10);
        newPoint.attr({
            fill:'#FFFFFF',
        });
        this.circlesArray.push(newPoint);
        console.log('drawn point');
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