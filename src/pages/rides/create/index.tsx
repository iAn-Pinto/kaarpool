import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createRide } from 'apiSdk/rides';
import { rideValidationSchema } from 'validationSchema/rides';
import { CarInterface } from 'interfaces/car';
import { getCars } from 'apiSdk/cars';
import { RideInterface } from 'interfaces/ride';

function RideCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RideInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRide(values);
      resetForm();
      router.push('/rides');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RideInterface>({
    initialValues: {
      start_location: '',
      end_location: '',
      start_time: new Date(new Date().toDateString()),
      end_time: new Date(new Date().toDateString()),
      seats_available: 0,
      car_id: (router.query.car_id as string) ?? null,
    },
    validationSchema: rideValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Rides',
              link: '/rides',
            },
            {
              label: 'Create Ride',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Ride
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.start_location}
            label={'Start Location'}
            props={{
              name: 'start_location',
              placeholder: 'Start Location',
              value: formik.values?.start_location,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.end_location}
            label={'End Location'}
            props={{
              name: 'end_location',
              placeholder: 'End Location',
              value: formik.values?.end_location,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="start_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Start Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
              onChange={(value: Date) => formik.setFieldValue('start_time', value)}
            />
          </FormControl>
          <FormControl id="end_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              End Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
              onChange={(value: Date) => formik.setFieldValue('end_time', value)}
            />
          </FormControl>

          <NumberInput
            label="Seats Available"
            formControlProps={{
              id: 'seats_available',
              isInvalid: !!formik.errors?.seats_available,
            }}
            name="seats_available"
            error={formik.errors?.seats_available}
            value={formik.values?.seats_available}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('seats_available', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<CarInterface>
            formik={formik}
            name={'car_id'}
            label={'Select Car'}
            placeholder={'Select Car'}
            fetcher={getCars}
            labelField={'make'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/rides')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'ride',
    operation: AccessOperationEnum.CREATE,
  }),
)(RideCreatePage);
