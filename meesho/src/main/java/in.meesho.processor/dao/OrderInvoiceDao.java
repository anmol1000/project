package in.meesho.processor.dao;

import in.meesho.processor.enums.InvoiceServiceStates;
import in.meesho.processor.enums.MailServiceStates;

public class OrderInvoiceDao {
    public void updateState(String orderId, InvoiceServiceStates state);
    public Boolean checkOrderEntryForInvoice(String orderId);
}
