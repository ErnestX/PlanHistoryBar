'use strict';

MY_GLOBAL.graphsRenderer = {
    rowRendererArray:[],
    createRendererWithNameOntoRow: function(name, rowNum) {
        MY_GLOBAL.typeChecker.assertIsString(name);
        MY_GLOBAL.typeChecker.assertIsInteger(rowNum);
        
        if (!(this.rowRendererProto.isPrototypeOf(this.rowRendererArray[rowNum]))) {
            // this row is currently empty. Create new renderer.
            this.rowRendererArray[rowNum] = Object.create(this.rowRendererProto); 
        }
        // delegate to rowRenderer
        this.rowRendererArray[rowNum].createRendererWithName(name); 
    }, 
    
    rowRendererProto: {
        rendererArray:[],
        createRendererWithName: function(name) {
            MY_GLOBAL.typeChecker.assertIsString(name);
            
            if (this.getRendererWithName(name) !== null) {
                // there are duplicates! 
                throw "creation failed: a line renderer called " + name + " already exists!";
                return;
            }
            
            var newRenderer = Object.create(this.rendererProto);
            newRenderer.initWithName(name);
            this.rendererArray.push(newRenderer);
        },
        
        getRendererWithName: function(name) {
            var i;
            for (i=0; i<this.rendererArray.length(); i++) {
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
            name: '', 
            dataArray: [1,3,3,2,5,1,4], // fake data
            initWithName: function(name) {
                this.name = name;    
            },
            appendDataAndRender: function(value) {
                this.dataArray.push(value);
                this.render();
            }, 
            render: function() {
            
                var newCanvas = $('<svg>');
                
                
            }, 
            thresholdArray:[],
            thresholdProto: {
                name: '', 
                value: 0
            }
        }   
    }
};