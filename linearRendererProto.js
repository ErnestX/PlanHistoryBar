'use strict';

MY_GLOBAL.plansManager.plansRenderer.graphsRenderer.linearRendererProto = {
    _metricsName: '', 
    _graphsCanvasPaper:null,
    // NOTE: invariable: _circlesArray and _linesArray are in order
    _circlesArray:[],
    _linesArray:[],
    
    initWithMetricsNameAndPaperCanvas: function(name, canvas) {
        MY_GLOBAL.typeChecker.assertIsString(name);
        MY_GLOBAL.assert(typeof(canvas) !== 'undefined');
        MY_GLOBAL.assert(canvas !== null);
        
        this._metricsName = name;
        this._graphsCanvasPaper = canvas;
        this._circlesArray = [];
        this._linesArray = [];
    },
    
    syncAllDataPointsXPosWithArray: function(midXPosArray) {
        // points
        
        for(var i=0; i<this._circlesArray.length; i++) {
            this._circlesArray[i].position.x = midXPosArray[i];
        }
//        for(var i=0; i<this._circlesArray.length; i++) {
//            $(this._circlesArray[i].node).velocity({cx: midXPosArray[i].toString()}, 
//                                                  {queue: false, duration: MY_GLOBAL.animationDuration});
//        }
//        
//        // lines
//        for(var i=0; i<this._linesArray.length; i++) {
//            var x1To, x2To;
//            if (midXPosArray[i] < midXPosArray[i+1]) {
//                x1To = midXPosArray[i].toString();
//                x2To = midXPosArray[i+1].toString();
//            } else {
//                x1To = midXPosArray[i+1].toString();
//                x2To = midXPosArray[i].toString();
//            }
//            
//            $(this._linesArray[i].node).velocity({x1: x1To, x2: x2To}, 
//                                                {queue: false, duration: MY_GLOBAL.animationDuration});
//        }
    }, 
    
    appendDataPointFromPlanAtMidXPos: function(p, midXPos) {
        this._addDataPoint(p, midXPos, true);
    }, 
    
    prependDataPointFromPlanAtMidXPos: function(p, midXPos) {
        this._addDataPoint(p, midXPos, false);
    },
    
    _addDataPoint: function(p, midXPos, appendOrNot) {
        var value = p.getValueOfIndicator(this._metricsName);
        
//        // add line
//        if (this._circlesArray.length > 0) {
//            var newLine;
//            var fromIndex;
//            if (appendOrNot) {
//                fromIndex = this._circlesArray.length - 1;
//                newLine = this._graphsCanvasPaper.line(this._circlesArray[fromIndex].attr('cx'), 
//                                                        this._circlesArray[fromIndex].attr('cy'), 
//                                                        midXPos, value);
//            } else {
//                fromIndex = 0;
//                newLine = this._graphsCanvasPaper.line(midXPos,value, 
//                                                        this._circlesArray[fromIndex].attr('cx'), 
//                                                        this._circlesArray[fromIndex].attr('cy'));
//            }
//            var gradient = this._graphsCanvasPaper.gradient("l(0, 1, 1, 1)#fff-#58585A:45-#58585A:55-#fff");
//            newLine.attr({
//                opacity: 0.0,
//                stroke: gradient,//'#FFFFFF',
//                'stroke-dasharray': "2, 2",
//                strokeWidth: 2
//            });
//            
//            $(newLine.node).velocity({opacity: 1.0}, {queue: false, duration: MY_GLOBAL.animationDuration});
//            
//            if (appendOrNot) {
//                this._linesArray.push(newLine);
//            } else {
//                this._linesArray.unshift(newLine);
//            }
//        }
        
        // add point
        console.log("try adding point");
        var newPoint = new paper.Point(midXPos, value);
        var newCircle = new paper.Path.Circle(newPoint, 5);
        newCircle.fillColor = 'white';
        
        if (appendOrNot) {
            this._circlesArray.push(newCircle);
        } else {
            this._circlesArray.unshift(newCircle);
        }
        
//        var newPoint = this._graphsCanvasPaper.circle(midXPos, value, 5);
//        newPoint.attr({
//            opacity: 0.0,
//            fill:'#FFFFFF'
//        });
//        
//        $(newPoint.node).velocity({opacity: 1.0}, {queue: false, duration: MY_GLOBAL.animationDuration});
        
//        if (appendOrNot) {
//            this._circlesArray.push(newPoint);
//        } else {
//            this._circlesArray.unshift(newPoint);
//        }
    },
    
    removeHeadDataPoint: function() {
        console.log('try to remove head');
        if (typeof(this._circlesArray[0]) !== 'undefined') {
            this._circlesArray[0].remove();
            this._circlesArray.shift();
        }
        
        if (typeof(this._linesArray[0]) !== 'undefined') {
            this._linesArray[0].remove();
            this._linesArray.shift();
        }
    }, 
    
    removeTailDataPoint: function() {
        console.log('try to remove tail');
        if (typeof(this._circlesArray[this._circlesArray.length - 1]) !== 'undefined') {
            this._circlesArray[this._circlesArray.length - 1].remove();
            this._circlesArray.pop();
        }
        
        if (typeof(this._linesArray[this._linesArray.length - 1]) !== 'undefined') {
            this._linesArray[this._linesArray.length - 1].remove();
            this._linesArray.pop();
        }
    }, 
    
    deleteGraph: function() {
        var l = this._circlesArray.length;
        for (var i=0; i<l; i++) {
            this.removeTailDataPoint();
        }
    }, 
    
    getMetricsName: function() {
        return this._metricsName;
    }
};
    