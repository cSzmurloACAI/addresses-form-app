import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type AddressesListProps = {
  addresses: Address[];
  handleRemoveAddress: (id: Address["id"]) => void;
};

export const AddressesList: React.FC<AddressesListProps> = ({
  addresses,
  handleRemoveAddress,
}) => {
  if (!addresses.length)
    return (
      <Typography color="#444455" sx={{ alignSelf: "center" }}>
        No addresses yet!
      </Typography>
    );
  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      {addresses.map(({ id, address, departmentIds, description }) => (
        <Box
          key={id}
          component="article"
          sx={{
            border: "1px solid #dddddd",
            borderRadius: "6px",
            padding: "0.75em 1em",
            position: "relative",
          }}
        >
          <Typography
            component="header"
            fontWeight={700}
            sx={{ maxWidth: "calc(100% - 30px)" }}
          >
            {address}
          </Typography>
          <Typography component="span" fontSize="0.9em" color="#444455">
            No. of departments who use this address:{" "}
            <Typography component="span" fontSize="0.9em" fontWeight={700}>
              {departmentIds.length}
            </Typography>
          </Typography>
          <Typography fontSize="0.9em" color="#444455">
            Directions: {description || "(N/A)"}
          </Typography>
          <IconButton
            size="medium"
            onClick={() => handleRemoveAddress(id)}
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              height: "1.5em",
              width: "1.5em",
            }}
          >
            <DeleteIcon sx={{ fontSize: "0.8em" }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};
