'use strict';

MY_GLOBAL.graphsRenderer = {
    graphsContainer:null, // id without #
    rowRendererArray:[],
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
            // this row is currently empty. Create new renderer.
            console.log('created new row renderer');
            this.rowRendererArray[rowNum] = Object.create(this.rowRendererProto); 
        }
        // delegate to rowRenderer
        this.rowRendererArray[rowNum].createRendererWithNameAndContainer(name, this.graphsContainer);  // FIXME: use a seperate container in the future
    }, 
    
    rowRendererProto: {
        rendererArray:[],
        createRendererWithNameAndContainer: function(name, container) {
            MY_GLOBAL.typeChecker.assertIsString(name);
            MY_GLOBAL.typeChecker.assertIsString(container);
            
            if (this.getRendererWithName(name) !== null) {
                // there are duplicates! 
                throw "creation failed: a line renderer called " + name + " already exists!";
                return;
            }
            
            var newRenderer = Object.create(this.rendererProto);
            newRenderer.initWithNameAndContainer(name, container);
            this.rendererArray.push(newRenderer);
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
        
        rendererProto: { // FIXME: in the future, create two sub-protos: line and ring 
            graphContainer: null, 
            name: '', 
            dataPointArray: [1,3,3,2,5,1,4], // fake data
            initWithNameAndContainer: function(name, container) {
                console.log('inited renderer');
                this.name = name;    
                this.graphContainer = container;
                
                this.render(); // FIXME: shouldn't be called here. for testing only
            },
            appendDataPointAndRender: function(dataPoint) {
                
                
                this.dataArray.push(dataPoint);
                this.render();
            }, 
            render: function() {
                var canvas = Snap('#' + this.graphContainer); // FIXME: for testing only. create a canvas property within init in the future
                var testCircle = canvas.circle(10, 80, 100);
                console.log(this.graphContainer);
                console.log(document.getElementById(this.graphContainer).offsetWidth);
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