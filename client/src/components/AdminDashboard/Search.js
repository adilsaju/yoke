import React from 'react'
import { useState,useEffect } from 'react';

const fetchTasks = async () => {
    let url1 = `/students/`;
    const res = await fetch(url1);
    const data = await res.json();
  
    console.log(data);
    return data;
  };

const Search = () => {
    const [students,setStudents] = useState([])
    const [q, setQ] = useState("");
    const [searchParam] = useState(["name"]);
    useEffect(() => {

      
        const getTasks = async () => {
          const tfs = await fetchTasks();
          setStudents(tfs);
        };
  
        getTasks();
  
      }, []);
    
    function search(items) {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });
      }
  return (
    <>
    <div className="search-wrapper">
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for..."
                                value={q}
                                /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
                                onChange={(e) => setQ(e.target.value)} 
                                />
                                </label>
                                </div>
    {search(students).map((student) => ( 
        <li>
          {student.name}
        </li> ))}

    </>
  
  )
}

export default Search