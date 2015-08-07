'use strict';

MY_GLOBAL.lineGraphsRenderer = {
    rowRendererArray:[],
    createLineRendererOntoRow: function(rowNum) {
        MY_GLOBAL.typeChecker.assertIsInteger(rowNum);
        
        if (!(this.rowRendererProto.isPrototypeOf(this.rowRendererArray[rowNum]))) {
            this.rowRendererArray.[rowNum] = Object.create(this.rowRendererProto); 
        }
        
        // TODO: check name duplication
        this.
        rowRendererArray[rowNum].
        lineRendererArray.
        push(Object.create(this.rowRendererProto.lineRendererProto));
    }, 
    
    rowRendererProto: {
        lineRendererArray:[],
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
            dataArray: [], 
            appendDataAndUpdate: function(value) {
                
            }, 
            thresholdArray:[],
            thresholdProto: {
                name: '', 
                value: 0
            }
        }   
    }
}