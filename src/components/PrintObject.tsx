import React from 'react';

type Props = {
  content: object;
};

function PrintObject({ content }: Props) {
  const formattedContent: string = JSON.stringify(content, null, 2);
  return <pre>{formattedContent}</pre>;
}

export default PrintObject;