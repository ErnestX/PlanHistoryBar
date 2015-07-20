"use strict";

function selectIndex(index) {
    
}

function highlightObject(obj) {
    if (typeof (obj) === "object") {
        obj.classList.remove("unselected");
        obj.classList.add("selected");
    } else {
        alertTypeCheckFailure();
    }
}

function unHighlightObject(obj) {
    if (typeof (obj) === "object") {
        obj.classList.remove("selected");
        obj.classList.add("unselected");
    } else {
        alertTypeCheckFailure();
    }
}

function moveObjectLeftToPos(obj, posFromLeft) {
    if (typeof (obj) === "object" && typeof (posFromLeft) === "number") {
        obj.style.left = posFromLeft.toString() + "px";
    } else {
        alertTypeCheckFailure();
    }
}

function alertTypeCheckFailure() {
    console.log("type check failed");
}