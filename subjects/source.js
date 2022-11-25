function showData() {
  let allData = "";
  let urlParams = new URLSearchParams(window.location.search);
  let subjectName = urlParams.get("subject");
  console.log(subjectName);
  let SubjectData = JSON.parse(localStorage.getItem("data"))[0][subjectName];

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
                      <td scope="col" >${j + 1}</td>
                      <td scope="col" class="topic">${
                        SubjectData[i].topics[j].topic
                      }</td>
                      <td scope="col"><input type="checkbox"class="form-check-input"  id="" ${checked} onclick="toggleCheck(${
        i + "," + j + "," + "'id" + i + "" + j + "'"
      })"></td>
                    </tr>`;
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
            } <span class="text-danger">|</span> ${(
      (checkedCount / totalCount) *
      100
    ).toFixed(1)}% </a
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
        <button
      type="button"
      class="btn btn-light"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onclick="editClick('${subjectName}',${i})"
    >
      <i class="fa  fa-edit"></i>
    </button></div>  </div>

     
                 
                  </caption>
                  <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Topics</th>
                      <th scope="col">Finished</th>
                    </tr>
                  </thead>
                  <tbody id="tbody">${topicsHtml}</tbody>
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
}

showData();
