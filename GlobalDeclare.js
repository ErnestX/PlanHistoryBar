"use strict";

var MY_GLOBAL = {};

function initPlan(plan) {
    plan.classList.add("photo");
    plan.classList.add("unselected");
}

//function moveObjectLeftToPos(obj, posFromLeft) {
//    if (typeof (obj) === "object" && typeof (posFromLeft) === "number") {
//        obj.style.left = posFromLeft.toString() + "px";
//    } else {
//        alertTypeCheckFailure(obj);
//        alertTypeCheckFailure(posFromLeft);
//    }
//}

function getPlanAtIndex(index) {
    var img = new Image();
    img.src = "google-maps.jpg";
    return img;
}

function alertTypeCheckFailure(data) {
    console.log("type check failed: " + typeof(data));
}