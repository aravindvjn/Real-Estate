import Link from 'next/link'
import React from 'react'

const AccountActivities = () => {
  return (
    <div className='p-5 md:px-12'>
      <Link className='px-4 py-1 rounded bg-blue-500 text-white' href={`account/edit`}>Edit Profile</Link>
    </div>
  )
}

export default AccountActivities
