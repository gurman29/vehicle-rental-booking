// Replace the DatePicker import temporarily with a regular input
import { TextField } from '@mui/material';

const DateStep = ({ control }) => {
  return (
    <div className="space-y-4 mt-4">
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label="End Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
    </div>
  );
};

export default DateStep;