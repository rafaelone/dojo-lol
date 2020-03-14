import React, { memo } from 'react';

// import { Container } from './styles';

function example({ name }) {
  return <p>{name}</p>;
}

export default memo(example)
