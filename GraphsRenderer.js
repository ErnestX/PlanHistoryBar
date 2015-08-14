'use strict';

MY_GLOBAL.graphsRenderer = {
    graphsContainer:null, // id without #
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
    
    appendDataFromPlanAndRenderToAlignWithJQuery: function(newPlan, newPlanJquery) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(newPlan, MY_GLOBAL.planProto);
        MY_GLOBAL.typeChecker.assertIsJQueryObject(newPlanJquery);
        
        // TODO: update plan div pair array
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
                var testCircle = canvas.circle(canvasWidth/2, 80, 40);
                testCircle.attr({fill: "#FFFFFF"});
            },
            
            thresholdArray:[],
            thresholdProto: {
                name: '', 
                value: 0
            }
        }   
    }
};

MY_GLOBAL.dataPointProto = {
    dataValue: 0, 
    xPos: 0, 
    initWithdDataValueAndXPos: function(d, x) {
        this.dataValue = d;
        this.xPos = x;
    }
};