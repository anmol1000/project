package in.meesho.processor.pojo;

import in.meesho.processor.enums.InvoiceServiceStates;

public class InvoiceOrderMapperObject {
    private String invoiceId;
    private String orderId;
    private long createdTs;
    private InvoiceServiceStates state;

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

    public long getCreatedTs() {
        return createdTs;
    }

    public void setCreatedTs(long createdTs) {
        this.createdTs = createdTs;
    }

    public InvoiceServiceStates getState() {
        return state;
    }

    public void setState(InvoiceServiceStates state) {
        this.state = state;
    }
}
