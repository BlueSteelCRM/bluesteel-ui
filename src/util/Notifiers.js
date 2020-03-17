import { useSnackbar } from 'notistack';

function useNotifiers(){
	const {enqueueSnackbar} = useSnackbar();
	return {
		notify:function(result){
			enqueueSnackbar((result && result.message) || "Saved",{ variant: 'success'});
		},
		notifyErr:function notifyErr(error){
			console.error("Error:",error);
			let msg=error.message || error || "Error saving";
			if (typeof msg=='object') msg=JSON.stringify(msg);
			if (msg.indexOf("GraphQL error:")===0) msg=msg.slice(14);

			enqueueSnackbar(msg,{ variant: 'error'});
		}
	};
};

export default useNotifiers;
