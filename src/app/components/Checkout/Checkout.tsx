import React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { CartContext } from '../../contexts/Cart'

const CheckoutSchema = Yup.object().shape({
  firstName: Yup.string().required('Campo richiesto'),
  lastName: Yup.string().required('Campo richiesto'),
  email: Yup.string()
    .email('Ops! Non sembra una email!')
    .required('Campo richiesto'),
  address: Yup.string().required('Campo richiesto'),
  postcode: Yup.string().required('Campo richiesto'),
  countryCode: Yup.string().required('Campo richiesto'),
})

export default function Checkout() {
  const delay: any = (ms: number) => new Promise((res) => setTimeout(res, ms))
  const [state] = React.useContext(CartContext)
  const toast = useToast()
  return (
    <Box maxW="700px" mx="auto">
      <Text as="h1" fontSize="30px" fontWeight="bold" my={5} textAlign="center">
        Checkout
      </Text>
      <Text as="h2" fontSize="20px" fontWeight="bold" my={2}>
        Inserisci i tuoi dati
      </Text>
      <Formik
        initialValues={{
          firstName: 'Antonino',
          lastName: 'Cannistraci',
          email: 'nino@nino.com',
          address: 'Via Nino 33',
          postcode: '22333',
          countryCode: 'IT',
        }}
        validationSchema={CheckoutSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios.post('/api/order', {
            userData: values,
            cart: state,
          })
          if (response.data.checkoutUrl) {
            toast({
              title: 'Ordine elaborato',
              description: 'Verrai reindirizzato su Scalapay per pagare',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          }
          console.log(response.data)
          await delay(9000)
          window.location.href = response.data.checkoutUrl
          setSubmitting(false)
        }}
      >
        {({ values, errors, touched, isSubmitting, handleChange }) => (
          <Form>
            <FormControl
              isInvalid={!!errors.firstName && touched.firstName}
              my={2}
            >
              <FormLabel htmlFor="firstName">Nome</FormLabel>
              <Input
                id="firstName"
                type="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
              {errors.firstName && touched.firstName ? (
                <Box color="#E53E3E">{errors.firstName}</Box>
              ) : null}
            </FormControl>
            <FormControl
              isInvalid={!!errors.lastName && touched.lastName}
              my={2}
            >
              <FormLabel htmlFor="firstName">Cognome</FormLabel>
              <Input
                id="lastName"
                type="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
              {errors.lastName && touched.lastName ? (
                <Box color="#E53E3E">{errors.lastName}</Box>
              ) : null}
            </FormControl>
            <FormControl isInvalid={!!errors.email && touched.email} my={2}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email ? (
                <Box color="#E53E3E">{errors.email}</Box>
              ) : null}
            </FormControl>
            <FormControl my={2}>
              <FormLabel htmlFor="countryCode">Paese</FormLabel>
              <Select id="countryCode" value={values.countryCode}>
                <option>Seleziona paese</option>
                <option value="IT" selected>
                  Italia
                </option>
              </Select>
            </FormControl>
            <FormControl isInvalid={!!errors.address && touched.address} my={2}>
              <FormLabel htmlFor="address">Indirizzo</FormLabel>
              <Input
                id="address"
                type="address"
                value={values.address}
                onChange={handleChange}
              />
              {errors.address && touched.address ? (
                <Box color="#E53E3E">{errors.address}</Box>
              ) : null}
            </FormControl>
            <FormControl
              isInvalid={!!errors.postcode && touched.postcode}
              my={2}
            >
              <FormLabel htmlFor="postcode">Codice Postale</FormLabel>
              <Input
                id="postcode"
                type="postcode"
                value={values.postcode}
                onChange={handleChange}
              />
              {errors.postcode && touched.postcode ? (
                <Box color="#E53E3E">{errors.postcode}</Box>
              ) : null}
            </FormControl>
            <Text as="h2" fontSize="20px" fontWeight="bold" my={2}>
              Metodo di pagamento
            </Text>
            <Text>Scalapay</Text>
            <Box mt={4}>
              <Text fontSize="1.2rem" fontWeight="bold">
                TOTALE € {state.total / 100}
              </Text>
            </Box>
            <Box
              dangerouslySetInnerHTML={{
                __html: `<scalapay-widget locale="it" amount="${
                  state.total / 100
                }"></scalapay-widget>`,
              }}
            ></Box>
            <Button my={5} type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : `Paga Ora`}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
