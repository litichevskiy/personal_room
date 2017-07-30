(function( exports ) {

    const   ACTIVE_LIST = 'open_drop_down',
            ACTIVE_ROW = 'active_row',
            ANIMATION_TIME = 300; // ms

    function OpenCloseDropDownList( data ) {

        if( typeof $ !== 'function' ) throw{ message: 'module required jquery' };
        if( !data.container ) throw{ message: 'module required container: html element ul - li' };
        if( !data.classDropDownList ) throw{ message: 'module required className drop daown list' };

        this.container = data.container;
        this.classDropDownList = data.classDropDownList;
        this.checkClick = this.checkClick.bind( this );

        this.container.addEventListener( 'click', this.checkClick );
    };

    let fn = OpenCloseDropDownList.prototype;

    fn.checkClick = function( event ) {

        let target = event.target, list;

        if( target.tagName !== 'LI' ) target = this.getParent( target, 'LI' );

        list = target.querySelector('.'+ this.classDropDownList );

        if( !list ) return;

        if( !$( list ).hasClass( ACTIVE_LIST ) ) {

            $( target ).addClass( ACTIVE_ROW );
            $( list ).addClass( ACTIVE_LIST );
            $( list ).slideDown( ANIMATION_TIME );
        }

        else{

            $( target ).removeClass( ACTIVE_ROW );
            $( list ).removeClass( ACTIVE_LIST );
            $( list ).slideUp( ANIMATION_TIME );
        }
    };

    fn.getParent = function( target, name ) {

        while( true ) {

            if( target.tagName !== name ) target = target.parentElement;
            else return target;
        }
    };

    exports.OpenCloseDropDownList = OpenCloseDropDownList;

})( window );