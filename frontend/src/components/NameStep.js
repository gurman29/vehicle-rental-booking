import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface NameStepProps {
  control: Control<any>;
}

export default function NameStep({ control }: NameStepProps) {
  return (
    <div className="space-y-4 mt-4">
      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label="First Name"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        rules={{ required: 'Last name is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            label="Last Name"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </div>
  );
}