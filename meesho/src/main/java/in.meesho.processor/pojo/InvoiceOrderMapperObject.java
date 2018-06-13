package in.meesho.processor.pojo;

import in.meesho.processor.enums.InvoiceServiceStates;

public class InvoiceOrderMapperObject {
    private Boolean sendSms;
    private Boolean sendEmail;
    private String invoiceId;
    private String orderId;
    private Long createdTs;
    private InvoiceServiceStates state;

    public Boolean getSendSms() {
        return sendSms;
    }

    public void setSendSms(Boolean sendSms) {
        this.sendSms = sendSms;
    }

    public Boolean getSendEmail() {
        return sendEmail;
    }

    public void setSendEmail(Boolean sendEmail) {
        this.sendEmail = sendEmail;
    }

    public String getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
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

    public InvoiceServiceStates getState() {
        return state;
    }

    public void setState(InvoiceServiceStates state) {
        this.state = state;
    }
}
