//program to make automated bootstrap tables

let topics = `1.1 Introduction 1
1.2 Electric Charge 1
1.3 Conductors and Insulators 5
1.4 Charging by Induction 6
1.5 Basic Properties of Electric Charge 8
1.6 Coulomb’s Law 10
1.7 Forces between Multiple Charges 15
1.8 Electric Field 18
1.9 Electric Field Lines 23
1.10 Electric Flux 25
1.11 Electric Dipole 27
1.12 Dipole in a Uniform External Field 31
1.13 Continuous Charge Distribution 32
1.14 Gauss’s Law 33
1.15 Applications of Gauss’s Law 37`;

let textArea = document.getElementById("textareas");
let finalStr;

const removeNum = () => {
  topics = textArea.value;
  finalStr = topics.replace(/\d*[.]?\d*/g, "");
};

let finalHTML;
let afterHolder = `}`;
let beforeHolder;

// const htmlMaker = () => {
//   removeNum();

//   let topicsArr = finalStr.split("\n");
//   beforeHolder = `
//    <div class="container my-2">
//       <div>
//         <p>
//           <a
//             class="btn btn-primary my-2"
//             data-bs-toggle="collapse"
//             href="#${topicsArr[0].replace(/\s/g, "")}"
//             role="button"
//             aria-expanded="false"
//             aria-controls="${topicsArr[0].replace(/\s/g, "")}"
//             >${topicsArr[0]}</a
//           >
//         </p>
//       </div>
//       <div class="row">
//         <div class="col">
//           <div class="collapse multi-collapse" id="${topicsArr[0].replace(
//             /\s/g,
//             ""
//           )}">
//             <div class="card card-body">
//               <div class="table-responsive">
//                 <table class="table table-hover">
//                   <caption>
//                    Topics
//                   </caption>
//                   <thead class="table-dark">
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">Topics</th>
//                       <th scope="col">Importance</th>
//                     </tr>
//                   </thead>
//                   <tbody>`;
//   topicsArr.shift();
//   topicsArr.map((t) => {
//     finalHTML += `
//                     <tr>
//                     <th scope="row">${topicsArr.indexOf(t) + 1}</th>
//                       <td>${t}</td>
//                       <td><input type="checkbox" name="${t.replace(
//                         /\s/g,
//                         ""
//                       )}" id="${t.replace(/\s/g, "")}"></td>
//                     </tr>`;
//   });

//   document
//     .getElementById("holder")
//     .appendChild(document.createTextNode(finalHTML.replace("undefined", "")));
//   document
//     .getElementById("before-holder")
//     .appendChild(document.createTextNode(beforeHolder));
//   document
//     .getElementById("after-holder")
//     .appendChild(document.createTextNode(afterHolder));
// };
class Chapter {
  constructor(subject, chapter) {
    (this.subject = subject), (this.chapter = chapter);
  }
}
class TopicObj extends Chapter {
  constructor(subject, chapter, topic, imp, checked) {
    super(subject, chapter);
    (this.topic = topic), (this.importance = imp);
    this.checked = checked;
  }
  checkTopic() {
    this.checked = true;
  }
  unCheckTopic() {
    this.checked = false;
  }
}
let allTopic = [];
const topicObjMaker = () => {
  removeNum();
  let topicsArr = finalStr.split("\n");
  console.log(topicsArr);
  let subject = "chemistry";
  let chapter = topicsArr[0];
  topicsArr.shift();
  topicsArr.map((e) => {
    let topicObj = new TopicObj(subject, chapter, e, "%", false);
    allTopic.push(topicObj);
  });

  beforeHolder = `
  {
chapterName: "${allTopic[0].chapter}",
topics:`;

  allTopic.map((e) => {
    finalHTML += ` {
        subject:${e.subject} ,
        chapter:${e.chapter},
        topic:${e.topic},
        importance:${e.importance},
        check:${e.checked},
        checkedTrue: function () {
      this.checked = true;
    },
        }
        `;
  });
  //   document
  //     .getElementById("holder")
  //     .appendChild(document.createTextNode(finalHTML));
  document.getElementById("holder").innerHTML = JSON.stringify(allTopic);
  console.log(JSON.stringify(allTopic));
  document.getElementById("before-holder").innerHTML = beforeHolder;
  document.getElementById("after-holder").innerHTML = afterHolder;
};

const copyHtml = () => {
  let textToCopy = document.getElementById("fullCode");
  navigator.clipboard.writeText(textToCopy.innerText);
  let alertCopy = document.getElementById("alert");
  alertCopy.classList.remove("d-none");
  setTimeout(() => {
    alertCopy.classList.add("d-none");
  }, 2000);
  textArea.value = "";
  document.getElementById("holder").innerHTML = "";
  document.getElementById("before-holder").innerHTML = "";
  document.getElementById("after-holder").innerHTML = "";
  allTopic = [];
};
