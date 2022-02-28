import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import Products from '../Products/Products'

export default function Home() {
  return (
    <>
      <Box>
        <Text fontSize="2rem" fontWeight="bold" my={5}>
          I nostri prodotti
        </Text>
        <Products />
      </Box>
    </>
  )
}
