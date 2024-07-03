import { useState } from "react";
import { v4 as uuid } from "uuid";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const addAddress = (address: Address) => {
    const addressWithId = { ...address, id: uuid() };
    setAddresses([...addresses, addressWithId]);
  };

  const removeAddress = (id: Address["id"]) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return { addresses, addAddress, removeAddress };
};
