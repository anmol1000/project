package in.meesho.processor.workers;

import in.meesho.processor.pojo.InvoiceOrderMapperObject;

public class InvoiceWorkerHandler {


    public void processRecord (InvoiceOrderMapperObject invoiceObject){

        //check validity
        //Generate Invoice
        //update state
        //insert into mailservice queue
    }
}
