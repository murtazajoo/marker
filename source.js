let dataAll = JSON.parse(localStorage.getItem("data"));
let subjects = ["physics", "math", "chemistry", "biology", "english"];
let claculatedData = [];
for (let i = 0; i < subjects.length; i++) {
  let totalCount = 0;
  let checkedCount = 0;
  let subjectDataMain = dataAll[0][subjects[i]];
  for (let j = 0; j < subjectDataMain.length; j++) {
    totalCount += subjectDataMain[j].topics.length;
    for (let k = 0; k < subjectDataMain[j].topics.length; k++) {
      if (subjectDataMain[j].topics[k].checked === true) {
        checkedCount++;
      }
    }
  }
  let percentage = ((checkedCount / totalCount) * 100).toFixed(0);
  document.getElementById("tbody").innerHTML += ` <tr class="${
    percentage > 49 ? "almostcompleted" : ""
  }">
              <th scope="row">${i + 1}</th>
              <td><a href="subjects/?subject=${subjects[i]}">${
    subjects[i].charAt(0).toUpperCase() + subjects[i].slice(1)
  }</a></td>
              <td>${percentage}%</td>
            </tr>`;
}

function eraseData() {
  let proceed = confirm(
    "Are you sure you want to proceed? Everything will be deleted!"
  );
  if (proceed) {
    localStorage.clear();
    window.location.reload();
  }
}
