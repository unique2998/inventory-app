import Head from "next/head";
import Link from "next/link";
import style from "./layout.module.css";
import { 
    Heading, 
    Box, 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Menu,
    MenuList,
    MenuItem 
} from '@chakra-ui/react';

import { FaChartBar, FaBox, FaDna, FaUserTag, FaDollyFlatbed, FaShoppingCart } from 'react-icons/fa';

export default function Layout({ children, title }){
    return(
        <>
        <Head>
            <title>{ `${title} - Inventory System` }</title>
        </Head>

        <header>
            <Box boxShadow='md' p={15}>
                <Heading size='2xl'>Inventory System</Heading>
                
            </Box>
        </header>

        <Box  display='flex' height='1000px'>
        <Box width='20%'  height='100%' p={15} overflowY='scroll'>
            <Link  href="/">
                <Box p={5} display='flex' cursor="pointer">
                    <FaChartBar size='2em' />
                    <Box ml={10} fontSize='lg'>Dashboard</Box>
                </Box>
            </Link>
            <Link  href="/products" >
                <Box p={5} display='flex' cursor="pointer">
                    <FaBox size='2em' />
                    <Box ml={10} fontSize='lg'>Products</Box>
                </Box>
            </Link>
            <Link  href="/product-types" >
                <Box p={5} display='flex' cursor="pointer">
                    <FaDna size='2em' />
                    <Box ml={10} fontSize='lg'>Product Types</Box>
                </Box>
            </Link>
            <Link  href="/suppliers" >
                <Box p={5} display='flex' cursor="pointer">
                    <FaDollyFlatbed size='2em' />
                    <Box ml={10} fontSize='lg'>Suppliers</Box>
                </Box>
            </Link>
            <Link  href="/stocks" >
                <Box p={5} display='flex' cursor="pointer">
                    <FaDollyFlatbed size='2em' />
                    <Box ml={10} fontSize='lg'>Receiving</Box>
                </Box>
            </Link>

            <Link  href="/sales" >
                <Box p={5} display='flex' cursor="pointer">
                    <FaShoppingCart size='2em' />
                    <Box ml={10} fontSize='lg'>Sales</Box>
                </Box>
            </Link>
            <Link  href="/customers" >
                <Box p={5} display='flex' cursor="pointer">
                    <FaUserTag size='2em' />
                    <Box ml={10} fontSize='lg'>Customers</Box>
                </Box>
            </Link>
            
            
        </Box>

        <Box width='80%' p={20}>{children}</Box>
        
        </Box>
        



            
        
        </>
    );
}