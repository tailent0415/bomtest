// send data to database
async function send_to_db( data ){
	data.id = sessionStorage.getItem("login_id");
	try{
		var response = await send_promise( data );
        return response;
	}
	catch(e){
		alert( "資料庫錯誤:" + e  );
        return false;
	}
}

// send promise
function send_promise( data ){
	return new Promise(function (resolve, reject){
		$.ajax({
			type: "get",
			url: "https://script.google.com/macros/s/AKfycbx6DpX7AHFdxprVtsSehZBZWmMWF3aynYEu_ey2z1cSjjRvfLgK/exec",
			data: data,
			dataType: "JSON",
			timeout: 30000,
			success: function (response) {
                if ( response !== true ){
                    if( typeof response == "string" ){
                        reject( response );
                        return;
                    };
                }
                switch( data.state ){
                    case "add_newdata":
                        resolve( "資料新增完成" );
                        break;
                    case "add_mo_data":
                        resolve( "製令新增完成" );
                        break;
                    case "uploadFile":
                        resolve( response);
                        break;
                    case "set_supplier_info":
                        resolve( "廠商資訊更新" );
                        break;
                    case "replace_data":
                        resolve( "資料修改完成" );
                        break;
                    case "replace_mo_info":
                        resolve( "製令更新完成" );
                        break;
                    case "add_inventory_quantity":
                        resolve( "倉庫數量已變更" );
                        break;
                    case "rem_mo_data":
                        resolve( "製令移除完成" );
                        break;
                    case "rem_record_data":
                        resolve( "紀錄移除完成" );
                        break;
                    case "rem_supplier_data":
                        resolve( "廠商移除完成" );
                        break;
                    case "generate_new_mo":
                        resolve( "製令產生確認" );
                        break;
                    default:
                }
			},
			error: function (err) {
				reject( err.status + err.responseText );
			}
		});
	})			
}