let a = document.getElementById("contentBox");
let getMenu = () => {
  fetch("https://free-food-menus-api-production.up.railway.app/burgers")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let el = document.createElement("div");
        el.classList.add("prd");
        el.innerHTML = `
        <img src="${element.img}" alt="img" >
        <br>
         ${element.name}
         <br>
         <i style="text-align: center; color :red;">${element.dsc}</i>
         <br>
         Price: ${element.price} ₹
         <br>
         Rating: ${element.rate}/5
         <br>
         Country of Origin: ${element.country}
             `;
        a.appendChild(el);
      }
    });
};

let takeOrder = () => {
  a.innerHTML = "<h2>taking your order ...</h2>";
  setTimeout(() => {
    a.innerHTML = "";
    let ran1 = Math.floor(Math.random() * 20);
    let ran2 = Math.floor(Math.random() * 20) + 20;
    let ran3 = Math.floor(Math.random() * 20) + 40;
    fetch("https://free-food-menus-api-production.up.railway.app/burgers")
      .then((response) => response.json())
      .then((data) => {
        let arr = [ran1, ran2, ran3];
        for (let i = 0; i < arr.length; i++) {
          const element = data[arr[i]];

          let el = document.createElement("div");
          el.classList.add("prd");
          el.innerHTML = `
          <img src="${element.img}" alt="img" >
          <br>
           ${element.name}
           <br>
           <i style="text-align: center; color :red;">${element.dsc}</i>
           <br>
           Price: ${element.price} ₹
           <br>
           Rating: ${element.rate}/5
           <br>
           Country of Origin: ${element.country}
               `;
          a.appendChild(el);
        }
        let obj = {
          burger1: data[ran1],
          burger2: data[ran2],
          burger3: data[ran3],
        };
        // console.log(obj);
        new Promise((resolve, reject) => {
          resolve(obj);
        }).then((value) => {
          console.log(value);
        });
      });
  }, 2500);
};
