//components
import {
  Document,
  Page,
  Text as PdfText,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

//types
import { FC } from 'react';
import { MyOrder } from '@appTypes/order';

interface Props {
  order: MyOrder;
}

const Invoice: FC<Props> = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body} size="A4">
        <PdfText style={styles.header} fixed>
          {new Date().toLocaleString()}
        </PdfText>
        <PdfText style={styles.title}>Shubham Store</PdfText>
        <PdfText style={styles.subtitle}>Order Invoice</PdfText>
        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={p => p.product.name} />
            <DataTableCell getContent={p => p.product.price} />
            <DataTableCell getContent={p => p.count} />
            <DataTableCell getContent={p => p.product.price * p.count} />
          </TableBody>
        </Table>

        <PdfText style={styles.text}>
          Ordered On: {new Date(order.createdAt).toUTCString()}
        </PdfText>
        <PdfText style={styles.text}>Order Id: {order._id}</PdfText>
        <PdfText style={styles.text}>Order Status: {order.orderStatus}</PdfText>
        <PdfText style={styles.text}>
          Total Paid: {order.paymentIntent.amount / 100}
        </PdfText>

        <PdfText style={styles.footer}>
          All rights reserved @ShubhamStore
        </PdfText>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export default Invoice;
