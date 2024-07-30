import { z } from 'zod';

export const checkout_details = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .nonempty("Name is required"),
    
  address_line_1: z
    .string({ required_error: "Address is required" })
    .nonempty("Address is required"),
  
  address_line_2: z
    .string()
    .optional(),
    
  city: z
    .string({ required_error: "City is required" })
    .nonempty("City is required"),
    
  state: z
    .string({ required_error: "State is required" })
    .nonempty("State is required"),
    
  postal_code: z
    .string({ required_error: "Postal code is required" })
    .nonempty("Postal code is required"),
    
  phone: z
    .string({ required_error: "Phone is required" })
    .nonempty("Phone is required")
    .regex(/^\d+$/, "Phone number must be numeric only"),
});
