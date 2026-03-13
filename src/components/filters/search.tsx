import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export function SearchFilter(props: React.ComponentProps<"input">) {
  return (
    <InputGroup className="max-w-48">
      <InputGroupInput {...props} />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
