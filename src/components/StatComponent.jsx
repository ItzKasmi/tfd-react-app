import { useEffect, useState } from "react";
import React from 'react';

export default function StatComponent(props) {
  const [ reactorImageUrl, setReactorImageUrl ] = useState(null);
  const { reactorData, componentData } = props;

  const reactorFilePath = 'reactor_data.json';
  const componentFilePath = 'component_data.json';
  

  const fetchReactorImageData = async () => {
    try {
      const res = await fetch(reactorFilePath);
      const jsonData = await res.json();
      return jsonData;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  const fetchComponentImageData = async () => {
    try {
      const res = await fetch(componentFilePath);
      const jsonData = await res.json();
      return jsonData;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  const getReactorImageUrl = async (reactorId) => {
    const jsonReactorData = await fetchReactorImageData();
    const reactor = jsonReactorData.find((reactor) => reactor.reactor_id === reactorId);
    return reactor ? reactor.image_url : null;
  }

  const getComponentImageUrl = async (componentId) => {
    const jsonComponentData = await fetchComponentImageData();
    const componentImages = jsonComponentData.some((component) => component.external_component_id === componentId);
    return componentImages ? componentImages : null;
  }

  useEffect(() => {
    const handleFetchImage = async () => {
      if (reactorData) {
        const url = await getReactorImageUrl(reactorData.reactor_id);
        if (url) {
          setReactorImageUrl(url);
        } else {
          console.error('Reactor not found or missing image URL');
        }
      } else {
        console.log('Reactor data is not available or empty')
      }
    };

    handleFetchImage();
  }, [reactorData])

  useEffect(() => {
    const handleFetchImage = async () => {
      if (componentData && componentData.external_component && componentData.external_component.length > 0) {
        
      }
    }
  }, [componentData])

  if (!reactorData && !componentData) {
    return (
      <div>
        <p>Error, no data loaded in statComponent.</p>
      </div>
    )
  }

  return (
    <div>
      {reactorImageUrl ? (
        <img src={reactorImageUrl} alt={`Reactor ${reactorData.reactor_id}`} />
      ) : (
        <p>Loading...</p>
      )}
      <hr></hr>
      {componentData.external_component[0].external_component_id}
    </div>
  )
}
