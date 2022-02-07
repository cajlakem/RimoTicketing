
export class MyUploadAdapter {
    loader: any;
    xhr: any;
    constructor( loader: any ) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then( (file: any) => new Promise( ( resolve, reject ) => {
                this._initRequest();
                this._initListeners( resolve, reject, file );
                this._sendRequest( file );
            } ) );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }


    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open( 'POST', 'https://rimo-dev.rimo-saas.com/soap/ckupload_ticketing-client.php' ,true);
        xhr.responseType = 'json';
    }


    _initListeners( resolve: { (value: unknown): void; (arg0: { default: any; }): void; }, reject: { (reason?: any): void; (arg0: string | undefined): any; },file: { name: any; } ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${ file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
   
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }
            
            resolve( {
                default: response.url
            } );
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', (evt: { lengthComputable: any; total: any; loaded: any; }) => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest(file: string | Blob) {
        const data = new FormData();
        console.log(this.loader.file);
        data.append('upload', file );
    //csrf_token CSRF protection
        //data.append('csrf_token', requestToken);

        this.xhr.send( data );
    }
}