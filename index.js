let a = document.getElementById("contentBox");
a.innerHTML = "<h2>Start Your Burger Journey NOW!</h2>";
let obj1 = { order_status: false, paid: false };
let flag = false;

let getMenu = () => {
  a.innerHTML = "";
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
  a.innerHTML = "<h2>Taking your order ...</h2>";

  let Promise1 = new Promise((resolve, reject) => {
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
            burger1: data[ran1].name,
            burger2: data[ran2].name,
            burger3: data[ran3].name,
          };
          // console.log(obj);

          resolve(obj);
        });
    }, 2500);
  });

  Promise1.then((value) => {
    console.log(value);
    flag = true;
    obj1.order_status = false;
    console.log(obj1);

    let el = document.createElement("p");
    el.classList.add("prd");
    el.innerHTML = `
    <h2 style="color: brown;">Burgers Selected:</h2>
            <span style="color: chocolate;  text-align: center; ">
            <br><br>
            Burger 1 => ${value.burger1}
            <br><br>
            Burger 2 => ${value.burger2}
            <br><br>
            Burger 3 => ${value.burger3}
            </span>
            <br><br>
            <h2 style="color: red; text-align: center;">Go Ahead, & Confirm your Order NOW!</h2>
               `;
    a.appendChild(el);
  });
};

let orderPrep = () => {
  a.innerHTML = "<h2>Confirming Your Order Status ...</h2>";

  let Promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      a.innerHTML = "";

      if (flag) obj1.order_status = true;

      resolve(obj1);
    }, 1500);
  });

  Promise2.then((value) => {
    console.log(value);
    let el = document.createElement("p");
    // el.classList.add("prd");
    if (value.order_status) {
      el.innerHTML = `
    <h2 style="color: brown;">You have confirmed the order, Now proceed for Payment</h2>
               `;
    } else {
      el.innerHTML = `
      <h2 style="color: brown;">You haven't selected anything to Order</h2>
                 `;
    }

    a.appendChild(el);
  });
};

let payOrder = () => {
  a.innerHTML = "<h2>Paying the Order Price ...</h2>";

  let Promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      a.innerHTML = "";

      if (obj1.order_status) obj1.paid = true;

      resolve(obj1);
    }, 1000);
  });

  Promise3.then((value) => {
    console.log(value);
    let el = document.createElement("p");
    // el.classList.add("prd");
    if (value.paid && value.order_status) {
      el.innerHTML = `
      <h2 style="color: brown;">You have paid the Order Price</h2>
                 `;
      setTimeout(() => {
        thankyouFnc();
      }, 1500);
    } else {
      el.innerHTML = `
        <h2 style="color: brown;">You haven't confirmed any order yet, Confirm your Order first</h2>
                   `;
    }

    a.appendChild(el);
  });
};

let thankyouFnc = () => {
  if (obj1.paid && obj1.order_status) {
    obj1.paid = false;
    obj1.order_status = false;
    flag = false;
    console.log(obj1);
    alert("Thank You for ordering burgers from our Restaurant :) ");
  }
};
