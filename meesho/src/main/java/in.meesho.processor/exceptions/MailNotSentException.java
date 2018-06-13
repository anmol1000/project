package in.meesho.processor.exceptions;

import in.meesho.processor.error.ErrorCode;

public class MailNotSentException extends ProcessorException {
    private static final int STATUS_CODE = 500;

    public MailNotSentException(){
        super();
        this.statusCode  = STATUS_CODE;
        this.errorCode = ErrorCode.ENTRY_NOT_FOUND;
    }

    public MailNotSentException(String errorMessage){
        super();
        this.statusCode = STATUS_CODE;
        this.errorCode = ErrorCode.ENTRY_NOT_FOUND;
        this.errorMessage = errorMessage;
    }
}