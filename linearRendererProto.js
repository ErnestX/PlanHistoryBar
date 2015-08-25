'use strict';

MY_GLOBAL.plansManager.plansRenderer.graphsRenderer.linearRendererProto = {
    _metricsName: '', 
    _graphsCanvasPaper:null,
    // NOTE: invariable: _circlesArray and _linesArray are in order
    _circlesArray:[],
    _linesArray:[],
    _gradientObject: {
        stops: [['#fff', 0.0], ['#58585A', 0.45], ['#58585A', 0.55], ['#fff',1.0]]
    },
    
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
        for(var i=0; i<this._circlesArray.length; i++) {
            this._circlesArray[i].position.x = midXPosArray[i];
        }
        
        for(var i=0; i<this._linesArray.length; i++) {
            var x1To, x2To;
            x1To = midXPosArray[i];
            x2To = midXPosArray[i+1];
            
            var line = this._linesArray[i];
            
            line.segments[0].point.x = x1To;
            line.segments[1].point.x = x2To;
            
            line.strokeColor = {
                gradient: this._gradientObject,
                origin: line.bounds.leftCenter,
                destination: line.bounds.rightCenter
            };
        }
    },
    
    calcXTranslationSpeedsGivenDestinationsAndDuration: function(midXPosArray, duration) {
        var speeds = [];
        for(var i=0; i<this._circlesArray.length; i++) {
            speeds[i] = (midXPosArray[i] - this._circlesArray[i].position.x) / duration;
        }
        return speeds;
    }, 
    
    syncAllDataPointsXPosWithSpeedsOneFrame: function(speeds, event) {
    
        for(var i=0; i<this._circlesArray.length; i++) {
            var translation = speeds[i] * event.delta; 
            this._circlesArray[i].position.x += translation;    
        }
    
        // lines
        for(var i=0; i<this._linesArray.length; i++) {
            var line = this._linesArray[i];
            
            var x1Translation = speeds[i] * event.delta;
            var x2Translation = speeds[i+1] * event.delta;

            line.segments[0].point.x += x1Translation;
            line.segments[1].point.x += x2Translation;
            
            line.strokeColor = {
                gradient: this._gradientObject,
                origin: line.bounds.leftCenter,
                destination: line.bounds.rightCenter
            };
        }
    }, 
    
    appendDataPointFromPlanAtMidXPos: function(p, midXPos) {
        this._addDataPoint(p, midXPos, true);
    }, 
    
    prependDataPointFromPlanAtMidXPos: function(p, midXPos) {
        this._addDataPoint(p, midXPos, false);
    },
    
    _addDataPoint: function(p, midXPos, appendOrNot) {
        var value = p.getValueOfIndicator(this._metricsName);
        
        // add line
        if (this._circlesArray.length > 0) {
            var newLine;
            var fromIndex;
            var newLine = new paper.Path();
            
            newLine.strokeWidth = 2;
            newLine.dashArray = [2, 2];
            if (appendOrNot) {
                fromIndex = this._circlesArray.length - 1;
                newLine.add(new paper.Point(this._circlesArray[fromIndex].position.x, 
                                             this._circlesArray[fromIndex].position.y));
                newLine.add(new paper.Point(midXPos, value));
            } else {
                fromIndex = 0;
                newLine.add(new paper.Point(midXPos, value));
                newLine.add(new paper.Point(this._circlesArray[fromIndex].position.x, 
                                             this._circlesArray[fromIndex].position.y));
            }
            
            newLine.strokeColor = {
                gradient: this._gradientObject,
                origin: newLine.bounds.leftCenter,
                destination: newLine.bounds.rightCenter
            };
            
            if (appendOrNot) {
                this._linesArray.push(newLine);
            } else {
                this._linesArray.unshift(newLine);
            }
        }
        
        // add point
        var newPoint = new paper.Point(midXPos, value);
        var newCircle = new paper.Path.Circle(newPoint, 5);
        newCircle.fillColor = 'white';
        
        if (appendOrNot) {
            this._circlesArray.push(newCircle);
        } else {
            this._circlesArray.unshift(newCircle);
        }
    },
    
    removeHeadDataPoint: function() {
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
    