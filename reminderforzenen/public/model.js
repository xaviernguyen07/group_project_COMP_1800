let label = document.getElementsByTagName("label");
let number = 0;
label[0].style.backgroundColor = "rgb(" + 130 + "," + 150 + "," + 150 + ")"
label[1].style.backgroundColor = "rgb(" + 200 + "," + 100 + "," + 150 + ")"
label[2].style.backgroundColor = "rgb(" + 250 + "," + 100 + "," + 200 + ")"
label[3].style.backgroundColor = "rgb(" + 20 + "," + 250 + "," + 100 + ")"
label[4].style.backgroundColor = "rgb(" + 200 + "," + 150 + "," + 100 + ")"
label[5].style.backgroundColor = "rgb(" + 100 + "," + 100 + "," + 205 + ")"
label[6].style.backgroundColor = "rgb(" + 230 + "," + 100 + "," + 120 + ")"
label[7].style.backgroundColor = "rgb(" + 100 + "," + 130 + "," + 120 + ")"

function openEditPopup() {
    document.getElementById("popupForm").style.display = "block";
}


function renew() {
    location.reload();
}
let del = document.getElementById('delete')
del.onclick = renew;