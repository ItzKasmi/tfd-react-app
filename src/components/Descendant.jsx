import React from 'react'

export default function Descendant(props) {
  const { descendantData } = props;
  if (!descendantData) {
    return (
      <div>
        <p>Error, no data loaded in descendant.</p>
      </div>
    )
  }

  return (
    <div>
      {descendantData.descendant_level}
    </div>
  )
}
