import React from 'react'

const Search = () => {
   
      // const myFunction = () => {
      //   console.log("getting calledddddddddddddddddddddd");
      //   // Declare variables
      //   let input, filter, table, tr, td, i, txtValue;
      //   input = document.getElementById("myInput");
      //   const msg = document.getElementById("msg");
      
      //   filter = input.value.toUpperCase();
        
        
      //   table = document.getElementsByClassName("myTable");
      //   console.log(table);
      //   tr = document.getElementsByClassName("tay");
      
      //   // Loop through all table rows, and hide those who don't match the search query
      //   const  tLen = tr.length
      //   let emptyCnt = 0
      //   for (i = 0; i < tr.length; i++) {
      //     td = tr[i].getElementsByTagName("td")[2];
      //     if (td) {
      //       txtValue = td.textContent || td.innerText;
      //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
      //         tr[i].style.display = "";
      //       } else {
      //         tr[i].style.display = "none";
      //         emptyCnt ++;
      
      //       }
      //     }
      //   }
      
      //   if (emptyCnt === tLen){
      //     msg.style.display = "";
      
      //   }else {
      //     msg.style.display = "none";
      
      //   }
      // }
      function searchSname() {
        var input, filter, found, table, tr, td, i, j;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementsByClassName("myTable");
        tr = document.getElementsByClassName("tay");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            for (j = 0; j < td.length; j++) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                }
            }
            if (found) {
                tr[i].style.display = "";
                found = false;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
  return (
    <>
   <input type="text" id="myInput" onKeyUp={(e) => { searchSname()} }  placeholder="Search for names.." />

    </>
  
  )
}

export default Search