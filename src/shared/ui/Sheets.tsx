import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

interface ISheetProps {
  trigger: string;
  title: string;
  children: React.ReactNode
}

const Sheets: React.FC<ISheetProps> = ({ trigger, title, children }) => {
  return (
    <Sheet>
      <SheetTrigger><img src={trigger} style={{width: "50px", height: "50px"}}/></SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default Sheets;
