import { Box, Button, Flex, Image, Text, Link } from '@chakra-ui/react'
import React from 'react'
import { Product as ProductType } from '../Products/products-list'
import { Link as BrowserLink } from 'react-router-dom'

interface ProductProps {
  product: ProductType
}

function Product({ product }: ProductProps) {
  return (
    <Box p={5} my={10} maxW="800px" mx="auto">
      <Text as="h2" fontSize="1.7rem" m={3}>
        {product.name}
      </Text>
      <Flex flexDirection={{ base: 'column', sm: 'row' }}>
        <Box w={{ base: '100%' }}>
          <Image
            rounded={'md'}
            alt={product.name}
            src={product.image}
            fit={'cover'}
            align={'right'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
            maxW="400px"
          />
        </Box>
        <Box p={2} textAlign="left">
          <Box>
            <Text>{product.description}</Text>
          </Box>
          <Link as={BrowserLink} to={`/prodotti/${product.slug}`}>
            <Button>Visualizza</Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  )
}

export default Product
