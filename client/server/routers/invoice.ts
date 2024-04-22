import { publicProcedure, router } from "@/server"
import { z } from "zod"

export const invoiceRouter = router({
  get_all: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.invoice.findMany({
        where: {
          user_id: input.id,
        },
      })
    }),
  get_one: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.invoice.findFirst({
        where: {
          user_id: input.id,
        },
      })
    }),

  delete: publicProcedure
    .input(z.object({ invoice_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.invoice.delete({
        where: {
          id: input.invoice_id,
        },
      })
    }),

  create: publicProcedure
    .input(
      z.object({
        toBusinessName: z.string(),
        toWebsite: z.string().optional(),
        toAddress: z.string().optional(),
        toEmail: z.string(),
        toPhone: z.string().optional(),
        // From
        fromBusinessName: z.string().optional(),
        fromPhone: z.string().optional(),
        fromEmail: z.string().optional(),
        fromDate: z.string().optional(),
        fromAddress: z.string().optional(),
        // Footer
        footerNote: z.string().optional(),
        thanksMsg: z.string().optional(),
        total: z.number(),
        subtotal: z.number(),
        tax: z.number().optional(),
        discount: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.invoice.create({
        data: {
          fromAddress: input.fromAddress!,
          fromBusinessName: input.fromBusinessName!,
          fromDate: input.fromDate!,
          fromEmail: input.fromEmail!,
          fromPhone: input.fromPhone!,
          toBusinessName: input.toBusinessName,
          toEmail: input.toEmail,
          toAddress: input.toAddress,
          toPhone: input.toPhone,
          footerNote: input.footerNote!,
          thanksMsg: input.thanksMsg!,
          toWebsite: input.toWebsite,
          total: input.total,
          subtotal: input.subtotal,
          tax: input.tax,
          discount: input.discount,
        },
      })
    }),
})
