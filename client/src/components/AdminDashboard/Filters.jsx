import React from 'react'

const Filters = (props) => {
    function onFilterValueChanged(e) {
        props.FilterValueSelected(e.target.value)
    }

  return (
    <div className='filter-area'>
<select name='isAvailable' onChange={onFilterValueChanged}>
    <option value="SelectFilter">Select Filter</option>
    <option value="NameASC"  >Name(Asc)</option>
    <option value="NameDES">Name(Des)</option>
    <option value="DateASC">Date(Asc)</option>
    <option value="DateDES">Date(DES)</option>

</select>
    </div>
    
  )
}

export default Filters