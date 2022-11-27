let allData = "";
let urlParams = new URLSearchParams(window.location.search);
let subjectName = urlParams.get("subject");
console.log(subjectName);
let SubjectData = JSON.parse(localStorage.getItem("data"))[0][subjectName];
let btnText = "mark";
for (let i = 0; i < SubjectData.length; i++) {
  let finalHTML = "";
  let topicsHtml = "";
  let checkedCount = 0;
  let totalCount = SubjectData[i].topics.length;
  for (let j = 0; j < SubjectData[i].topics.length; j++) {
    let checked = "";
    if (SubjectData[i].topics[j].checked === true) {
      checked = "checked";
      checkedCount++;
    }
    topicsHtml += `
                    <tr id="${"id" + i + "" + j}" class="${
      checked ? "bg-success text-light text-decoration-line-through" : "h"
    }">
                      <td scope="col" class="align-middle">${j + 1}</td>
                      <td scope="col" class="topic align-middle">${
                        SubjectData[i].topics[j].topic
                      }</td>
                      <th scope="col class="text-center align-middle"><input type="checkbox"class="form-check-input p-2 "  id="" ${checked} onclick="toggleCheck(${
      i + "," + j + "," + "'id" + i + "" + j + "'"
    })"></td>
                    </tr>`;
  }
  if (totalCount === checkedCount) {
    btnText = "Unmark all";
  } else {
    btnText = "Mark all";
  }

  let createdId = SubjectData[i].chapterName
    .replace(/\s/g, "")
    .replace(/\W/g, "");
  finalHTML = `
     <div class="container-sm  my-2 ">
      <div>
        <p>
          <a
            class="btn btn-success my-2 py-3"
            data-bs-toggle="collapse"
            href="#${createdId}"
            role="button"
            aria-expanded="false"
            aria-controls="${createdId}"
            >${
              SubjectData[i].chapterName
            } <span class="text-danger">|</span> <span id="percent${i}">${(
    (checkedCount / totalCount) *
    100
  ).toFixed(1)}</span> % </a
          >
        </p>
        </div>
        <div class="row">
        <div class="col">
        <div class="collapse multi-collapse" id="${createdId}">
        <div class="card card-body">
        <div class="table-responsive">
        <table class="table table-hover ">
        <caption>
        
        <div class="d-flex justify-content-between">   <div>Topics</div> <div>
        <button class="btn btn-light shadow text-success" onclick="subId=${i}"     data-bs-toggle="modal"
      data-bs-target="#addTopic"><i class="fa fa-plus" style="font-size:16px"></i></button>
        <button
      type="button"
      class="btn btn-light border shadow-sm"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onclick="editClick('${subjectName}',${i})"
    >
      <i class="fa  fa-edit"></i>
    </button>
    <button
      type="button"
      class="btn btn-light border shadow-sm"
      onclick="TopicsUpdate(${i},${true})"
      id="mark-topic${i}"
    >
      ${btnText}
    </button>
    </div> 
          

     
                 
                  </caption>
                  <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Topics</th>
                      <th scope="col">Finished</th>
                    </tr>
                  </thead>
                  <tbody id="${i}">${topicsHtml}</tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
                </div>
    </div>
    `;
  allData += finalHTML;
}
document.body.innerHTML += allData;
document.getElementById("nav-sub").innerText = subjectName;

function TopicsUpdate(i, m) {
  let btn = document.getElementById(`mark-topic${i}`);
  let mainData = JSON.parse(localStorage.getItem("data"));
  let check = "true";
  let updatedTopics = "";
  let checked = "";

  for (let j = 0; j < mainData[0][subjectName][i].topics.length; j++) {
    checked = "";
    if (mainData[0][subjectName][i].topics[j].checked === true) {
      checked = "checked";
    }
    if (m) {
      if (btn.innerText == "Mark all") {
        if (mainData[0][subjectName][i].topics[j].checked === true) {
          checked = "checked";
        } else {
          mainData[0][subjectName][i].topics[j].checked = true;
          checked = "checked";
          localStorage.setItem("data", JSON.stringify(mainData));
        }
        check = "true";
      } else {
        if (mainData[0][subjectName][i].topics[j].checked === false) {
          checked = "";
        } else {
          mainData[0][subjectName][i].topics[j].checked = false;
          checked = "";
          localStorage.setItem("data", JSON.stringify(mainData));
        }
        check = "false";
      }
    }

    updatedTopics += `
                    <tr id="${"id" + i + "" + j}" class="${
      checked == "checked"
        ? "bg-success text-light text-decoration-line-through"
        : "h"
    }">
                      <td scope="col" class="align-middle">${j + 1}</td>
                      <td scope="col" class="topic align-middle">${
                        mainData[0][subjectName][i].topics[j].topic
                      }</td>
                      <td scope="col class="text-center align-middle"><input type="checkbox"class="form-check-input p-2 "  id="" ${checked} onclick="toggleCheck(${
      i + "," + j + "," + "'id" + i + "" + j + "'"
    })"></th>
                    </tr>`;
  }
  if (m) {
    if (check == "true") {
      btn.innerText = "Unmark all";
    } else {
      btn.innerText = "Mark all";
    }
  }
  document.getElementById(i).innerHTML = updatedTopics;
  updatePercent(i);
}
