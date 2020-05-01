import React from 'react';

import layouts from './layouts';


const CustomLayoutContext = React.createContext();

function CustomLayoutProvider(props) {
 return (
    <CustomLayoutContext.Provider value={layouts}>
      {props.children}
    </CustomLayoutContext.Provider>
  );
}
export { CustomLayoutContext, CustomLayoutProvider };
