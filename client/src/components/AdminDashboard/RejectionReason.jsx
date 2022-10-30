import React from 'react'

const RejectionReason = () => {
  return (
    <div>
        <form action="none">
      <label for="reason for denial">Reason for Rejection:  </label>
        <select name="rod" id="rod">
          <option value="low balance">Balance insufficient</option>
          <option value="fly hours less">Flight hours insufficient</option>
          <option value="License not approved">License not valid</option>
          <option value="No spots left">No spots left</option>
        </select>
        <input type="submit" value="Submit"></input>
        </form>
      </div>
  )
}

export default RejectionReason