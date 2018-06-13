package in.meesho.processor.exceptions;

public class ProcessorException extends Exception {

    private static final int STATUS_CODE = 500;

    protected ErrorCode errorCode;
    protected String errorMessage;
    protected String extraInfo;
    protected Integer statusCode;

    public AdminException() {
        super();
    }

    public int getStatusCode() {
        if (statusCode == null) {
            return STATUS_CODE;
        }
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getExtraInfo() {
        return extraInfo;
    }

    public void setExtraInfo(String extraInfo) {
        this.extraInfo = extraInfo;
    }

    public ErrorCode getErrorCode() {
        if (errorCode == null) {
            return ErrorCode.UNKNOWN_SERVER_ERROR;
        }
        return errorCode;
    }
}
