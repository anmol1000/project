package in.meesho.processor.exceptions;

import in.meesho.processor.error.ErrorCode;

public class EntryNotFoundException extends ProcessorException {

    private static final int STATUS_CODE = 400;

    public EntryNotFoundException(){
        super();
        this.statusCode  = STATUS_CODE;
        this.errorCode = ErrorCode.ENTRY_NOT_FOUND;
    }

    public EntryNotFoundException(String errorMessage){
        super();
        this.statusCode = STATUS_CODE;
        this.errorCode = ErrorCode.ENTRY_NOT_FOUND;
        this.errorMessage = errorMessage;
    }
}
