MY_GLOBAL.graphsRenderer = {
    graphsContainerSnap:null,
    // NOTE: invariable: circlesArray and linesArray are in order
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
        // points
        for(var i=0; i<this.circlesArray.length; i++) {
            $(this.circlesArray[i].node).velocity({cx: midXPosArray[i].toString()}, 
                                                  {queue: false, duration: MY_GLOBAL.animationDuration});
        }
        
        // lines
        for(var i=0; i<this.linesArray.length; i++) {
            var x1To, x2To;
            if (midXPosArray[i] < midXPosArray[i+1]) {
                x1To = midXPosArray[i].toString();
                x2To = midXPosArray[i+1].toString();
            } else {
                x1To = midXPosArray[i+1].toString();
                x2To = midXPosArray[i].toString();
            }
            
            $(this.linesArray[i].node).velocity({x1: x1To, x2: x2To}, 
                                                {queue: false, duration: MY_GLOBAL.animationDuration});
        }
    }, 
    
    appendDataPointFromPlanAtMidXPos: function(p, midXPos) {
        this.addDataPoint(p, midXPos, true);
    }, 
    
    prependDataPointFromPlanAtMidXPos: function(p, midXPos) {
        this.addDataPoint(p, midXPos, false);
    },
    
    addDataPoint: function(p, midXPos, appendOrNot) {
        var value = p.getValueOfIndicator('testing');
        
        // add line
        if (this.circlesArray.length > 0) {
            var newLine;
            var fromIndex;
            if (appendOrNot) {
                fromIndex = this.circlesArray.length - 1;
                newLine = this.graphsContainerSnap.line(this.circlesArray[fromIndex].attr('cx'), 
                                                        this.circlesArray[fromIndex].attr('cy'), 
                                                        midXPos, value);
            } else {
                fromIndex = 0;
                newLine = this.graphsContainerSnap.line(midXPos,value, 
                                                        this.circlesArray[fromIndex].attr('cx'), 
                                                        this.circlesArray[fromIndex].attr('cy'));
            }
            var gradient = this.graphsContainerSnap.gradient("l(0, 1, 1, 1)#fff-#58585A:45-#58585A:55-#fff");
            newLine.attr({
                opacity: 0.0,
                stroke: gradient,//'#FFFFFF',
                'stroke-dasharray': "2, 2",
                strokeWidth: 2
            });
            
            $(newLine.node).velocity({opacity: 1.0}, {queue: false, duration: MY_GLOBAL.animationDuration});
            
            if (appendOrNot) {
                this.linesArray.push(newLine);
            } else {
                this.linesArray.unshift(newLine);
            }
        }
        
        // add point
        var newPoint = this.graphsContainerSnap.circle(midXPos, value, 5);
        newPoint.attr({
            opacity: 0.0,
            fill:'#FFFFFF'
        });
        
        $(newPoint.node).velocity({opacity: 1.0}, {queue: false, duration: MY_GLOBAL.animationDuration});
        
        if (appendOrNot) {
            this.circlesArray.push(newPoint);
        } else {
            this.circlesArray.unshift(newPoint);
        }
    },
    
    removeHeadDataPoint: function() {
        if (typeof(this.circlesArray[0]) !== 'undefined') {
            this.circlesArray[0].remove();
            this.circlesArray.shift();
        }
        
        if (typeof(this.linesArray[0]) !== 'undefined') {
            this.linesArray[0].remove();
            this.linesArray.shift();
        }
    }, 
    
    removeTailDataPoint: function() {
        if (typeof(this.circlesArray[this.circlesArray.length - 1]) !== 'undefined') {
            this.circlesArray[this.circlesArray.length - 1].remove();
            this.circlesArray.pop();
        }
        
        if (typeof(this.linesArray[this.linesArray.length - 1]) !== 'undefined') {
            this.linesArray[this.linesArray.length - 1].remove();
            this.linesArray.pop();
        }
    }
};