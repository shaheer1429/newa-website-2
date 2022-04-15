//JavaScript Code-->
const navToggler = document.querySelector(".toggle");
const menu = document.querySelector(".sidebar");
navToggler.addEventListener("click", function () {
  menu.classList.toggle("toggler");
});

const searchInput = document.querySelector(".searchInput");

function getSearchResults(val) {
  if (val === "") {
    return "world";
  } else {
    return val;
  }
}

const apiKey = "4b7e9b48729140beb96394ecf27d892d";
const url = `
https://newsapi.org/v2/everything?q=world&apiKey=${apiKey}`;

function insertData(data) {
  let dynamic = document.querySelector(".cards");
  console.log(data);
  if (data.status === "ok") {
    for (let i = 0; i < 20; i++) {
      let fetch = document.querySelector(".cards").innerHTML;
      dynamic.innerHTML =
        `<div class="card">
      <div class="img">
        <img
          src="${data.articles[i].urlToImage}"
          alt=""
        />
      </div>
      <div class="news">
        <h3 class="title">
          ${data.articles[i].title}
        </h3>
        <span class="auth"
          >Author • <span class="author">${data.articles[i].author}</span>
        </span>
        <p class="desc">
          ${data.articles[i].description}
        </p>
        <a href="${data.articles[i].url}" class="more" target="_blank">
           See Full Coverage</a
        >
      </div>
    </div>` + fetch;
    }
  } else {
    dynamic.innerHTML = `<div class="error">
    <h1>Looks Like there was an Error :)</h1>
    <button class = "reload" onClick="window.location.reload();">Reload This Page</button>
  </div>`;
  }
}
fetch(url).then(async (res) => {
  try {
    const data = await res.json();
    if (data.status === "ok") {
      insertData(data);
    } else {
      insertData({});
    }
  } catch (err) {
    insertData({});
  }
});
