import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Link,
  ButtonGroup,
} from '@chakra-ui/react'
import React from 'react'
import { CartContext } from '../../contexts/Cart'
import { Link as BrowserLink } from 'react-router-dom'

export default function Cart() {
  const [state, dispatch] = React.useContext(CartContext)
  return (
    <>
      <Text as="h1" textAlign="center" fontSize="30px" my={5}>
        Carrello
      </Text>

      <Flex justifyContent="center" flexDirection="column">
        {state.items.map((productWithQuantity, index) => {
          return (
            <Flex
              key={index}
              flexDirection={{ base: 'column', sm: 'row' }}
              mx="auto"
            >
              <Box display="block">
                <Image
                  rounded={'md'}
                  alt={productWithQuantity.product.name}
                  src={productWithQuantity.product.image}
                  fit={'cover'}
                  w={{ base: '300px' }}
                  align={'right'}
                  h={{ base: '200px' }}
                  maxW="400px"
                />
              </Box>
              <Box p={2} textAlign="left">
                <Text as="h2" fontSize="1.2rem" fontWeight="bold" my={5}>
                  {productWithQuantity.product.name}
                </Text>
                <Box py={5}>
                  <Box>
                    <Text>€ {productWithQuantity.product.price / 100}</Text>
                  </Box>
                  <ButtonGroup
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box>
                      <Text fontWeight={'bold'}>
                        {productWithQuantity.quantity}
                      </Text>
                    </Box>
                    <Button
                      my={5}
                      onClick={() => {
                        dispatch({
                          type: 'remove_item',
                          product: productWithQuantity.product,
                        })
                      }}
                    >
                      -
                    </Button>
                    <Button
                      my={5}
                      onClick={() => {
                        dispatch({
                          type: 'add_item',
                          product: productWithQuantity.product,
                        })
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Box>
              </Box>
            </Flex>
          )
        })}
        <Box mx="auto" my={5}>
          <Box>
            <Text fontSize="1.2rem" fontWeight="bold">
              TOTALE €{' '}
              <Text as="span" className="total">
                {state.total / 100}
              </Text>
            </Text>
          </Box>
          <Box
            dangerouslySetInnerHTML={{
              __html: `<scalapay-widget locale="it" amount="${
                state.total / 100
              }"></scalapay-widget>`,
            }}
          ></Box>
          <Link as={BrowserLink} to="/checkout">
            <Button
              name="continue"
              my={5}
              variant="solid"
              disabled={state.total === 0}
            >
              PROCEDI
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  )
}
