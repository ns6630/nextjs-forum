'use client';

import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { checkEmail } from '@/app/registration/actions';

export default function RegistrationForm() {
  // const [state, dispatch] = useReducer(reducer, { available: false, loading: false });

  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      <TextInput
        type="email"
        label="Email"
        error={errors.email?.message}
        {...register('email', {
          validate: async (value) => {
            if (!/^\S+@\S+$/.test(value)) return 'Invalid email';
            return checkEmail(value);
          },
        })}
      />
      <TextInput
        type="password"
        label="Password"
        error={errors.password?.message}
        {...register('password', {
          minLength: { value: 4, message: 'Password must be at least 4 characters.' },
        })}
      />
      <Group>
        <Button type="submit">
          Register
        </Button>
        <Button disabled={!isDirty} onClick={() => reset()}>
          Reset
        </Button>
      </Group>
    </form>
  );
}
