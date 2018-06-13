package in.meesho.processor.service;

import in.meesho.processor.exceptions.MailNotSentException;
import in.meesho.processor.pojo.OrderDetails;

public class MailService {

    public void sendEmail(OrderDetails orderDetails) throws MailNotSentException {
        //send email using SES
    }

    public void sendEmailWithAttachment(OrderDetails orderDetails) throws MailNotSentException{
        //send email attached;
    }

    public void pushToMailServiceQueue(String invoiceFileUrl, String orderId){
        //push to mail service queue
    }

}
