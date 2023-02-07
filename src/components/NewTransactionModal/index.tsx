import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import {
    CloseButton,
    Content,
    Overlay,
    TransactionType,
    TransactionTypeButton,
} from "./styles";

const formSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof formSchema>;

export function NewTransactionModal() {
    const createTransactions = useContextSelector(
        TransactionContext,
        (context) => context.createTransactions
    ); // This library will prevent unnecassary re-renders based on context changes.

    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "income",
        },
    });

    async function handleNewTransaction(data: NewTransactionFormInputs) {
        await createTransactions(data);
        reset();
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register("description")}
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        required
                        {...register("price", { valueAsNumber: true })}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register("category")}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <TransactionType
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <TransactionTypeButton
                                    variant="income"
                                    value="income"
                                >
                                    <ArrowCircleUp size={24} />
                                    Entrada
                                </TransactionTypeButton>

                                <TransactionTypeButton
                                    variant="outcome"
                                    value="outcome"
                                >
                                    <ArrowCircleDown size={24} /> Saída
                                </TransactionTypeButton>
                            </TransactionType>
                        )}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    );
}
