import React from 'react'

const Filters = (props) => {
    function onFilterValueChanged(e) {
        props.FilterValueSelected(e.target.value)
    }

  return (
    // <div className='filter-area'>
<select className="sortSelector" name='isAvailable' onChange={onFilterValueChanged}>
    <option value="SelectFilter">Sort</option>
    <option value="NameASC"  >Name (Asc)</option>
    <option value="NameDES">Name (Desc)</option>
    <option value="DateASC">Date (Asc)</option>
    <option value="DateDES">Date (Desc)</option>

</select>
    // </div>
    
  )
}

export default Filters