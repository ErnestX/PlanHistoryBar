MY_GLOBAL.graphsRenderer = {
    graphsContainerRaphael:null,
    circlesArray:[],
    linesArray:[],
    
    initWithGraphsContainerInString: function(container) {
        MY_GLOBAL.typeChecker.assertIsString(container);
        
        if (container.charAt(0) === '#') {
            container = container.slice(1); // remove '#'
        }
        this.graphsContainerRaphael = Raphael(container); // Snap('#' + container)
    },
    
    syncAllDataPointsXPosWithArray: function(midXPosArray) {
        // points
        for(var i=0; i<this.circlesArray.length; i++) {
            $(this.circlesArray[i].node).velocity({cx: midXPosArray[i].toString()}, 
                                                  {queue: false, duration: 1000});
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
            
//            console.log(this.linesArray[i].attr('path'));
            var attrArray = this.linesArray[i].attr('path');
//            console.log(attrArray[0][2].toString());
            console.log('M' + x1To + ',' + attrArray[0][2].toString() + 'L' + x2To + ',' + attrArray[1][2].toString());
            $(this.linesArray[i].node).velocity({x1: x1To, x2: x2To}, {queue: false, duration: 1000});
//            ({path: 'M' + x1To + ' ' + attrArray[0][2].toString() + 'L' + x2To + ' ' + attrArray[1][2].toString()}, {queue: false, duration: 1000});
//            ({x1: x1To, x2: x2To}, {queue: false, duration: 1000});
        }
    }, 
    
    appendDataPointFromPlanAtMidXPos: function(p, midXPos) {
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
            // FUTURE: uncomment the two logs above, and you see they can get dangerously close. It is unsure why cx would be smaller before adding the new line, perhaps due to the thumbnail being added first and the animation's started. 
            if (parseInt(this.circlesArray[resultIndex].attr('cx'), 10) < midXPos) {
                newLine = this.
                graphsContainerRaphael.path('M' + parseInt(this.circlesArray[resultIndex].attr('cx'), 10).toString() 
                                            + ',' + parseInt(this.circlesArray[resultIndex].attr('cy'), 10).toString()
                                            + 'L' +  midXPos.toString() + ',' + fakeValue.toString());
//                line(this.circlesArray[resultIndex].attr('cx'), 
//                     this.circlesArray[resultIndex].attr('cy'), 
//                     midXPos, 
//                     fakeValue);
            } else {
                newLine = this.
                graphsContainerRaphael.path('M' + midXPos.toString() + ',' + fakeValue.toString() 
                                            + 'L' + parseInt(this.circlesArray[resultIndex].attr('cx'), 10).toString() 
                                            + ',' + parseInt(this.circlesArray[resultIndex].attr('cy'), 10).toString());
//                line(midXPos,
//                     fakeValue, 
//                     this.circlesArray[resultIndex].attr('cx'), 
//                     this.circlesArray[resultIndex].attr('cy'));
            }

            newLine.attr({
                'stroke': '#FFFFFF',
                'stroke-width': 5
            });
            this.linesArray.push(newLine);
        }
        
        // add point
        var newPoint = this.graphsContainerRaphael.circle(midXPos, fakeValue, 10);
        newPoint.attr({
            'fill':'#FFFFFF',
            'stroke-width': 0
        });
        this.circlesArray.push(newPoint);
//        console.log('added point');
    }, 
    
    prependDataPointFromPlanAtMidXPos: function(p, midXPos) {
        // TODO: stub
    },
    
    removeHeadDataPoint: function() {
        this.circlesArray[0].remove();
        this.circlesArray.shift();
        
        this.linesArray[0].remove();
        this.linesArray.shift();
    }, 
    
    removeTailDataPoint: function() {
        this.circlesArray[this.circlesArray.length - 1].remove();
        this.circlesArray.pop();
        
        this.linesArray[this.linesArray.length - 1].remove();
        this.linesArray.pop();
    }
};