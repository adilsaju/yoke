import React from 'react'

const RejectionReason = () => {
  return (
    <div>
        <form action="none">
      <label for="reason for denial">Reason for Rejection:  </label>
        <select name="rod" id="rod">
          <option value="low balance">Insufficient Balance</option>
          <option value="fly hours less">Insufficient flight hours</option>
          <option value="License not approved">Expired document/s</option>
          <option value="No spots left">Document/s will expire in 30 days</option>
        </select>
        <input type="submit" value="Submit"></input>
        </form>
      </div>
  )
}

export default RejectionReason