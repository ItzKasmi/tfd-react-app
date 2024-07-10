import React from 'react'

export default function Weapon(props) {
  const { weaponData } = props;
  if (!weaponData) {
    return (
      <div>
        <p>Error, no data loaded in weapon.</p>
      </div>
    )
  }

  return (
    <div>
      {weaponData.weapon[0].weapon_id}
    </div>
  )
}
