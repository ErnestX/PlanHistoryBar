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
        // points
        for(var i=0; i<this.circlesArray.length; i++) {
            $(this.circlesArray[i].node).velocity({cx: midXPosArray[i].toString()}, 
                                                  {queue: false, duration: 250});
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
                                                {queue: false, duration: 250});
        }
    }, 
    
    appendDataPointFromPlanAtMidXPos: function(p, midXPos) {
        this.addDataPoint(p, midXPos, true);
    }, 
    
    prependDataPointFromPlanAtMidXPos: function(p, midXPos) {
        this.addDataPoint(p, midXPos, false);
    },
    
    addDataPoint: function(p, midXPos, appendOrNot) {
        var fakeValue = Math.random() * 100 + 30;
        
        // add line
        if (this.circlesArray.length > 0) {
            // Step1: find the closed circle's xPos to the new data point
            var closestDist = Infinity;
            var resultIndex = -1;
            for (var i=0; i<this.circlesArray.length; i++) {
                var temp = Math.abs(parseInt(this.circlesArray[i].attr('cx'), 10) - midXPos);
                if (temp < closestDist) {
                    closestDist = temp;
                    resultIndex = i; 
                }
            }
            
            // Step2: draw line
            var newLine;
//            console.log(this.circlesArray[resultIndex].attr('cx'));
//            console.log(midXPos);
            // FUTURE: uncomment the two logs above, and you see they can get dangerous close. It is unsure why cx would be smaller before adding the new line, perhaps due to the thumbnail being added first and the animation's started. 
            if (parseInt(this.circlesArray[resultIndex].attr('cx'), 10) < midXPos) {
                newLine = this.
                graphsContainerSnap.
                line(this.circlesArray[resultIndex].attr('cx'), 
                     this.circlesArray[resultIndex].attr('cy'), 
                     midXPos, fakeValue);
//                console.log('true');
            } else {
                newLine = this.
                graphsContainerSnap.
                line(midXPos,fakeValue, 
                     this.circlesArray[resultIndex].attr('cx'), 
                     this.circlesArray[resultIndex].attr('cy'));
//                console.log('false');
            }

            newLine.attr({
                stroke: '#FFFFFF',
                strokeWidth: 5
            });
            if (appendOrNot) {
                this.linesArray.push(newLine);
            } else {
                this.linesArray.unshift(newLine);
            }
        }
        
        // add point
        var newPoint = this.graphsContainerSnap.circle(midXPos, fakeValue, 10);
        newPoint.attr({
            fill:'#FFFFFF',
        });
        if (appendOrNot) {
            this.circlesArray.push(newPoint);
        } else {
            this.circlesArray.unshift(newPoint);
        }
//        console.log('added point');
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