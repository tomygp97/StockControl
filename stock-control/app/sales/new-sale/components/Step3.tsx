'use client'


import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import SaleInfo from "../../components/SaleInfo";
import { fetchAllCustomers } from "@/app/api/apiService";

// Types
import { Customer, Sale } from "@/types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useProductContext } from "../../context/ProductContext";

const initialSale: Sale = {
  _id: '',
  productsSold: [],
  customer: {
      _id: '',
      name: 'Ejemplo',
      contact: 'Cliente ejemplo',
      phone: undefined,
      email: "Ejemplo@ejemplo",
      address: undefined,
      notes: undefined,
  },
  paymentDetails: {
      method: 'Efectivo',
  },
  bill: false,
  status: 'Pendiente',
  totalPrice: 0,
  date: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  __v: 0,
};

//TODO traducir los errores a español
const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
    paymentDetails: z.object({
      method: z.enum(['Efectivo', 'Transferencia', 'Mercadopago'], {
        required_error: "Please select a payment method.",
      }),
    }),
    bill: z.boolean(),
})

const Step3 = () => {
  const [customersList, setCustomersList] = useState<Customer[]>([]);

  const {selectedProductIds} = useProductContext();
  console.log("selectedProductIds: ", selectedProductIds);

  const fetchCustomersData = async() => {
    try {
        const customersData = await fetchAllCustomers();
        setCustomersList(customersData);
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
  fetchCustomersData();
}, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialSale,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form data Step3:", data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-2/3">
                      <FormItem>
                        <FormLabel>Cliente</FormLabel>
                        <FormControl>
                          <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un cliente de la base de datos" />
                                  </SelectTrigger>
                                </FormControl>
                                {/* //TODO Seleccionar desde una tabla con todos los clientes y los datos*/}
                                <SelectContent>
                                  { customersList.map((customer) => (
                                    <SelectItem key={customer._id} value={customer.email}>{customer.name} - {customer.email}</SelectItem>
                                  ))}
                                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                                </SelectContent>
                              </Select>
                                {fieldState.error && (
                                  <FormMessage>{fieldState.error.message}</FormMessage>
                                )}
                              </>
                            )}
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                      <Label htmlFor="bill">Facturar</Label>
                      <FormControl>
                        <Controller
                          name="bill"
                          control={form.control}
                          render={({ field }) => (
                            <Switch id="bill" checked={field.value} onCheckedChange={field.onChange} />
                          )}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <FormItem>
                      <FormLabel>Método de Pago</FormLabel>
                      <FormControl>
                        <Controller
                          name="paymentDetails.method"
                          control={form.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona una opción" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Efectivo">Efectivo</SelectItem>
                                <SelectItem value="Transferencia">Transferencia</SelectItem>
                                <SelectItem value="Mercadopago">Mercadopago</SelectItem>
                              </SelectContent>
                              <FormMessage />
                            </Select>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="mr 14">
            <SaleInfo activeSale={initialSale} saleNumber={1}/>
          </div>
        </div>
    </div>
  )
}

export default Step3