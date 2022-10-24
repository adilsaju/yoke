import React from 'react'

const Search = () => {
   
      const myFunction = () => {
        console.log("getting calledddddddddddddddddddddd");
        // Declare variables
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        const msg = document.getElementById("msg");
      
        filter = input.value.toUpperCase();
        
        
        table = document.getElementsByClassName("myTable");
        console.log(table);
        tr = document.getElementsByClassName("tay");
      
        // Loop through all table rows, and hide those who don't match the search query
        const  tLen = tr.length
        let emptyCnt = 0
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
              emptyCnt ++;
      
            }
          }
        }
      
        if (emptyCnt === tLen){
          msg.style.display = "";
      
        }else {
          msg.style.display = "none";
      
        }
      }
  return (
    <>
   <input type="text" id="myInput" onKeyUp={(e) => { myFunction()} }  placeholder="Search for names.." />

    </>
  
  )
}

export default Search