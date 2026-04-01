/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);

/* -----------------------------------------
      Include html inside other html
 ---------------------------------------- */

function loadContent(path, project) {
  fetch(path)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(project).innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

/* -----------------------------------------
            Load Gallery Images from folder path
 ---------------------------------------- */

function loadGallery(file, gallery) {
  fetch(file)
    .then((response) => response.json())
    .then((data) => {
      const path = data.path;
      const images = data.images;
      const parentElement = document.getElementById(gallery);

      images.forEach(filename => {
        const colElement = document.createElement("col");
        const imgElement = document.createElement("img");
        imgElement.src = `${path}/${filename}`;
        imgElement.alt = filename;
        imgElement.className = "img-fluid rounded";
        colElement.appendChild(imgElement);
        parentElement.appendChild(colElement);
      });
    })
    .catch((error) => console.error("Error fetching images:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadContent("static/projects/OOP/sokoban.html", "sokoban");
  loadContent("static/projects/DB/musisys.html", "musisys");
  loadContent("education.html", "education");
  loadContent("certifications.html", "certifications");
  loadContent("awards.html", "awards");
  loadContent("static/projects/UMA/uma.html", "uma");
  loadContent("static/projects/Assessments/candidates.html", "candidates");
  loadContent("static/projects/Assessments/compliances.html", "compliances");
  loadContent("static/projects/Recommerce/recom.html", "recom");
  loadContent("skills.html", "skills");
  loadContent("static/projects/DIMA/fenix.html", "fenix");
  loadGallery("static/projects/DIMA/fenix.json", "fenix-gallery");

  /* -----------------------------------------
            Get Bachelor Grades
 ---------------------------------------- */

  fetch("grades.json")
    .then((response) => response.json())
    .then((data) => {
      const tablesContainer = document.getElementById("ige-grades");
      const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

      years.forEach((year) => {
        // Create a column with a table for each year
        const col = document.createElement("div");
        col.className = "col";

        const yearData = data.filter((item) => item.Year === year);

        const table = document.createElement("table");
        table.className = "table table-bordered table-striped mt-4";

        const thead = document.createElement("thead");
        thead.className = "table-dark";
        thead.innerHTML = `
            <tr>
              <th colspan="3" class="text-center">${year}</th>
            </tr>
            <tr>
              <th>Subject</th>
              <th class="text-center">Grade</th>
              <th class="text-center">ECTS Scale</th>
            </tr>
          `;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        yearData.forEach((item) => {
          const row = document.createElement("tr");

          // Subject column
          const subjectCell = document.createElement("td");
          subjectCell.textContent = item.Subject;
          row.appendChild(subjectCell);

          // Numeric Grade column
          const numericGradeCell = document.createElement("td");
          numericGradeCell.className = "text-center";
          numericGradeCell.textContent = item["Numeric Grade"];
          row.appendChild(numericGradeCell);

          // ECTS Grade column
          const ectsGradeCell = document.createElement("td");
          ectsGradeCell.className = "text-center";
          ectsGradeCell.textContent = item["ECTS Grade"];
          row.appendChild(ectsGradeCell);

          tbody.appendChild(row);
        });

        table.appendChild(tbody);
        col.appendChild(table);
        tablesContainer.appendChild(col);
      });
    });

  /* -----------------------------------------
          Back to the top button
 ---------------------------------------- */

  var mybutton = document.getElementById("toTop");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  /* -----------------------------------------
               Avatar Message
 ---------------------------------------- */

  var popoverTrigger = document.getElementById("avatar");
  var popover = new bootstrap.Popover(popoverTrigger, {
    trigger: "manual",
  });

  popover.show();

  popoverTrigger.addEventListener("click", function (e) {
    e.stopPropagation();
    popover.toggle();
  });

  document.addEventListener("click", function (e) {
    if (!popoverTrigger.contains(e.target)) {
      popover.hide();
    }
  });
});
