import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useOrders } from "@/hooks/use-orders";
import { type OrderData, orderSchema } from "@/schemas/order";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

enum Sides {
  Compra = "BUY",
  Venda = "SELL",
}

interface OrderFormProps {
  onFormClose?: () => void;
}

export function OrderForm({ onFormClose }: OrderFormProps) {
  const { createOrder } = useOrders();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      instrument: "",
      price: undefined,
      quantity: 0,
      side: undefined,
    },
  });

  function onSubmit(data: OrderData) {
    createOrder(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="instrument"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="instrument">Instrumento</FieldLabel>
                <Input
                  {...field}
                  id="instrument"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="side"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>&nbsp;</FieldLabel>
                <ToggleGroup
                  variant="outline"
                  type="single"
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  {Object.entries(Sides).map(([label, value]) => (
                    <ToggleGroupItem
                      className="cursor-pointer flex-1"
                      key={value}
                      value={value}
                    >
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="price">Preço</FieldLabel>
                <Input
                  {...field}
                  id="price"
                  type="number"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  value={field.value || ""}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="quantity"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="quantity">Quantidade</FieldLabel>
                <Input
                  {...field}
                  id="quantity"
                  type="number"
                  step="1"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
      <DialogFooter className="border-t p-4 bg-muted rounded-b-xl">
        <DialogClose asChild>
          <Button variant="outline">Fechar</Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar"}
        </Button>
      </DialogFooter>
    </form>
  );
}
