package in.meesho.processor.workers;

import in.meesho.processor.dao.OrderInvoiceDao;
import in.meesho.processor.enums.InvoiceServiceStates;
import in.meesho.processor.exceptions.EntryNotFoundException;
import in.meesho.processor.pojo.InvoiceOrderMapperObject;
import in.meesho.processor.service.InvoiceService;
import in.meesho.processor.service.MailService;

public class InvoiceWorkerHandler {


    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private OrderInvoiceDao orderInvoiceDao;

    @Autowired
    private MailService mailService;

    public void processRecord (InvoiceOrderMapperObject invoiceObject) throws EntryNotFoundException {
        String orderId = invoiceObject.getOrderId();
        if (orderInvoiceDao.checkOrderEntryForInvoice(orderId)){
            String invoiceUrl = invoiceService.generateInvoice(orderId);
            orderInvoiceDao.updateState(orderId,InvoiceServiceStates.INVOICE_GENERATED);
            if (invoiceObject.getSendEmail()){
                mailService.pushToMailServiceQueue(invoiceUrl, orderId);
            }
        } else {
            throw new EntryNotFoundException("Valid entry not found corresponding to requested invoice order");
        }
    }
}
