import React from 'react'

const SearchStudent = () => {
  return (
    <form action="/" method="get">

    <input
        type="text"
        id="header-search"
        name="s"  />
    <button type="submit">Search</button>
</form>
  )
}

export default SearchStudent