async function receive_to_db( data ){
	try{
		alert( data.id );
		alert( data.state );
		var response = await receive_promise( data );
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
function receive_promise( data ){
	return new Promise(function (resolve, reject){
		$.ajax({
			type: "post",
			url: "https://script.google.com/macros/s/AKfycbzyVUOVl7SgoAkxDAWGCgB9LkAHHi_6eLACe6tAgDy6usw62j4/exec",
			data: data,
			dataType: "JSON",
			timeout: 10000,
			success: function(response){
				switch( data.state ){
					case "get_all_data":
						data.tabID.bootstrapTable('destroy').bootstrapTable({
							exportDataType: "all"
						});
					case "get_record_data":
					case "get_supplier_list":
						data.tabID.bootstrapTable('removeAll');
						data.tabID.bootstrapTable('load', response);
						data.tabID.bootstrapTable('selectPage', '1');
						data.tabID.bootstrapTable('scrollTo', 'top');
						resolve( true );
						break;
					default:
						resolve( "undefined function" );
				}
			},
			error: function(err){
				reject( err.status + err.responseText );
				alert("error");
			}
		});
	});
}