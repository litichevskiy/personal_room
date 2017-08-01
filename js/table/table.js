(function( exports, createTable, serverAPI ) {

    function Table( data ) {

        this.container = data.container;
        this.data = data.list;
        this.header = this.container.querySelector('thead');
        this.body = this.container.querySelector('tbody');
        this.inputs = this.container.querySelectorAll('input[type="text"]');
        this.flag = data.flag || 'gi';
        this.urlSortTable = data.urlSortTable;
        this.pagination = data.pagination;
        this.curuntColumn = 0;
        this.is_reverse = -1;

        this.createTable( this.data );

        let that = this;

        this.header.addEventListener('click', function( event ) {

            let target = event.target,
                role = target.dataset.role,
                column = +target.dataset.column;

            if( !role ) return;

            that.curuntColumn = column;

            that.is_reverse = ( role === 'down' ) ? 1 : -1;

            let curentPage = $(that.pagination).pagination('getCurrentPage'),
                url = that.urlSortTable + '?page=' + curentPage;

            that.updateTable( { order:[ that.curuntColumn, that.is_reverse ] }, url );

        }, true );


        this.inputs.forEach = [].forEach;
        this.search = this.search.bind( this );
        this.updateTablePge = this.updateTablePge.bind( this );

        this.pagination.addEventListener('click', this.updateTablePge );

        this.inputs.forEach(function( item, i ) {

            item.dataset.id = i;
            item.addEventListener( 'input', that.search, true );
        });

        $( this.pagination ).pagination({
            items: 12,//data.last_page,
            cssStyle: 'light-theme'
        });
    };


    let fn = Table.prototype;

    fn.search = function( event ) {

        let target = event.target.value.trim();

        if( !target ) this.createTable( this.data );

        else{

            let regexp = new RegExp( '.*' + target + '.*', this.flag ),
                id = event.target.dataset.id,
                list = this.data,
                length = this.data.length,
                result = [], cell, row, is_match;

            for( let i = 0; i < length; i++ ) {

                row = list[ i ];

                cell = row[ id ] + '';

                is_match = cell.match( regexp );

                if( is_match ) result.push( row );
            }

            this.createTable( result );

            console.log( regexp );
        }
    };

    fn.createTable = function( list ) {

        let table = createTable( list );

        this.body.innerHTML = '';
        this.body.appendChild( table );
    };

    fn.updateTablePge = function() {

        let curentPage = $(this.pagination).pagination('getCurrentPage'),
            url = this.urlSortTable + '?page=' + curentPage;

        this.updateTable( { order:[ this.curuntColumn, this.is_reverse ] }, url );
    };

    fn.updateTable = function( data, url ) {

        let that = this;

        // console.log( data, 'list ', data.order, fakeUrl );

        serverAPI.sortTable( data, url )
        .then(function( response ) {
            /////////////////////////////////////////////////////////// add check status
            that.createTable( response.data.data );
        })
        .fail(function( error ) {
            console.error( error )
        });
    };

    exports.Table = Table;

})( window, createTable, serverAPI );