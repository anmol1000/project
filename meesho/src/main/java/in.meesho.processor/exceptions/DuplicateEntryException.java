package in.meesho.processor.exceptions;

import in.meesho.processor.error.ErrorCode;

public class DuplicateEntryException extends ProcessorException {

    private static final int STATUS_CODE = 400;

    public DuplicateEntryException(){
        super();
        this.statusCode  = STATUS_CODE;
        this.errorCode = ErrorCode.DUPLICATE_ENTRY;
    }

    public EntryNotFoundException(String errorMessage){
        super();
        this.statusCode = STATUS_CODE;
        this.errorCode = ErrorCode.DUPLICATE_ENTRY;
        this.errorMessage = errorMessage;
    }
}
