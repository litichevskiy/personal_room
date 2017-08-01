(function( exports ) {

    let serverAPI = {

        getTable : function( url ) {

            var defer = $.Deferred();

            $.ajax({
                url: url,
                type: 'POST'
            })
            .then(function( response ){

                defer.resolve( response );
            })
            .fail(function( error ){

                defer.reject( error );
            });

            return defer.promise();
        },

        sortTable : function( obj, url ) {

            var defer = $.Deferred();

            $.ajax({
                url: url,
                type: 'POST',
                data: obj
            })
            .then(function( response ){

                defer.resolve( response );
            })
            .fail(function( error ){

                defer.reject( error );
            });

            return defer.promise();
        }
    }

    exports.serverAPI = serverAPI;

})( window );