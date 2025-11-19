document.addEventListener("DOMContentLoaded", () => {
  fetch("./nav.html")
    .then((response) => response.text())
    .then((data) => {
      const navbar = document.getElementById("navbar-container");
      navbar.innerHTML = data;

      activelink(navbar.getAttribute("title"));
      setupnav();
      Navigate();
    });
});

function Navigate() {
  const button = document.getElementsByClassName("about-btn")[0];
  if (button) {
    button.addEventListener("click", () => {
      window.location.href="./about.html"
    });
  }
}

function setupnav() {
  console.log("ddddd");
  const projects = document.getElementById("project-link");
  const contact = document.getElementById("contact-link");
  const currentUrl = window.location.pathname;

  console.log(currentUrl);
  if (projects) {
    projects.addEventListener("click", () => {
      console.log("clicked");
      if (currentUrl.endsWith("/services.html")) {
        projects.href = "#project-page";
      } else {
        projects.href = "/services.html#project-page";
      }
    });
  }
  if (contact) {
    contact.addEventListener("click", (e) => {
      console.log("click");
      if (currentUrl.endsWith("/index.html")) {
        console.log("jjj");
        contact.href = "#contact-sec";
      } else {
        contact.href = "/index.html#contact-sec";
      }
    });
  }
}

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(e.target);
    const formdata = e.target;
    const url =
      "https://docs.google.com/forms/d/e/1FAIpQLSeYpkgt8J-QNAlSZeVFbNRY_xCOIEOFnr9KH-1gtUJ7yLoyRQ/formResponse";

    const formData = new FormData(formdata);

    fetch(url, {
      body: formData,
      method: "POST",
      mode: "no-cors",
    })
      .then((res) => {
        console.log(res);
        formdata.reset();
        console.log("good");
      })
      .catch((err) => {
        console.log("bad");
        console.log(err);
      });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log(".........", entry);
      if (entry.isIntersecting) {
        console.log("hellooo");
        entry.target.classList.add("show-class");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

function activelink(e) {
  li = document.querySelector(`#${e}`);
  console.log(li);
  if (li) {
    li.classList.add("active-nav");
  }
}

function opensidebar() {
  const nav = document.getElementsByClassName("nav")[0];
  const close = document.getElementsByClassName("closing-icon")[0];
  console.log("helloopen nav");
  console.log(nav);

  setTimeout(() => {
    close.classList.add("closing-icon-add");
    close.style.animation = "fade .2s ease-in-out";
  }, 2000);

  nav.classList.add("nav-open");
}

function closenav() {
  document.getElementsByClassName("nav-open")[0].classList.remove("nav-open");
  const close = document.querySelectorAll(".closing-icon-add");

  if (close) {
    console.log(close);
    close.forEach((icon) => {
      icon.classList.remove("closing-icon-add");
    });
  }
  console.log(close);
}

function changingtext() {
  let index = 0;
  const array = [
    {
      text: "Full stack Developer",
      length: 20,
    },
    {
      text: "Front End Developer",
      length: 19,
    },
    {
      text: "Software Engineer",
      length: 17,
    },
  ];
  changingtext = document.getElementsByClassName("changing-text")[0];

  console.log(array[index].text);

  function show() {
    console.log(index);

    changingtext.innerHTML = array[index].text;
    changingtext.style.animation = "none";
    void changingtext.offsetWidth;
    changingtext.style.animation = `typing 3s steps(${array[index].length},end), blink 0.6s step-end infinite`;

    index = (index + 1) % array.length;
  }
  show();
  setInterval(show, 4000);
}
changingtext();
