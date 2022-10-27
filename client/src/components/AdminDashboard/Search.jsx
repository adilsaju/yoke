import React from 'react'

const Search = () => {
   
      function searchSname() {
        var input, filter, found, table, tr, td, i, j;
        input = document.getElementById("myInput");
        const msg = document.getElementById("msg");
        filter = input.value.toUpperCase();
        table = document.getElementsByClassName("myTable");
        tr = document.getElementsByClassName("tay");
        let emptyCnt = 0
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
                emptyCnt ++;
            }
        }
    
    if (emptyCnt === tr.length){
          msg.style.display = "";
      
        }else {
          msg.style.display = "none";
        }
        }
  return (
    <>
   <input type="text" id="myInput" onKeyUp={(e) => { searchSname()} }  placeholder="Search " />

    </>
  
  )
}

export default Search