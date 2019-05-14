function chooseV() {
  var themePage = document.getElementById("chooseTheme");
  themePage.style.display = "none";

  var air = document.getElementById("air");
  var jungle = document.getElementById("jungle");
  var water = document.getElementById("water");

  if (air) {
    document.getElementById("airVehicle").hidden = false;
  } else if (jungle) {
    document.getElementById("jungleVehicle").hidden = false;
  } else if (water) {
     document.getElementById("waterVehicle").hidden = false;
  }
}

function planeStart() {

}
function jetStart() {

}
