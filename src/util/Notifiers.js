import {useToasts } from 'react-toast-notifications'

function useNotifiers(){
	 const { addToast } = useToasts()
	return {
		notify:function(result){
			addToast((result && result.message) || "Saved",{ appearance: 'success'});
		},
		notifyErr:function notifyErr(error){
			console.error("Error:",error);
			let msg=error.message || error || "Error saving";
			if (typeof msg=='object') msg=JSON.stringify(msg);
			if (msg.indexOf("GraphQL error:")===0) msg=msg.slice(14);

			addToast(msg,{ appearance: 'error'});
		}
	};
};

export default useNotifiers;
