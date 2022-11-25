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

function addTodo() {
  let userTitle = document.getElementById("todo-new-title").value;
  let newTitle = userTitle;
  userTitle = " ";
  if (newTitle === "") return;
  let obj = {
    value: true,
    title: newTitle,
  };

  let exists = JSON.parse(localStorage.getItem("todo"));
  exists.push(obj);
  localStorage.setItem("todo", JSON.stringify(exists));
  checkLocalTodo();
}

function checkLocalTodo() {
  if (localStorage.getItem("todo") == null) {
    let obj = [];
    localStorage.setItem("todo", JSON.stringify(obj));
  }

  let todoTboby = document.getElementById("todo-tbody");
  let dataOfTodo = JSON.parse(localStorage.getItem("todo"));
  todoTboby.innerHTML = "";
  if (dataOfTodo.length < 1) {
    todoTboby.innerHTML = ` <td colspan="3" class="text-center">
                <p>click the "+" icon to add something</p>
              </td>
            </tr>`;
  } else {
    for (let i = 0; i < dataOfTodo.length; i++) {
      todoTboby.innerHTML += `
  <tr>
              <td colspan="2">${dataOfTodo[i].title}</td>
              <td class="text-end"><button
              onclick="deleteTodo(${i})"
            type="button"
            class="btn btn-light shadow-sm"
          >
            <i class="fa fa-trash text-danger"></i>
          </button></td>
            </tr>
  `;
    }
  }
}
checkLocalTodo();

function deleteTodo(i) {
  let dataOfTodo = JSON.parse(localStorage.getItem("todo"));
  dataOfTodo.splice(i, 1);
  localStorage.setItem("todo", JSON.stringify(dataOfTodo));
  checkLocalTodo();
}
