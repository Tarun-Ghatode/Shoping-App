// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method:'POST',
      body: JSON.stringify(userData),
      headers : {'content-type':'application/json'}
    })
    const data = await response.json();
    // console.log('data---', data);
    // TODO : on server it will only return some info of user (not password)
    resolve({ data });

  });
}

export function checkUser(loginInfo) {
 
  return new Promise(async (resolve,reject) => {
   
    const email = loginInfo.email;
    const password = loginInfo.password;

    const response = await fetch(`http://localhost:8080/users?email=${email}`)
    const data = await response.json();

    if(data.length){
      if(data[0].password === password){
        resolve({ data : data[0] })
      }
      else {
        reject({ message: "Wrong credentials" });
      }
    }
    else {
      reject({ message: "Please signup first" });
    }


    // TODO : on server it will only return some info of user (not password)
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
  
    const response = await fetch("http://localhost:8080/users/"+update.id, {
      method:'PATCH',
      body: JSON.stringify(update),
      headers : {'content-type':'application/json'}
    })
    const data = await response.json();

    resolve({ data });
  });
}
