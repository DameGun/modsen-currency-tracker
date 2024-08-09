declare module '*.svg' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module '*.json' {
  const jsonPath: string;
  export default jsonPath;
}

declare module '*.png' {
  const imagePath: string;
  export default imagePath;
}
