'use strict';

MY_GLOBAL.graphsRenderer = {
    graphsContainer:null, // id without #
    useFancyStyle: false, // switch between two line rendering strategies
    rowRendererArray:[],
    planDivPairArray:[],
    initWithGraphsContainerInString: function(container) {
        MY_GLOBAL.typeChecker.assertIsString(container);
        
        if (container.charAt(0) === '#') {
            container = container.slice(1); // remove '#'
        }
        
        this.graphsContainer = container;
    },
    createRendererWithNameOntoRow: function(name, rowNum) {
        MY_GLOBAL.typeChecker.assertIsString(name);
        MY_GLOBAL.typeChecker.assertIsInteger(rowNum);

        if (!(this.rowRendererProto.isPrototypeOf(this.rowRendererArray[rowNum]))) {
            // this row is currently empty. Create new rowRenderer.
            console.log('created new rowRenderer');
            this.rowRendererArray[rowNum] = Object.create(this.rowRendererProto); 
        }
        // delegate to rowRenderer
        this.
        rowRendererArray[rowNum].
        createRendererWithNameAndContainer(name, this.graphsContainer);  // FIXME: use a seperate(sub) container in the future
    }, 
    
    appendDataFromPlanAndRenderAlignedWithJQuery: function(newPlan, newPlanJquery) {  // TODO: add prepend, delete methods
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(newPlan, MY_GLOBAL.planProto);
        MY_GLOBAL.typeChecker.assertIsJQueryObject(newPlanJquery);
        
        // TODO: update plan div pair array
        var newPair = Object.create(this.planDivPairProto);
        newPair.initWithPlanAndDiv(newPlan, newPlanJquery);
        this.planDivPairArray.push(newPair);
        
        this.renderAllRows();
    },
    
    renderAllRows: function() {
      for(var i=0; i<this.rowRendererArray.length; i++) {
          this.rowRendererArray[i].renderRow();
      }
    },
    
    rowRendererProto: {
        rendererArray:[],
        createRendererWithNameAndContainer: function(name, container) {
            MY_GLOBAL.typeChecker.assertIsString(name);
            MY_GLOBAL.typeChecker.assertIsString(container);
            
            if (this.getRendererWithName(name) !== null) {
                // there is a duplicate! 
                throw "creation failed: a line renderer called " + name + " already exists!";
                return;
            }
            
            var newRenderer = Object.create(this.rendererProto);
            newRenderer.initWithNameAndContainer(name, container);
            this.rendererArray.push(newRenderer); // assume we do not need to reorder indicators within the same row
        },
        
        getRendererWithName: function(name) {
            var i;
            for (i=0; i<this.rendererArray.length; i++) {
                MY_GLOBAL.
                typeChecker.
                assertIsObjectWithProto(this.rendererArray[i], this.rendererProto);
                
                if (name === this.rendererArray[i].name) {
                    return this.rendererArray[i];
                }
            }
            // not found
            return null;
        }, 
        
        renderRow: function() {
            for (var i=0; i<this.rendererArray.length; i++) {
                this.rendererArray[i].render();
            }
        }, 
        
        rendererProto: { // FIXME: in the future, create two sub-protos: line and ring 
            graphContainer: null, 
            name: '', 
//            dataPointArray: [], // will make a singleton plan array instead
            initWithNameAndContainer: function(name, container) {
                console.log('inited renderer');
                this.name = name;    
                this.graphContainer = container;
                
                this.render(); // FIXME: shouldn't be called here. for testing only
            },
            
            appendDataPointAndRender: function(dataPoint) {
                MY_GLOBAL.
                typeChecker.
                assertIsObjectWithProto(dataPoint, MY_GLOBAL.dataPointProto);
                
                this.dataArray.push(dataPoint);
                this.render();
            },
            
            render: function() {
                var canvas = Snap('#' + this.graphContainer); // FIXME: for testing only. create a canvas property within init in the future
                var canvasWidth = document.getElementById(this.graphContainer).offsetWidth;
                
                // init vars
                var x1, y1, x2, y2;
                var divAlignedWith = MY_GLOBAL.graphsRenderer.planDivPairArray[0].div;
                x1 = divAlignedWith.position().left + divAlignedWith.outerWidth()/2;
                console.log(x1);
                y1 = Math.random() * 100 + 10;
                
                for (var i=1; i<MY_GLOBAL.graphsRenderer.planDivPairArray.length; i++) {
                    var newPoint = canvas.circle(x1, y1, 5);
                    newPoint.attr({
                        fill: "#FFFFFF"
                    });
                    
                    divAlignedWith = MY_GLOBAL.graphsRenderer.planDivPairArray[i].div;
                    x2 = divAlignedWith.position().left + divAlignedWith.outerWidth()/2;
                    y2 = Math.random() * 100 + 10;
                    
                    var newLine = canvas.line(x1, y1, x2, y2);
                    newLine.attr({
                        stroke: "#FFFFFF",
                        strokeWidth: 5
                    });
                    
                    x1 = x2;
                    y1 = y2;
                }     
                
                // add the last point
                var newPoint = canvas.circle(x1, y1, 5);
                newPoint.attr({
                    fill: "#FFFFFF"
                });
            },
            
            thresholdArray:[],
            thresholdProto: {
                name: '', 
                value: 0
            }
        }   
    }, 
    
    planDivPairProto: {
        plan: null,
        div: null,
        initWithPlanAndDiv: function(p, d) {
            MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
            MY_GLOBAL.typeChecker.assertIsJQueryObject(d);
            
            this.plan = p;
            this.div = d;
        }
    }
};
