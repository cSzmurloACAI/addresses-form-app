import { Box, Typography } from "@mui/material";
import { AddressesForm } from "./components/AddressesForm";
import { AddressesList } from "./components/AddressesList";
import { useAddresses } from "./hooks/useAddresses";

export const Addresses: React.FC = () => {
  const { addresses, addAddress, removeAddress } = useAddresses();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginInline: "auto",
        paddingInline: 4,
        width: 600,
        minWidth: 320,
        maxWidth: "calc(100% - 4em)",
        paddingBlock: 10,
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontWeight: 700,
          letterSpacing: 0.05,
          fontSize: "1.25em",
          marginBottom: 1,
        }}
      >
        Addresses
      </Typography>
      <Typography component="p" sx={{ color: "#444455", marginBottom: 2.5 }}>
        Search for an address to add it to your list. You will be able to add
        directions to the location on the booking form.
      </Typography>
      <AddressesForm handleAddAddress={addAddress} />
      <AddressesList
        addresses={addresses}
        handleRemoveAddress={removeAddress}
      />
    </Box>
  );
};
