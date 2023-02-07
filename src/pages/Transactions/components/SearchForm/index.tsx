import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SearchFormContainer } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../../../contexts/TransactionsContext";

const formSchema = z.object({
    query: z.string(),
});

type SearchFormInputs = z.infer<typeof formSchema>;

export function SearchForm() {
    const { getTransactions } = useContext(TransactionContext);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(formSchema),
    });

    async function handleSearchTransactions(data: SearchFormInputs) {
        await getTransactions(data.query);
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register("query")}
            />
            <button disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    );
}
