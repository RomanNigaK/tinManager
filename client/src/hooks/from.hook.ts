import { useState } from "react";

export const useFormContext = () => {
  const [email, setEmail] = useState<null | string>(null);

  return { email, setEmail };
};
