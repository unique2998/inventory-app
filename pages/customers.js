import Layout from '../components/layout';
import NewCustomer from '../components/new-customer';
import EditCustomer from '../components/edit-customer';
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

import { useState, useRef } from 'react';
import { FaBuffer, FaMinusCircle, FaPencilAlt } from 'react-icons/fa';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Customers(){

    let content;

    const { data, error, isLoading, mutate } = useSWR('http://127.0.0.1:3000/customers', fetcher);
    const { isOpen: isOpenNewCustomer, onOpen: onOpenNewCustomer, onClose: onCloseNewCustomer } = useDisclosure();
    const { isOpen: isOpenEditCustomer, onOpen: onOpenEditCustomer, onClose: onCloseEditCustomer } = useDisclosure();
    const { isOpen: isOpenDeleteCustomer, onOpen: onOpenDeleteCustomer, onClose: onCloseDeleteCustomer } = useDisclosure();
    const [currentCustomer, setCurrentCustomer] = useState({
        id : "-1",
        firstname : "",
        lastname : "",
        address : "",
        loyalty_card_number : ""
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

        let customers = data.map((customer) => {
            return (
                <Tr key={customer.id}>
                    <Td>{ customer.id }</Td>
                    <Td>{ customer.lastname }</Td>
                    <Td>{ customer.firstname }</Td>
                    <Td>{ customer.address }</Td>
                    <Td>{ customer.loyalty_card_number }</Td>
                    <Td><Button leftIcon={<FaPencilAlt />} colorScheme='yellow' variant='solid' onClick={ () => { editCustomer(customer) } } >Edit</Button><Button ml={5} leftIcon={<FaMinusCircle />} colorScheme='red' variant='solid' onClick={ () => { deleteCustomer(customer) } } >Delete</Button></Td>
                </Tr>
            );
        })


        content = (
            <>

              <NewCustomer isOpen={isOpenNewCustomer} onClose={onCloseNewCustomer} data={data} mutate={mutate} />
              <EditCustomer isOpen={isOpenEditCustomer} onClose={onCloseEditCustomer} data={data} mutate={mutate} currentCustomer={currentCustomer} setCurrentCustomer={setCurrentCustomer} />
              <AlertDialog
                    isOpen={isOpenDeleteCustomer}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseDeleteCustomer}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCloseDeleteCustomer}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={handleDeleteCustomer} ml={3}>
                            Delete
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>            
              
              <Box m={5}>
                  <Button leftIcon={<FaBuffer />} colorScheme='teal' variant='solid' onClick={ handleAddNewCustomer }>Add</Button>
              </Box>
 
                <TableContainer>
                <Table variant='simple'>
                    <TableCaption></TableCaption>
                    <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Last Name</Th>
                        <Th>First Name</Th>
                        <Th>Address</Th>
                        <Th>Loyalty ID</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>{ customers }</Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Last Name</Th>
                        <Th>First Name</Th>
                        <Th>Address</Th>
                        <Th>Loyalty ID</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Tfoot>
                </Table>
                </TableContainer>
            </>
        );
    }

    function handleAddNewCustomer(e){
        onOpenNewCustomer();
    }


    function editCustomer(customer){
        setCurrentCustomer(customer);
        onOpenEditCustomer();
    }


    function deleteCustomer(customer){
        onOpenDeleteCustomer();
        setCurrentCustomer(customer);
    }


    async function handleDeleteCustomer(e){
        await fetch('http://127.0.0.1:3000/customers', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentCustomer)
        });

        onCloseDeleteCustomer();
        mutate(data);        
    }





 
    





    return (
        <Layout title="Customers">
            <Heading>List of Customers</Heading>
            <Card m={8}>
            <CardBody>
                { content }
            </CardBody>
            </Card>
        </Layout>
    );
}

