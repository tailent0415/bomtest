async function receive_to_db( data ){
	data.id = sessionStorage.getItem( "login_id" );
	try{
		var response = await receive_promise( data );
        return response;
	}
	catch(e){
		alert( "資料庫錯誤:" + e  );
		return false;
	}
}

// receive promise
function receive_promise( data ){
	return new Promise(function (resolve, reject){
		$.ajax({
			type: "post",
			url: "https://script.google.com/macros/s/AKfycbwKABEfJzkFN9eQFT-ZrAc4gDaMQNrYgwXVH9KOYW0laumRMcM3/exec",
			data: data,
			dataType: "JSON",
			timeout: 10000,
			success: function( response ){
                if( response !== true ){
                    if( typeof response == "string" ){
                        reject( response );
                        return;
                    };
                };
				switch( data.state ){
					case "get_all_data":
					case "get_record_data":
					case "get_supplier_data":
                    case "get_mo_all_info":
                    case "get_mo_single_info":
                    case "get_mo_struct":
                    case "get_supplier_info":
					case "get_single_data":
                        resolve( response );
                        break;
					case "get_all_supplier_name":
						if( response[0].supplier == undefined || response.supplier == "" ){
							return;
						}
						var supplier_list_options = "";
						for(var i=0; i < response.length; i++){
							supplier_list_options += '<option value="'+response[i].supplier+'" />';
						}
						sessionStorage.setItem( "supplier_options", supplier_list_options );
						resolve( supplier_list_options );
						break;
					case "get_all_partnum":
						if( response[0].number == undefined || response.number == "" ){
							return;
						}
						var part_list_options = "";
						for(var i=0; i < response.length; i++){
							part_list_options += '<option value="'+response[i].number+'" />';
						}
						sessionStorage.setItem( "part_options", part_list_options );
						resolve( part_list_options );
						break;
					case "get_all_manifest_number":
						if( response[0].manifest == undefined || response.manifest == "" ){
							return;
						}
						var manifest_list_options = "";
						for(var i=0; i < response.length; i++){
							manifest_list_options += '<option value="'+response[i].manifest+'" />';
						}
						sessionStorage.setItem( "manifest_options", manifest_list_options );
						resolve( manifest_list_options );
						break;
                    case "get_sn_inbound":
                        resolve( response );
                        break;
					default:
						reject( "undefined function" );
				}
			},
			error: function(err){
				reject( err.status + err.responseText );
			}
		});
	});
}