import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";


interface DefaultToastProps {
  altText: string;
}

const DefaultToast = ({ altText }: DefaultToastProps) =>{ 
  const [open, setOpen] = useState(false);
  
  return(
  <Toast.Provider>
    <Toast.Root>
      <Toast.Title />
      <Toast.Description />
      <Toast.Action altText={altText} />
      <Toast.Close />
    </Toast.Root>

    <Toast.Viewport />
  </Toast.Provider>
)};

export default DefaultToast;
