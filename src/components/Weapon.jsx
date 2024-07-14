import { useEffect, useState } from "react"
import React from 'react'

export default function Weapon(props) {
  const { weaponData } = props;

  const jsonFilePath = "public\weapon_data.json"

  const getImageUrl = (weaponId) => {
    const weapon = weaponData.find((weapon) => weapon.weapon_id === weaponId);
    return weapon ? weapon.image_url : null;
  };

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
