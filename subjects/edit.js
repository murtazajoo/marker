let linkParams = new URLSearchParams(window.location.search);
let subjectNamed = linkParams.get("subject");
let navLinks = document.getElementsByClassName("nav-link");
switch (subjectNamed) {
  case "physics":
    navLinks[1].classList.add("active");
    break;
  case "chemistry":
    navLinks[2].classList.add("active");
    break;
  case "biology":
    navLinks[3].classList.add("active");
    break;
  case "math":
    navLinks[4].classList.add("active");
    break;
  case "english":
    navLinks[5].classList.add("active");
    break;
}
function toggleCheck(i, j, e) {
  let localStorageData = JSON.parse(localStorage.getItem("data"));
  let localStorageDataCopy = JSON.parse(localStorage.getItem("datacopy"));
  console.log("id", e, document.getElementById(e));

  if (localStorageData[0][subjectNamed][i].topics[j].checked === true) {
    localStorageData[0][subjectNamed][i].topics[j].checked = false;
    localStorageDataCopy[0][subjectNamed][i].topics[j].checked = false;

    document
      .getElementById(e)
      .classList.remove(
        "bg-success",
        "text-light",
        "text-decoration-line-through"
      );
  } else {
    localStorageData[0][subjectNamed][i].topics[j].checked = true;
    localStorageDataCopy[0][subjectNamed][i].topics[j].checked = true;

    document
      .getElementById(e)
      .classList.add(
        "bg-success",
        "text-light",
        "text-decoration-line-through"
      );
  }

  localStorage.setItem("data", JSON.stringify(localStorageData));
  localStorage.setItem("datacopy", JSON.stringify(localStorageDataCopy));
}
function editClick(sub, i) {
  console.log(sub);
  editUpdate(sub, i);
}
function editUpdate(sub, i) {
  let modalBody = document.getElementById("edit-body");
  let editData = JSON.parse(localStorage.getItem("data"))[0][sub];
  let copyData = JSON.parse(localStorage.getItem("datacopy"));
  let htmlData = ``;
  for (let j = 0; j < editData[i].topics.length; j++) {
    htmlData += `
          <tr>
                      <td scope="col" class="topic">${editData[i].topics[j].topic}</td>
                      <td><i onclick="deleteTopic('${sub}',${i},${j})" class="fa fa-minus-circle text-danger"></i></td>
                      </tr>`;
  }
  modalBody.innerHTML = htmlData;
  modalBody.innerHTML += `<button class="btn my-5 w-10 border shadow-sm"  onClick="resetTopics('${sub}',${i})"><i  class="fa fa-undo text-danger" aria-hidden="true"> reset</i></button>`;
  let diff = copyData[0][sub][i].topics.length - editData[i].topics.length;
  if (diff > 0) {
    document.getElementById(
      "topics-Alert"
    ).innerHTML = `<div class="alert alert-warning p-0 text-center">${diff} -Topics deleted from orignal</div>`;
  } else {
    document.getElementById("topics-Alert").innerHTML = "";
  }
}
function deleteTopic(sub, i, finalIndex) {
  let editableData = JSON.parse(localStorage.getItem("data"));
  let a = editableData[0][sub][i].topics.splice(finalIndex, 1);
  console.log(editableData);
  localStorage.setItem("data", JSON.stringify(editableData));
  editUpdate(sub, i);
}
function resetTopics(sub, i) {
  let copyData = JSON.parse(localStorage.getItem("datacopy"));
  let editableData = JSON.parse(localStorage.getItem("data"));
  editableData[0][sub][i].topics = copyData[0][sub][i].topics;
  localStorage.setItem("data", JSON.stringify(editableData));
  editUpdate(sub, i);
}
