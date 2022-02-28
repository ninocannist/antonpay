import { Box, Image, Text, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../contexts/Cart'
import { products } from '../Products/products-list'

type ProductPageParams = { productSlug: string }

export default function ProductPage() {
  const { productSlug } = useParams<ProductPageParams>()
  const [product] = products.filter((product) => {
    return product.slug === productSlug
  })
  const [state, dispatch] = React.useContext(CartContext)

  return (
    <Box my={10} maxW="800px" mx="auto">
      <Flex flexDirection={{ base: 'column', sm: 'row' }}>
        <Box w={{ base: '100%' }} display="block">
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
          <Text as="h1" fontSize="2rem" fontWeight="bold" my={5}>
            {product.name}
          </Text>
          <Box>
            <Text>{product.description}</Text>
          </Box>
          <Box py={5}>
            <Box>
              <Text>€ {product.price / 100}</Text>
              <Box
                dangerouslySetInnerHTML={{
                  __html: `<scalapay-widget locale="it" amount="${
                    product.price / 100
                  }"></scalapay-widget>`,
                }}
              ></Box>
            </Box>
            <Button
              my={5}
              onClick={() => {
                dispatch({ type: 'add_item', product: product })
              }}
            >
              Aggiungi al carrello
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
