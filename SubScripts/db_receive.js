async function receive_to_db( Refnum, data ){
	data.id = sessionStorage.getItem( "login_id" );
	try{
		var response = await receive_promise( Refnum, data );
		if( response == true ){
			return true;
		}
		else{
			alert( response );
			return false;
		}
	}
	catch(e){
		alert( "資料庫錯誤:" + e  );
		return false;
	}
}

// receive promise
function receive_promise( Refnum, data ){
	var tabID = Refnum.tabID;
	var supplier_obj = Refnum.supplier_obj;
	return new Promise(function (resolve, reject){
		$.ajax({
			type: "post",
			url: "https://script.google.com/macros/s/AKfycbzyVUOVl7SgoAkxDAWGCgB9LkAHHi_6eLACe6tAgDy6usw62j4/exec",
			data: data,
			dataType: "JSON",
			timeout: 10000,
			success: function( response ){
				switch( data.state ){
					case "get_all_data":
						tabID.bootstrapTable('destroy').bootstrapTable({
							exportDataType: "all"
						});
					case "get_record_data":
					case "get_supplier_list":
						tabID.bootstrapTable('removeAll');
						tabID.bootstrapTable('load', response);
						tabID.bootstrapTable('selectPage', '1');
						tabID.bootstrapTable('scrollTo', 'top');
						resolve( true );
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
						resolve( true );
						break;
					case "get_all_partnum":
						if( response[0].number == undefined || response.number == "" ){
							return;
						}
						part_list_options = "";
						for(var i=0; i < response.length; i++){
							part_list_options += '<option value="'+response[i].number+'" />';
						}
						sessionStorage.setItem( "part_options", part_list_options );
						resolve( true );
						break;
					default:
						resolve( "undefined function" );
				}
				
			},
			error: function(err){
				reject( err.status + err.responseText );
			}
		});
	});
}