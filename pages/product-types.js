import Layout from '../components/layout';
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
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton
} from '@chakra-ui/react';

import { useState, useEffect, useRef } from 'react';
import { FaBuffer, FaMinusCircle, FaPencilAlt } from 'react-icons/fa';



export default function ProductTypes(){

    let content;

    const [ data, setData ] = useState(null);
    const [ isLoading, setLoading ] = useState(true);
    const { isOpen: isOpenNewType, onOpen: onOpenNewType, onClose: onCloseNewType } = useDisclosure();
    const { isOpen: isOpenEditType, onOpen: onOpenEditType, onClose: onCloseEditType } = useDisclosure();
    const { isOpen: isOpenDeleteType, onOpen: onOpenDeleteType, onClose: onCloseDeleteType } = useDisclosure();
    const cancelRef = useRef();
    const [ newType, setProdType ] = useState('');
    const [ editType, setEditType ] = useState(null);



    useEffect(() => {
        fetch('http://127.0.0.1:3000/product-types').then((res) => res.json()).then((data) => {
            setLoading(false);
            setData(data);
        });
    }, []);

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

        let product_types = data.map((type) => {
            return (
                <Tr key={type.id}>
                    <Td>{ type.id }</Td>
                    <Td>{ type.type_desc }</Td>
                    <Td><Button leftIcon={<FaPencilAlt />} colorScheme='yellow' variant='solid' onClick={ () => { editProductType(type) } } >Edit</Button><Button ml={5} leftIcon={<FaMinusCircle />} colorScheme='red' variant='solid' onClick={ () => { deleteProductType(type) } } >Delete</Button></Td>
                </Tr>
            );
        })


        content = (
            
            <>
              <Box m={5}>
                  <Button leftIcon={<FaBuffer />} colorScheme='teal' variant='solid' onClick={onOpenNewType}>Add</Button>
              </Box>
            <Modal isOpen={isOpenNewType} onClose={onCloseNewType}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>New Product Type</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Input placeholder='Description' value={ newType } onChange={ handleNewTypeChange } />
                    
                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={ saveProductType }>
                    Save
                    </Button>
                    <Button variant='ghost' mr={3} onClick={onCloseNewType}>
                    Close
                    </Button>
                    
                </ModalFooter>
                </ModalContent>
            </Modal>


            <Modal isOpen={isOpenEditType} onClose={onCloseEditType}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Product Type</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Input placeholder='Description' value={ editType?.type_desc ?? '' } onChange={ handleEditTypeChange } />
                    
                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={ handleSaveProductTypeChanges }>
                    Save Changes
                    </Button>
                    <Button variant='ghost' mr={3} onClick={onCloseEditType}>
                    Close
                    </Button>
                    
                </ModalFooter>
                </ModalContent>
            </Modal>


            <AlertDialog
        isOpen={isOpenDeleteType}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDeleteType}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Type
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDeleteType}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteProductType} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>



                <TableContainer>
                <Table variant='simple'>
                    <TableCaption></TableCaption>
                    <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Type Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>{ product_types }</Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Type Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Tfoot>
                </Table>
                </TableContainer>
            </>
        );
    }

    function handleNewTypeChange(e){
        setProdType(e.target.value);
    }

    function handleEditTypeChange(e){
        const updatedType = { ...editType, type_desc: e.target.value };
        setEditType(updatedType);
    }

    function editProductType(type){
        onOpenEditType();
        setEditType(type);
    }


    function deleteProductType(type){
        onOpenDeleteType();
        setEditType(type);
    }

    async function handleDeleteProductType(e){
        await fetch('http://127.0.0.1:3000/product-types', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editType)
        });

        onCloseDeleteType();
        setData(null);
        setLoading(true);

        fetch('http://127.0.0.1:3000/product-types').then((res) => res.json()).then((data) => {
            setLoading(false);
            setData(data);
        });        
    }


    async function handleSaveProductTypeChanges(e){
        await fetch('http://127.0.0.1:3000/product-types', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editType)
        });

        onCloseEditType();
        setData(null);
        setLoading(true);

        fetch('http://127.0.0.1:3000/product-types').then((res) => res.json()).then((data) => {
            setLoading(false);
            setData(data);
        });        
    }

    async function saveProductType(e){

        await fetch('http://127.0.0.1:3000/product-types', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type_desc: newType })
        });

        onCloseNewType();
        setData(null);
        setLoading(true);

        fetch('http://127.0.0.1:3000/product-types').then((res) => res.json()).then((data) => {
            setLoading(false);
            setData(data);
        });

              
    }





 
    





    return (
        <Layout title="Product Types">
            <Heading>Product Types</Heading>
            <Card m={8}>
            <CardBody>
                { content }
            </CardBody>
            </Card>
        </Layout>
    );
}