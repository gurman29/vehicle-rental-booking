import { 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    FormControl, 
    FormLabel,
    Button,
    Box,
    Typography
  } from '@mui/material';
  
  export default function WheelsStep({ value, onChange, onNext }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (value) {
        onNext();
      }
    };
  
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Select Number of Wheels
        </Typography>
        <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
          <RadioGroup 
            name="wheels"
            value={value || ''}
            onChange={(e) => onChange(parseInt(e.target.value))}
          >
            <FormControlLabel value={2} control={<Radio />} label="2 Wheels" />
            <FormControlLabel value={4} control={<Radio />} label="4 Wheels" />
          </RadioGroup>
        </FormControl>
        <Box mt={4}>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            disabled={!value}
          >
            Continue
          </Button>
        </Box>
      </Box>
    );
  }