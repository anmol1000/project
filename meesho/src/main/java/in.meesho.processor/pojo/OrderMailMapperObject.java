package in.meesho.processor.pojo;

import in.meesho.processor.enums.MailServiceStates;

public class OrderMailMapperObject {

    private String invoiceFileUrl;
    private String message;
    private String mailId;
    private String orderId;
    private Long createdTs;
    private MailServiceStates state;

    public String getInvoiceFileUrl() {
        return invoiceFileUrl;
    }

    public void setInvoiceFileUrl(String invoiceFileUrl) {
        this.invoiceFileUrl = invoiceFileUrl;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMailId() {
        return mailId;
    }

    public void setMailId(String mailId) {
        this.mailId = mailId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public Long getCreatedTs() {
        return createdTs;
    }

    public void setCreatedTs(Long createdTs) {
        this.createdTs = createdTs;
    }

    public MailServiceStates getState() {
        return state;
    }

    public void setState(MailServiceStates state) {
        this.state = state;
    }
}
