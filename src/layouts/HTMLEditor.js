import React,{useCallback} from 'react';
import grapesjs from 'grapesjs';
//import graphqlStore from './grapesjs-graphql.js';
import './FormEdit.scss';

function addStorage(editor){
	// Here our `simple-storage` implementation
const SimpleStorage = {};

editor.StorageManager.add('simple-storage', {
  /**
   * Load the data
   * @param  {Array} keys Array containing values to load, eg, ['gjs-components', 'gjs-style', ...]
   * @param  {Function} clb Callback function to call when the load is ended
   * @param  {Function} clbErr Callback function to call in case of errors
   */
  load(keys, clb, clbErr) {
		console.log("Calling load:",keys);
    const result = {};

    keys.forEach(key => {
      const value = SimpleStorage[key];
      if (value) {
        result[key] = value;
      }
    });

    // Might be called inside some async method
    clb(result);
  },

  /**
   * Store the data
   * @param  {Object} data Data object to store
   * @param  {Function} clb Callback function to call when the load is ended
   * @param  {Function} clbErr Callback function to call in case of errors
   */
  store(data, clb, clbErr) {
		console.log("Calling store:",data);
    for (let key in data) {
      SimpleStorage[key] = data[key];
    }
    // Might be called inside some async method
    clb();
  }
});
}

export default function HTMLEditor(props){

	const grapeRef = useCallback(node => {
    if (node !== null) {
			const editor = grapesjs.init({
			  // Indicate where to init the editor. You can also pass an HTMLElement
			  container: node,
			  // Get the content for the canvas directly from the element
			  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
			  //fromElement: true,
				components: '<h1>Hello World Component!</h1>',
			  // Size of the editor
			  height: '600px',
			  width: 'auto',
			  storageManager: {type:"simple-storage"},
			  // Avoid any default panel
			  panels: { defaults: [] },
			});
			addStorage(editor);
    }
  }, []);


	return	<div ref={grapeRef} id="geditor"/>
}
