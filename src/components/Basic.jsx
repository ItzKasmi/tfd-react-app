import React from 'react'

export default function Basic(props) {
  const { basicData } = props;
  if (!basicData) {
    return (
      <div>
        <p>Error, no data loaded in Basic.</p>
      </div>
    )
  }

  return (
    <>
    <div className="basic-container">
      <div className='basic-container-name'>
        <h1>{basicData.user_name}</h1>
      </div>
    </div>
    </>
  )
}
