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
    <div>
      {basicData.user_name}
    </div>
  )
}
