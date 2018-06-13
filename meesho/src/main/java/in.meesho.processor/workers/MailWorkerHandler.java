package in.meesho.processor.workers;

import in.meesho.processor.dao.OrderDao;
import in.meesho.processor.dao.OrderMailDao;
import in.meesho.processor.enums.MailServiceStates;
import in.meesho.processor.exceptions.DuplicateEntryException;
import in.meesho.processor.exceptions.EntryNotFoundException;
import in.meesho.processor.exceptions.MailNotSentException;
import in.meesho.processor.exceptions.ProcessorException;
import in.meesho.processor.pojo.OrderDetails;
import in.meesho.processor.pojo.OrderMailMapperObject;
import in.meesho.processor.service.MailService;

import java.util.logging.Logger;


public class MailWorkerHandler {

    private static final Logger logger = LoggerFactory.getLogger(MailWorkerHandler.class);

    @Autowired
    private MailService mailService;

    @Autowired
    private OrderMailDao orderMailDao;

    @Autowired
    private OrderDao orderDao;

    public void processRecord (OrderMailMapperObject mailMapperObject) throws ProcessorException {

        if (mailMapperObject.getInvoiceFileUrl() == null){
            processPreInvoiceMail(mailMapperObject);
        }
        else{
            processInvoiceMail(mailMapperObject);
        }
    }

    private void processPreInvoiceMail(OrderMailMapperObject mailMapperObject) throws DuplicateEntryException {
        String orderId = mailMapperObject.getOrderId();
        if (orderMailDao.validatePreInvoiceEntry(orderId)){
            OrderDetails orderDetails = orderDao.getOrderDetails(orderId);
            orderMailDao.persistMailEntry(mailMapperObject);
            mailService.sendEmail(orderDetails);
            orderMailDao.updateState(orderId,MailServiceStates.PROCESSING_MAIL_SENT);
        }else{
            throw new DuplicateEntryException("Entry already present corresponding to given Order Id");
        }
    }

    private void processInvoiceMail(OrderMailMapperObject mailMapperObject) throws MailNotSentException, EntryNotFoundException {

        String orderId = mailMapperObject.getOrderId();

        if (orderMailDao.validatePreInvoiceState(orderId)){
            OrderDetails orderDetails = orderDao.getOrderDetails(orderId);
            mailService.sendEmailWithAttachment(orderDetails);
            orderMailDao.updateState(orderId, MailServiceStates.INVOICE_MAIL_SENT);
        }else{
            throw new EntryNotFoundException("Entry not found corresponding to ");
        }

    }
}
