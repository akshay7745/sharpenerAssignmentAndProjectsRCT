const contentWrapper = document.querySelector("#content-wrapper");
let attendanceData = {};
const date = document.querySelector("#date");
const dateForm = document.querySelector("#searchByDate");
const hideDiv = document.querySelector("#hideDiv");

const attendanceDiv = document.querySelector("#attendanceList");

const reportBtn = document.querySelector("#report");

reportBtn.addEventListener("click", (e) => {
  console.log("Clicked");
  axios.get("http://localhost:3000/attendanceReport").then((res) => {
    console.log("Getting Attendance Report", res.data.attendance);
    const massagedData = res.data.attendance.map((user) => {
      const { id, name, attendances } = user;
      let totalAttendance = attendances.length;
      let present = 0;
      attendances.forEach((attendance) => {
        if (attendance.attendance) {
          present++;
        }
      });
      return { id, name, totalAttendance, present };
    });

    attendanceDiv.innerHTML = "";
    const h1 = document.createElement("h1");
    h1.innerHTML = "Attendance Report";
    const table = document.createElement("table");
    const attendanceList = massagedData
      .map((data) => {
        const { name, totalAttendance, present } = data;
        return `<tr><td>${name}</td><td>${present}/${totalAttendance}</td><td>${Math.floor(
          (present / totalAttendance) * 100
        )}%</td></tr>`;
      })
      .join("");

    table.innerHTML = `<thead><tr><th>USERNAME</th><th>Total Attendance</th><th>Percentage</th></tr></thead><tbody>${attendanceList}</tbody>`;

    attendanceDiv.append(h1, table);
  });
});

dateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitted date form");
  axios
    .all([
      axios.get(`http://localhost:3000/attendance/${date.value}`),
      axios.get("http://localhost:3000/users"),
    ])
    .then(
      axios.spread((attendance, users) => {
        console.log(attendance.data.attendance, users.data);
        if (attendance.data.attendance.length) {
          attendanceDiv.innerHTML = "";
          const h1 = document.createElement("h1");
          h1.innerHTML = "Attendance Table";
          const table = document.createElement("table");
          const attendanceList = attendance.data.attendance
            .map((data) => {
              const { attendance, user } = data;
              return `<tr><td>${user.name}</td><td>${
                attendance ? "✅" : "❌"
              }</td><td>${attendance ? "❌" : "✅"}</td></tr>`;
            })
            .join("");

          table.innerHTML = `<thead><tr><th>USERNAME</th><th>PRESENT</th><th>ABSENT</th></tr></thead><tbody>${attendanceList}</tbody>`;

          attendanceDiv.append(h1, table);
        } else {
          attendanceDiv.innerHTML = "";
          const h1 = document.createElement("h1");
          h1.innerHTML = "Attendance Form";
          const inputList = users.data
            .map((user) => {
              const { id, name } = user;
              return `<div>
                  <span>${name}</span>
                  <input
                    class="radio"
                    type="radio"
                    id=${id + "present"}
                    value="present"
                    name=${id}
                  /><label for=${id + "present"}>Present</label>
                  <input
                    class="radio"
                    type="radio"
                    id=${id + "absent"}
                    value="absent"
                    name=${id}
                  /><label for=${id + "absent"}>Absent</label>
                </div>`;
            })
            .join("");

          form.innerHTML = `<form onsubmit=${formHandler()}><fieldset><legend>Attendance Form</legend>${inputList}<input type='submit' value='Submit Attendance'/></fieldset></form>`;

          attendanceDiv.append(h1, form);
        }
      })
    );
});

attendanceDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("radio")) {
    const id = parseInt(e.target.id);
    const value = e.target.value;
    attendanceData[id] = value;
    console.log(attendanceData);
  }
});

function formHandler(e) {
  e.preventDefault();
  attendanceData.date = date.value;
  console.log("Form submitted", attendanceData);
  axios.post("http://localhost:3000/attendance", attendanceData).then((res) => {
    console.log("REs after attendance filled", res.data.attendance);
    attendanceDiv.innerHTML = "";
    const h1 = document.createElement("h1");
    h1.innerHTML = "Attendance Table";
    const table = document.createElement("table");
    const attendanceList = res.data.attendance
      .map((data) => {
        const { attendance, user } = data;
        return `<tr><td>${user.name}</td><td>${
          attendance ? "✅" : "❌"
        }</td><td>${attendance ? "❌" : "✅"}</td></tr>`;
      })
      .join("");

    table.innerHTML = `<thead><tr><th>USERNAME</th><th>PRESENT</th><th>ABSENT</th></tr></thead><tbody>${attendanceList}</tbody>`;

    attendanceDiv.append(h1, table);
  });
}
