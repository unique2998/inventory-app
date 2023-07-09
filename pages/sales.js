import Layout from '../components/layout';
import NewSale from '../components/new-sale';
import EditSale from '../components/edit-sale';
import { 
    Heading, 
    Box, 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Skeleton, 
    Stack,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter, 
    Select,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter
    
} from '@chakra-ui/react';

import { useState, useEffect, useRef } from 'react';
import { FaBuffer, FaMinusCircle, FaPencilAlt } from 'react-icons/fa';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Sales(){

    let content;

    const { data, error, isLoading, mutate } = useSWR('http://127.0.0.1:3000/sales', fetcher);
    const { isOpen: isOpenNewSale, onOpen: onOpenNewSale, onClose: onCloseNewSale } = useDisclosure();
    const { isOpen: isOpenEditSale, onOpen: onOpenEditSale, onClose: onCloseEditSale } = useDisclosure();
    const { isOpen: isOpenDeleteSale, onOpen: onOpenDeleteSale, onClose: onCloseDeleteSale } = useDisclosure();
    const [currentSale, setCurrentSale] = useState({
        id : "-1",
        product_id : "",
        qty : "",
        customer_id : ""
    });
    const cancelRef = useRef();
    

    


    if(isLoading){
        content = (
            <Stack>
                <Skeleton height='30px' />
                <Skeleton height='30px' />
                <Skeleton height='30px' />
                <Skeleton height='30px' />
                <Skeleton height='30px' />
            </Stack>
        );
    }

    if(data){

        let sales = data.map((sl) => {
            return (
                <Tr key={sl.id}>
                    <Td>{ sl.prod_desc }</Td>
                    <Td>{ sl.customer }</Td>
                    <Td>{ sl.retail_price }</Td>
                    <Td>×{ sl.qty }</Td>
                    <Td>{ sl.total_amount }</Td>
                    <Td>{ sl.timestamp }</Td>
                    <Td><Button leftIcon={<FaPencilAlt />} colorScheme='yellow' variant='solid' onClick={ () => { editSale(sl) } } >Edit</Button><Button ml={5} leftIcon={<FaMinusCircle />} colorScheme='red' variant='solid' onClick={ () => { deleteSale(sl) } } >Delete</Button></Td>
                </Tr>
            );
        })


        content = (
            <>

              <NewSale isOpen={isOpenNewSale} onClose={onCloseNewSale} data={data} mutate={mutate} />
              <EditSale isOpen={isOpenEditSale} onClose={onCloseEditSale} data={data} mutate={mutate} currentSale={currentSale} setCurrentSale={setCurrentSale} />
              <AlertDialog
                    isOpen={isOpenDeleteSale}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseDeleteSale}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Sale
                        </AlertDialogHeader>

                        <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCloseDeleteSale}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={handleDeleteSale} ml={3}>
                            Delete
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>            
              
              <Box m={5}>
                  <Button leftIcon={<FaBuffer />} colorScheme='teal' variant='solid' onClick={ handleAddNewSale }>Add</Button>
              </Box>
 
                <TableContainer>
                <Table variant='simple'>
                    <TableCaption></TableCaption>
                    <Thead>
                    <Tr>
                        
                       
                        <Th>Product</Th>
                        <Th>Customer</Th>
                        <Th>Retail Price</Th>
                        <Th>Quantity</Th>
                        <Th>Total Amount</Th>
                        <Th>Date</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>{ sales }</Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Customer</Th>
                        <Th>Retail Price</Th>
                        <Th>Quantity</Th>
                        <Th>Total Amount</Th>
                        <Th>Date</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Tfoot>
                </Table>
                </TableContainer>
            </>
        );
    }

    function handleAddNewSale(e){
        onOpenNewSale();
    }


    function editSale(sl){
        setCurrentSale(sl);
        onOpenEditSale();
    }


    function deleteSale(sl){
        onOpenDeleteSale();
        setCurrentSale(sl);
    }


    async function handleDeleteSale(e){
        await fetch('http://127.0.0.1:3000/sales', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentSale)
        });

        onCloseDeleteSale();
        mutate(data);        
    }





 
    





    return (
        <Layout title="Sales">
            <Heading>Sales Transaction</Heading>
            <Card m={8}>
            <CardBody>
                { content }
            </CardBody>
            </Card>
        </Layout>
    );
}

