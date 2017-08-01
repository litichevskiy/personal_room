(function( exports ) {

    function createTable( list ) {

        let length = list.length,
            fragment = document.createDocumentFragment(),
            tr, cell, row, rowLength;

        for( let i = 0; i < length; i++ ) {

            row = list[ i ];

            tr = document.createElement('tr');

            rowLength = row.length;

            for( let i = 0; i < rowLength; i++ ) {

                cell = document.createElement('td');
                cell.innerHTML = row[ i ];

                tr.appendChild( cell );
            }

            fragment.appendChild( tr );
        }

        return fragment;
    };

    exports.createTable = createTable;

})( window );