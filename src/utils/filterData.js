// not a hook , normal function
// a normal function doesnt change state
export function filterData(searchText,allRestaurant)
     {
     const filtered = allRestaurant.filter((allRestaurant)=>
     allRestaurant.data.data.name.toLowerCase().includes
     (searchText.toLowerCase())) ;
     return filtered;
     }