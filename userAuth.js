let emailFormVal = document.getElementsByClassName("enterEmail")[0];
let pwdFormVal = document.getElementsByClassName("enterPsw")[0];
let loginbutton = document.getElementsByClassName("login")[0];
let signupbutton = document.getElementsByClassName("signupbtn")[0];
let db;

async function getDB(dataBase) {
  const response = await fetch(dataBase);
  const body = await response.json();
  return body;
}

// getDB("db.json")
// .then(data => {
//   db = data;
// })
// .catch(err => {console.log("error")});

function setup() {
  loginbutton.addEventListener("click", function() {
    authenticateUser(emailFormVal.value, pwdFormVal.value, db);
  });

  signupbutton.addEventListener("click", function() {
    addUser(emailFormVal.value, pwdFormVal.value, db);
  });

  getDB("db.json")
    .then(data => {
      db = data;
    })
    .catch(err => {
      console.log("error");
    });

  setTimeout(() => {
    console.log(db);
  }, 0);
}

function hashFunc(aString) {
  hash = "";

  for (i = 0; i < aString.length; i++) {
    hash += aString.charCodeAt(i);
  }
  return hash;
}

function authenticateUser(uName, pWord, db) {
  let userNameHash = hashFunc(uName);
  let passwordHash = hashFunc(pWord);
  console.log(db);

  if (localStorage.getItem(userNameHash) === passwordHash) {
    alert("Authenticated!");
  } else if (db[userNameHash] && db[userNameHash] === passwordHash) {
    alert("Authenticated!");
  } else {
    alert("Unable to verify your user/pass combo");
  }
}

function addUser(username, password, db) {
  let userNameHash = hashFunc(username);
  let passwordHash = hashFunc(password);

  getDevices = async () => {
    const location = window.location.hostname;
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    try {
      const fetchResponse = await fetch(
        `http://${location}:8000/db.json`,
        settings
      );
      const data = await fetchResponse.json();
      return data;
    } catch (e) {
      return e;
    }
  };

  getDevices();

  if (db[userNameHash]) {
    alert("Your are already in our system!, please sign in");
  } else {
    localStorage.setItem(userNameHash, passwordHash);
    console.log("Added your username!");
    db[userNameHash] = passwordHash;
  }
}

function getRequest() {}

//let j = fetch('db.json')
//.then((response) => {
//	return response.json();})
//
//return j;}
//
//
//
//
//req = getRequest();
//
//
//fetch('db.json')
//  .then((response) => {
//    return response.json();
//  })
//  .then((data) => {
//    console.log(data);
