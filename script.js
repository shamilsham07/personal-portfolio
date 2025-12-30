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
      window.location.href = "./services.html";
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
        projects.href = "services.html#project-page";
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
        contact.href = "index.html#contact-sec";
      }
    });
  }
}

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const button = document.getElementsByClassName("con-btn");
    console.log(button);
    button.disabled = true;
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
        console.log("fffffffffffffffff");
        formdata.reset();
        button.disabled = false;
        opentoast();
      })
      .catch((err) => {
        console.log("bad");
        console.log(err);
        button.disabled = false;
        openfalsetoast();
      });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log(".........", entry);
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("set-main-count")) {
          CounterActive(entry.target);
          projectActive();
        } else if (entry.target.classList.contains("fade-bottom")) {
          console.log("reached");
          console.log(entry.target);
          entry.target.classList.add("show-class");
        } else if (entry.target.classList.contains("reveal")) {
          entry.target.classList.add("show-class");
          observer.unobserve(entry.target);
        } else if (entry.target.classList.contains("img-stacks")) {
          document.querySelectorAll(".img-stacks").forEach((el) => {
            el.classList.add("img-reveals");
          });
        } else if (entry.target.classList.contains("home-div-img")) {
          entry.target.classList.add("banner-img");
        } else if (entry.target.classList.contains("avatar")) {
          console.log("printing");
          entry.target.classList.add("animated-avatar");
        } else if (entry.target.classList.contains("fade-up")) {
          entry.target.classList.add("faded");
        } else if (entry.target.classList.contains("delay-second")) {
          entry.target.classList.add("fade-fromleft");
        } else if (entry.target.classList.contains("button-delay")) {
          entry.target.classList.add("fade-btn");
        }

        // console.log("hellooo");
        // entry.target.classList.add("show-class");
        // observer.unobserve(entry.target);
      } else {
        entry.target.classList.remove("show-class");
        entry.target.classList.remove("banner-img");
        if (entry.target.classList.contains("img-reveals")) {
          entry.target.classList.remove("img-reveals");
        }
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll(".fade-bottom").forEach((el) => observer.observe(el));
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
document
  .querySelectorAll(".set-main-count")
  .forEach((el) => observer.observe(el));

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
document.querySelectorAll(".img-stacks").forEach((el) => observer.observe(el));
document
  .querySelectorAll(".home-div-img")
  .forEach((el) => observer.observe(el));
document.querySelectorAll(".avatar").forEach((el) => observer.observe(el));

document
  .querySelectorAll(".delay-second")
  .forEach((el) => observer.observe(el));
document
  .querySelectorAll(".button-delay")
  .forEach((el) => observer.observe(el));

function activelink(e) {
  li = document.querySelector(`#${e}`);
  a=li.querySelector("a")
  console.log(li);
  console.log("...",a)
  if (li) {
    a.classList.add("active-nav");
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
  if (window.innerWidth < 768) {
    console.log("klklklklkl");
    const stylishnav = document.getElementsByClassName("stylish-nav")[0];
    console.log("...", stylishnav);
    if (stylishnav) {
      console.log("kjkdsgdh");
    
    stylishnav.addEventListener("pointerleave", () => {
        console.log("mouseout");
        closenav();
      });
    }
  }
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

// ........................

function closetoast() {
  const toast = document.getElementsByClassName("toasts")[0];
  console.log("fistt");

  if (toast) {
    console.log("...........");
    toast.style.display = "none";
  }
}

function opentoast() {
  console.log("opened");
  const toast = document.getElementsByClassName("toasts")[0];
  const p = toast.querySelector("p");
  const img = toast.querySelector("img");
  toast.style.top = "4px";
  p.innerHTML = "successfully submited";
  p.style.color = "green";
  toast.style.backgroundColor = "90ee90";
  img.src = "./images/check (3).png";
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.top = "-50px";
    toast.style.opacity = "0";
  }, 2000);
}

function openfalsetoast() {
  const toast = document.getElementsByClassName("toasts")[0];
  const p = toast.querySelector("p");
  const img = toast.querySelector("img");
  console.log("ividaethi");
  toast.style.opacity = "1";
  toast.style.backgroundColor = "#FFB09C";
  p.style.color = "#ee2400";
  p.innerHTML = "something wrong";
  toast.style.top = "4px";
  img.src = "./images/close (1).png";
  img.style.width = "20px";
  img.style.height = "20px";
  setTimeout(() => {
    toast.style.top = "-50px";
    toast.style.opacity = 0;
  }, 2000);
}

function CounterActive() {
  console.log("jjjjjj");
  const count = document.getElementsByClassName("experience-count")[0];
  if (count) {
    let counted = 1;
    let start = 30;

    const interval = setInterval(() => {
      count.innerHTML = `${start}+`;
      if (start <= counted) {
        clearInterval(interval);
      }
      start--;
    }, 50);
  }
}

function projectActive() {
  const project_value = document.getElementsByClassName("project-count")[0];
  if (project_value) {
    let count = 30;
    let project = 5;
    const interval = setInterval(() => {
      project_value.innerHTML = `${count}+`;
      if (count <= project) {
        clearInterval(interval);
      }
      count--;
    }, 50);
  }
}

function navigateserices() {
  console.log("try");
  window.location.href = "./services.html";
}

function transition() {
  const element = document.getElementsByClassName("comment-box-1")[0];
  const elements = document.getElementsByClassName("comment-box-2")[0];

  if (element) {
    console.log(element);
    element.classList.add("change-trans");
    elements.classList.add("change-web");
  }
}
function transout() {
  const element = document.getElementsByClassName("change-trans")[0];
  const elements = document.getElementsByClassName("change-web")[0];

  if (element) {
    console.log(element);
    element.classList.remove("change-trans");
    elements.classList.remove("change-web");
  }
}

function naviagtefacebook() {
  window.open("https://www.facebook.com/shami1sham", "_blank");
}
function navigatelinkdin() {
  window.open("https://www.linkedin.com/in/shamil-sham-b92bb531b/", "_blank");
}

function downloadcv() {
  console.log("download your own");
  const link = document.createElement("a");
  link.href = "./images/shamil mt cv (2).pdf";
  link.download = "cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function navigategit() {
  console.log("hrlll");
  window.open("https://github.com/shamilsham07", "_blank");
}
function navigateinsta() {
  console.log("drlll");
  window.open(
    "https://www.instagram.com/shamil__sham_?igsh=dmYwZXY1ZzZhaGNz&utm_source=qr",
    "_blank"
  );
}

function mouseovercall() {
  const element = document.getElementsByClassName("toast-call")[0];
  element.classList.add("toast-opacity");
}
function removemousecall() {
  const element = document.getElementsByClassName("toast-opacity")[0];
  element.classList.remove("toast-opacity");
}
function copiedtext() {
  navigator.clipboard.writeText("+971 0521447030");
  const element = document.getElementsByClassName("bi-clipboard")[0];
  element.classList.toggle("bi-clipboard");
  element.classList.toggle("bi-clipboard-check");
  element.style.color = "blue";
  setTimeout(() => {
    element.classList.toggle("bi-clipboard-check");
    element.classList.toggle("bi-clipboard");
    element.style.color = "black";
  }, 1000);
}
let imageindex = 0;

// function imagecarousel() {
//   const curentimage = document.getElementsByClassName("current")[0];
//   const previousimage = document.getElementsByClassName("previous")[0];
//   const nextimage = document.getElementsByClassName("nextimage")[0];
//   console.log(
//     "...............................................////////////////////////////////////////////////////////"
//   );
//   console.log(curentimage);
//   console.log(previousimage);
//   console.log(nextimage);
//   const imagearray = [
//     "./images/programming-background-collage.jpg",
//     "./images/5779230.jpg",
//     "./images/programmer-night.jpg",
//     "./images/online-business-database.jpg",
//   ];

//   if (curentimage) {
//     const nextindex = (imageindex + 1) % imagearray.length;
//     const previousindex =
//       (imageindex - 1 + imagearray.length) % imagearray.length;

//     [curentimage, nextimage, previousimage].forEach(
//       (img) => (img.style.opacity = 0)
//     );
//     curentimage.src = imagearray[imageindex];
//     previousimage.src = imagearray[previousindex];
//     nextimage.src = imagearray[nextindex];

//     [curentimage, nextimage, previousimage].forEach(
//       (img) => (img.style.opacity = 1)
//     );
//   }
//   setTimeout(() => {
//     imageindex = (imageindex + 1) % imagearray.length;
//   }, 50);
//   setTimeout(imagecarousel, 2000);
// }
// imagecarousel();
var prevOffset = window.pageYOffset;
window.onscroll = function () {
  if (window.innerWidth > 768) {
    var currentoffset = window.pageYOffset;
    if (currentoffset > prevOffset) {
      console.log("good");
      setTimeout(() => {
        const nav = document.getElementsByClassName("nav")[0];
        nav.style.transition = "opacity .700s ease-in-out";

        nav.style.opacity = "0";
      }, 700);
    } else {
      this.document.getElementsByClassName("nav")[0].style.opacity = 1;
    }
    prevOffset = currentoffset;
  }
};
