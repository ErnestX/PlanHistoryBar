'use strict';

MY_GLOBAL.lineGraphsRenderer = {
    rowRendererArray:[],
    createLineRendererWithNameOntoRow: function(name, rowNum) {
        MY_GLOBAL.typeChecker.assertIsString(name);
        MY_GLOBAL.typeChecker.assertIsInteger(rowNum);
        
        if (!(this.rowRendererProto.isPrototypeOf(this.rowRendererArray[rowNum]))) {
            // this row is currently empty. Create new renderer.
            this.rowRendererArray.[rowNum] = Object.create(this.rowRendererProto); 
        }
        
        this.rowRendererArray.[rowNum].createLineRendererWithName(name);
    }, 
    
    rowRendererProto: {
        lineRendererArray:[],
        createLineRendererWithName: function(name) {
            MY_GLOBAL.typeChecker.assertIsString(name);
            
            if (this.getLineRendererWithName(name) !== null) {
                // there are duplicates! 
                throw "creation failed: a line renderer called " + name + " already exists!";
                return;
            }
            
            var newLineRenderer = Object.create(this.lineRendererProto);
            newLineRenderer.initWithName(name);
            this.lineRendererArray.push(newLineRenderer);
        },
        
        getLineRendererWithName: function(name) {
            var i;
            for (i=0; i<this.lineRendererArray.length(); i++) {
                MY_GLOBAL.assert(this.
                                 lineRendererProto.
                                 isPrototypeOf(this.lineRendererArray[i]));   
                
                if (name === this.lineRendererArray[i].name) {
                    return this.lineRendererArray[i];
                }
            }
            
            return null;
        }, 
        
        lineRendererProto: {
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
                
            }, 
            thresholdArray:[],
            thresholdProto: {
                name: '', 
                value: 0
            }
        }   
    }
};