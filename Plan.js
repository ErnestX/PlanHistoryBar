"use strict";

MY_GLOBAL.planProto = {
    thumbnailSrc: "", 
    initWithThumbnail: function(t) { //TODO: add more para
//        console.log(this);
        this.thumbnailSrc = t;
    }, 
    
    getThumbnailImage: function() {
        var thumbnail = new Image();
        console.log(this.thumbnailSrc);
        console.log(this);
        thumbnail.src = this.thumbnailSrc;
        thumbnail.classList.add("photo");
        thumbnail.classList.add("unselected");    
        return thumbnail;
    }
};

//TODO: refactor to replace initPlan

function initPlan(plan) {
    plan.classList.add("photo");
    plan.classList.add("unselected");
}
