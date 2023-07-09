import Layout from '../components/layout';
import NewSupplier from '../components/new-supplier';
import EditSupplier from '../components/edit-supplier';
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

    const { data, error, isLoading, mutate } = useSWR('http://127.0.0.1:3000/suppliers', fetcher);
    const { isOpen: isOpenNewSupplier, onOpen: onOpenNewSupplier, onClose: onCloseNewSupplier } = useDisclosure();
    const { isOpen: isOpenEditSupplier, onOpen: onOpenEditSupplier, onClose: onCloseEditSupplier } = useDisclosure();
    const { isOpen: isOpenDeleteSupplier, onOpen: onOpenDeleteSupplier, onClose: onCloseDeleteSupplier } = useDisclosure();
    const [currentSupplier, setCurrentSupplier] = useState({
        id : "-1",
        supplier : "",
        address : ""
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

        let suppliers = data.map((supplier) => {
            return (
                <Tr key={supplier.id}>
                    <Td>{ supplier.id }</Td>
                    <Td>{ supplier.supplier }</Td>
                    <Td>{ supplier.address }</Td>
                    <Td><Button leftIcon={<FaPencilAlt />} colorScheme='yellow' variant='solid' onClick={ () => { editSupplier(supplier) } } >Edit</Button><Button ml={5} leftIcon={<FaMinusCircle />} colorScheme='red' variant='solid' onClick={ () => { deleteSupplier(supplier) } } >Delete</Button></Td>
                </Tr>
            );
        })


        content = (
            <>

              <NewSupplier isOpen={isOpenNewSupplier} onClose={onCloseNewSupplier} data={data} mutate={mutate} />
              <EditSupplier isOpen={isOpenEditSupplier} onClose={onCloseEditSupplier} data={data} mutate={mutate} currentSupplier={currentSupplier} setCurrentSupplier={setCurrentSupplier} />
              <AlertDialog
                    isOpen={isOpenDeleteSupplier}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseDeleteSupplier}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Supplier
                        </AlertDialogHeader>

                        <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCloseDeleteSupplier}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={handleDeleteSupplier} ml={3}>
                            Delete
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>            
              
              <Box m={5}>
                  <Button leftIcon={<FaBuffer />} colorScheme='teal' variant='solid' onClick={ handleAddNewProduct }>Add</Button>
              </Box>
 
                <TableContainer>
                <Table variant='simple'>
                    <TableCaption></TableCaption>
                    <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Supplier</Th>
                        <Th>Address</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>{ suppliers }</Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Supplier</Th>
                        <Th>Address</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Tfoot>
                </Table>
                </TableContainer>
            </>
        );
    }

    function handleAddNewProduct(e){
        onOpenNewSupplier();
    }


    function editSupplier(supplier){
        setCurrentSupplier(supplier);
        onOpenEditSupplier();
    }


    function deleteSupplier(supplier){
        onOpenDeleteSupplier();
        setCurrentSupplier(supplier);
    }


    async function handleDeleteSupplier(e){
        await fetch('http://127.0.0.1:3000/suppliers', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentSupplier)
        });

        onCloseDeleteSupplier();
        mutate(data);        
    }





 
    





    return (
        <Layout title="Suppliers">
            <Heading>List of Suppliers</Heading>
            <Card m={8}>
            <CardBody>
                { content }
            </CardBody>
            </Card>
        </Layout>
    );
}

