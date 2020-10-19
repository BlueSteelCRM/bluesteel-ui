import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('grapesjs-graphql', (editor, opts = {}) => {
  const options = { ...{},  ...opts };

  // Add custom storage to the editor
  editor.StorageManager.add("graphql-store", {
    load(keys, clb, clbErr) {
			console.log("Calling load");
			let data={};
			return clb(data);
    },

    store(data, clb, clbErr) {
			console.log("Called store:",data);
			clb();
    },
  });
});
