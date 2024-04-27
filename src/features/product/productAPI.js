// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json();
    resolve({data})
  }  
  );
}

export function fetchProductById(id){
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/products/' + id)
    const data = await response.json();
    console.log("response", response);    
    resolve({data})
  }  
  );
}

export function fetchProductsByFilters(filter,sort, pagination) {
  // filter = {"category": ["smartphone", "laptops"]}
  // sort = {_sort: "price"}
  // pagination = {_page:1,_limit=10} // _page=1&_limit=10
  // TODO : on server we will support multi values
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length ){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString +=`${key}=${lastCategoryValue}&`  
    }    
  }
  for(let key in sort){
    queryString +=`${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString +=`${key}=${pagination[key]}&`
  }
  
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/products?'+queryString);
    let data = await response.json();
    // console.log("🚀 ~ returnnewPromise ~ data:", data)

    const totalItems = await response.headers.get('X-Total-Count') || data.items
    // Tarun did : based on response from api changed the referenced to data 
    data = data.data
    // Tarun did : this did

    resolve({data:{products:data, totalItems:+totalItems}})
  }  
  );
}


export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json();
    resolve({data})
  }  
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json();
    resolve({data})
  }  
  );
}
