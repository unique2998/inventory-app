import Layout from '../components/layout';
import NewStock from '../components/new-stock';
import EditStock from '../components/edit-stock';
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

export default function Suppliers(){

    let content;

    const { data, error, isLoading, mutate } = useSWR('http://127.0.0.1:3000/stocks', fetcher);
    const { isOpen: isOpenNewStock, onOpen: onOpenNewStock, onClose: onCloseNewStock } = useDisclosure();
    const { isOpen: isOpenEditStock, onOpen: onOpenEditStock, onClose: onCloseEditStock } = useDisclosure();
    const { isOpen: isOpenDeleteStock, onOpen: onOpenDeleteStock, onClose: onCloseDeleteStock } = useDisclosure();
    const [currentStock, setCurrentStock] = useState({
        id : "-1",
        product_id : "",
        remarks : "",
        qty : "",
        supplier_id : ""
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

        let stocks = data.map((stock) => {
            return (
                <Tr key={stock.id}>
                    <Td>{ stock.date_imported }</Td>
                    <Td>{ stock.prod_desc }</Td>
                    <Td>{ stock.remarks }</Td>
                    <Td>{ stock.qty }</Td>
                    <Td>{ stock.supplier }</Td>
                    <Td><Button leftIcon={<FaPencilAlt />} colorScheme='yellow' variant='solid' onClick={ () => { editStock(stock) } } >Edit</Button><Button ml={5} leftIcon={<FaMinusCircle />} colorScheme='red' variant='solid' onClick={ () => { deleteStock(stock) } } >Delete</Button></Td>
                </Tr>
            );
        })


        content = (
            <>

              <NewStock isOpen={isOpenNewStock} onClose={onCloseNewStock} data={data} mutate={mutate} />
              <EditStock isOpen={isOpenEditStock} onClose={onCloseEditStock} data={data} mutate={mutate} currentStock={currentStock} setCurrentStock={setCurrentStock} />
              <AlertDialog
                    isOpen={isOpenDeleteStock}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseDeleteStock}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Stock
                        </AlertDialogHeader>

                        <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCloseDeleteStock}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={handleDeleteStock} ml={3}>
                            Delete
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>            
              
              <Box m={5}>
                  <Button leftIcon={<FaBuffer />} colorScheme='teal' variant='solid' onClick={ handleAddNewStock }>Add</Button>
              </Box>
 
                <TableContainer>
                <Table variant='simple'>
                    <TableCaption></TableCaption>
                    <Thead>
                    <Tr>
                        
                        <Th>Date Imported</Th>
                        <Th>Product</Th>
                        <Th>Remarks</Th>
                        <Th>Quantity</Th>
                        <Th>Supplier</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>{ stocks }</Tbody>
                    <Tfoot>
                    <Tr>
                    <Th>Date Imported</Th>
                        <Th>Product</Th>
                        <Th>Remarks</Th>
                        <Th>Quantity</Th>
                        <Th>Supplier</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Tfoot>
                </Table>
                </TableContainer>
            </>
        );
    }

    function handleAddNewStock(e){
        onOpenNewStock();
    }


    function editStock(stock){
        setCurrentStock(stock);
        onOpenEditStock();
    }


    function deleteStock(stock){
        onOpenDeleteStock();
        setCurrentStock(stock);
    }


    async function handleDeleteStock(e){
        await fetch('http://127.0.0.1:3000/stocks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentStock)
        });

        onCloseDeleteStock();
        mutate(data);        
    }





 
    





    return (
        <Layout title="Stocks">
            <Heading>Stocks Receiving</Heading>
            <Card m={8}>
            <CardBody>
                { content }
            </CardBody>
            </Card>
        </Layout>
    );
}

