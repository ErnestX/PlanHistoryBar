'use strict';

MY_GLOBAL.graphsRenderer = {
    graphsContainer:null,
    rowRendererArray:[],
    initWithGraphsContainer: function(container){
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
            MY_GLOBAL.typeChecker.assertIsJQueryObject(container);
            
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
                MY_GLOBAL.assert(this.
                                 rendererProto.
                                 isPrototypeOf(this.rendererArray[i]));   
                
                if (name === this.rendererArray[i].name) {
                    return this.rendererArray[i];
                }
            }
            
            return null;
        }, 
        
        rendererProto: {
            graphContainer: null, 
            name: '', 
            dataArray: [1,3,3,2,5,1,4], // fake data
            initWithNameAndContainer: function(name, container) {
                console.log('inited renderer');
                this.name = name;    
                this.graphContainer = container;
                
                this.render(); // FIXME: shouldn't be called here. for testing only
            },
            appendDataAndRender: function(value) {
                this.dataArray.push(value);
                this.render();
            }, 
            render: function() {
                console.log(this.graphContainer);
                var canvas = Snap("#graphsContainer");
                var testCircle = canvas.circle(150, 150, 100);
            }, 
            thresholdArray:[],
            thresholdProto: {
                name: '', 
                value: 0
            }
        }   
    }
};