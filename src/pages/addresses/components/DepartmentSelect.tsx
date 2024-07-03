import {
  Checkbox,
  FormHelperText,
  ListItemText,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useDepartments } from "../hooks/useDepartments";

type DepartmentSelectProps = {
  value: Department["id"][];
  helperText?: string;
} & Omit<SelectProps<Department["id"][]>, "value">;

export const DepartmentSelect: React.FC<DepartmentSelectProps> = ({
  sx,
  helperText,
  ...props
}) => {
  const departments = useDepartments();

  return (
    <>
      <Select
        id="departmentIds"
        name="departmentIds"
        multiple
        displayEmpty
        renderValue={(departmentIds) => {
          const departmentNames = departments
            .filter((department) =>
              departmentIds.some(
                (departmentId) => departmentId === department.id,
              ),
            )
            .map((department) => department.name)
            .join(", ");

          return departmentNames || "Select department(s)";
        }}
        {...props}
        sx={{ minWidth: 200, ...sx }}
      >
        {departments.map((department) => (
          <MenuItem key={department.id} value={department.id}>
            <Checkbox
              checked={props.value.some(
                (departmentId) => departmentId === department.id,
              )}
            />
            <ListItemText primary={department.name} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{helperText}</FormHelperText>
    </>
  );
};
