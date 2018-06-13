package in.meesho.processor.dao;

import in.meesho.processor.enums.MailServiceStates;
import in.meesho.processor.pojo.OrderMailMapperObject;

public class OrderMailDao {

    public Boolean validatePreInvoiceState(String orderId);
    public void updateState(String orderId, MailServiceStates state);
    public void persistMailEntry(OrderMailMapperObject orderMailMapperObject);
    public Boolean validatePreInvoiceEntry(String orderId);
}