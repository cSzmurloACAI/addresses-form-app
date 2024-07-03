import {
  Box,
  Button,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AddressAutocompleteInput } from "./AddressAutocompleteInput";
import { DepartmentSelect } from "./DepartmentSelect";

const addressSchema = yup.object<Address>({
  address: yup.string().required("Address is required"),
  departmentIds: yup
    .array()
    .min(1, "Select at least one department")
    .required(),
  description: yup.string(),
});

type AddressesFormProps = {
  handleAddAddress: (address: Address) => void;
};

export const AddressesForm: React.FC<AddressesFormProps> = ({
  handleAddAddress,
}) => {
  const formik = useFormik<Address>({
    initialValues: { id: "", address: "", departmentIds: [], description: "" },
    validationSchema: addressSchema,
    onSubmit: (address) => handleAddAddress(address),
  });

  const handleChangeAddress = (address: Address["address"]) => {
    formik.setFieldValue("address", address);
  };

  const handleSelectDepartments = (e: SelectChangeEvent<string | string[]>) => {
    const values = Array.isArray(e.target.value)
      ? e.target.value
      : [e.target.value];
    formik.setFieldValue("departmentIds", values);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Typography
          component="label"
          htmlFor="address"
          sx={{ display: "block", fontSize: "0.85em" }}
        >
          Search for an address
        </Typography>
        <Box sx={{ marginBottom: 2.5 }}>
          <AddressAutocompleteInput
            id="address"
            name="address"
            fullWidth
            value={formik.values.address}
            onChange={handleChangeAddress}
            onBlur={formik.handleBlur}
            size="small"
            error={formik.touched.address && !!formik.errors.address}
            helperText={
              formik.touched.address && !!formik.errors.address
                ? formik.errors.address
                : undefined
            }
          />
        </Box>

        <Typography
          component="label"
          htmlFor="departmentIds"
          sx={{ display: "block", fontSize: "0.85em" }}
        >
          Attach the address above to one or more departments
        </Typography>
        <Box sx={{ marginBottom: 2.5 }}>
          <DepartmentSelect
            id="departmentIds"
            name="departmentIds"
            fullWidth
            value={formik.values.departmentIds}
            onChange={handleSelectDepartments}
            onBlur={formik.handleBlur}
            size="small"
            error={
              formik.touched.departmentIds && !!formik.errors.departmentIds
            }
            helperText={
              formik.touched.departmentIds && !!formik.errors.departmentIds
                ? Array.isArray(formik.errors.departmentIds)
                  ? formik.errors.departmentIds.join(", ")
                  : formik.errors.departmentIds
                : undefined
            }
          />
        </Box>
        <Typography
          component="label"
          htmlFor="description"
          sx={{ display: "block", fontSize: "0.85em" }}
        >
          Address description (Optional)
        </Typography>
        <TextField
          id="description"
          name="description"
          placeholder="Write here..."
          autoComplete="chrome-off"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          multiline
          minRows={3}
          sx={{ marginBottom: 2.5 }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            alignSelf: "flex-end",
            backgroundColor: "#6941c6",
            textTransform: "none",
            fontWeight: 400,
            marginBottom: 4,
          }}
        >
          Add address
        </Button>
      </form>
    </>
  );
};
