import {
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";
import { usePlacesWidget } from "react-google-autocomplete";

type AddressAutocompleteInputProps = {
  onChange: (address: Address["address"]) => void;
  helperText?: string;
} & Omit<OutlinedInputProps, "onChange">;

export const AddressAutocompleteInput: React.FC<
  AddressAutocompleteInputProps
> = ({ onChange, helperText, ...props }) => {
  const { ref: addressAutocompleteRef } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    onPlaceSelected: (address) => {
      onChange(address.formatted_address);
    },
    options: { types: ["address"] },
  });

  return (
    <>
      <OutlinedInput
        inputRef={addressAutocompleteRef}
        startAdornment={
          <InputAdornment position="start">
            <PlaceIcon />
          </InputAdornment>
        }
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <FormHelperText error>{helperText}</FormHelperText>
    </>
  );
};
