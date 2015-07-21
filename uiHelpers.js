"use strict";

function highlightObject(obj) {
    if (typeof (obj) === "object") {
        obj.classList.add("selected");
        obj.classList.remove("unselected");
    } else {
        alertTypeCheckFailure();
    }
}

function unHighlightObject(obj) {
    if (typeof (obj) === "object") {
        obj.classList.add("unselected");
        obj.classList.remove("selected");
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

function getPlanAtIndex(index) {
    var img = new Image();
    img.src = "google-maps.jpg";
    return img;
}

function alertTypeCheckFailure() {
    console.log("type check failed");
}