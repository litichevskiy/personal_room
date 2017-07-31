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

    });

})();