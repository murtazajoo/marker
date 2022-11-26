let linkParams = new URLSearchParams(window.location.search);
let subjectNamed = linkParams.get("subject");
let navLinks = document.getElementsByClassName("nav-link");
document.title = `Subject - ${subjectNamed}`;
let subId = 0;
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
    if (
      !localStorageData[0][subjectNamed][i].topics[j].hasOwnProperty(
        "userAdded"
      )
    ) {
      localStorageDataCopy[0][subjectNamed][i].topics[j].checked = false;
    }

    document
      .getElementById(e)
      .classList.remove(
        "bg-success",
        "text-light",
        "text-decoration-line-through"
      );
  } else {
    localStorageData[0][subjectNamed][i].topics[j].checked = true;
    if (
      !localStorageData[0][subjectNamed][i].topics[j].hasOwnProperty(
        "userAdded"
      )
    ) {
      localStorageDataCopy[0][subjectNamed][i].topics[j].checked = true;
    }

    document
      .getElementById(e)
      .classList.add(
        "bg-success",
        "text-light",
        "text-decoration-line-through"
      );
  }

  localStorage.setItem("data", JSON.stringify(localStorageData));
  if (
    !localStorageData[0][subjectNamed][i].topics[j].hasOwnProperty("userAdded")
  ) {
    localStorage.setItem("datacopy", JSON.stringify(localStorageDataCopy));
  }
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
  document.getElementById(
    "add-topic-btn"
  ).innerHTML = `<button class="btn btn-light shadow text-success" onclick="subId=${i}"     data-bs-toggle="modal"
      data-bs-target="#addTopic"><i class="fa fa-plus" style="font-size:16px"></i></button>`;
  modalBody.innerHTML = htmlData;
  modalBody.innerHTML += `<button class="btn  btn-link h6"  onClick="resetTopics('${sub}',${i})"><i  class="fa fa-undo " aria-hidden="true"> reset</i></button>`;
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
  let proceed = confirm(
    "Are you sure you want to proceed? The topics will reset to the original!, any topic you added will be lost forever"
  );
  if (proceed) {
    let copyData = JSON.parse(localStorage.getItem("datacopy"));
    let editableData = JSON.parse(localStorage.getItem("data"));
    editableData[0][sub][i].topics = copyData[0][sub][i].topics;
    localStorage.setItem("data", JSON.stringify(editableData));
    editUpdate(sub, i);
  }
}

function addTopic() {
  let newTopic = document.getElementById("topic-title");
  let addAlert = document.getElementById("add_topic_alert");
  if (newTopic.value == "") {
    addAlert.innerHTML = "Write something in the text box";
    addAlert.classList.add("alert-danger");
    return;
  }
  let data = JSON.parse(localStorage.getItem("data"));
  let obj = {
    topic: newTopic.value,
    checked: false,
    userAdded: true,
  };
  data[0][subjectNamed][subId].topics.push(obj);
  localStorage.setItem("data", JSON.stringify(data));
  addAlert.classList.remove("alert-warning");
  addAlert.classList.remove("alert-danger");

  addAlert.classList.add("alert-success");
  addAlert.innerHTML = "Topic added :)";
  newTopic.value = "";
}
