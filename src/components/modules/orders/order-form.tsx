import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MoneyInput } from "@/components/inputs/money-input";
import { StockInput } from "@/components/inputs/stock-input";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCreateOrder } from "@/hooks/use-create-order";
import { type OrderData, orderSchema } from "@/schemas/order";

enum Sides {
  Compra = "BUY",
  Venda = "SELL",
}

export function OrderForm() {
  const { createOrder } = useCreateOrder();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      instrument: "",
      price: 0,
      quantity: 0,
      side: undefined,
    },
  });

  function onSubmit(data: OrderData) {
    createOrder(data);
  }

  return (
    <form id="order-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="instrument"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="instrument">Ação</FieldLabel>
                <StockInput
                  id="instrument"
                  onChange={(item) => field.onChange(item)}
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
                <MoneyInput
                  {...field}
                  id="price"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  value={field.value}
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
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar"}
        </Button>
      </DialogFooter>
    </form>
  );
}
