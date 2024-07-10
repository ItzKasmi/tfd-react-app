import React from 'react'

export default function StatComponent(props) {
  const { reactorData, componentData } = props;
  if (!reactorData && !componentData) {
    return (
      <div>
        <p>Error, no data loaded in statComponent.</p>
      </div>
    )
  }

  return (
    <div>
      {reactorData.reactor_id}
      <hr></hr>
      {componentData.external_component[0].external_component_id}
    </div>
  )
}
