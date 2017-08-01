(function() {

    document.addEventListener('DOMContentLoaded', function() {



        let list_info_panel = new OpenCloseDropDownList({
            container: document.querySelector('.list_info_panel'),
            classDropDownList: 'drop_down_list_info_panel'
        });

        let user_more_info = new OpenCloseDropDownList({
            container: document.querySelector('.container_user_more_info'),
            classDropDownList: 'drop_down_list_info_panel'
        });

        serverAPI.getTable( 'http://192.168.0.104:8080/api/v1/table/orders' )
        .then(function( response ) {

            let table = new Table({
                list: response.data.data,
                last_page: response.data.last_page,
                flag: 'gi',
                urlSortTable: 'http://192.168.0.104:8080/api/v1/table/orders',
                container: document.querySelector('table'),
                pagination: document.querySelector('.pagination')
            });

        })
        .fail(function( error ) {
            console.error( error )
        });
    });

})();