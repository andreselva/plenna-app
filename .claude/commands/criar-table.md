Crie o componente de tabela para o recurso **$ARGUMENTS**.

## O que criar

### `src/Tables/<Recurso>/<Recurso>Table.jsx`

Componente de exibição dos dados em lista. Siga exatamente este padrão:

```jsx
import { Pencil, Trash2 } from "lucide-react";
import { ActionDropdown } from "../../Components/ActionDropdown/ActionDropdown";
import { FlexibleTable } from "../../Components/FlexibleTable/FlexibleTable";
import DeleteConfirmation from "../../Hooks/DeleteConfirmation/DeleteConfirmation";
import { BankAccountsTableSkeleton } from "../BankAccounts/BankAccountsTableSkeleton";

export const <Recurso>Table = ({ <recurso>s, onEdit, onDelete, loading }) => {
  if (loading) {
    return <BankAccountsTableSkeleton />;
  }

  const handleDeleteWithConfirmation = DeleteConfirmation(onDelete, {
    confirmTitle: "Deseja realmente excluir?",
    confirmText: "A exclusão é definitiva!",
    confirmButtonText: "Excluir",
    cancelButtonText: "Manter",
    successMessage: "<Recurso> excluído!",
    errorMessage: "Falha ao remover <recurso>!",
  });

  const columns = [
    {
      header: "Campo 1",
      accessor: "campo1",
      style: { flex: "1 1 40%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Campo 2",
      accessor: "campo2",
      style: { flex: "1 1 40%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Ações",
      style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
      renderCell: (<recurso>) => (
        <ActionDropdown
          actions={[
            {
              icon: <Pencil size={14} />,
              text: "Editar",
              handler: () => onEdit(<recurso>),
            },
            {
              icon: <Trash2 size={14} />,
              text: "Excluir",
              handler: () => handleDeleteWithConfirmation(<recurso>.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FlexibleTable
      columns={columns}
      data={<recurso>s}
      noDataMessage="Nenhum <recurso> cadastrado"
    />
  );
};
```

## Regras das colunas

Cada coluna do array `columns` aceita:
- `header` — texto do cabeçalho
- `accessor` — nome da propriedade no objeto (para valores simples)
- `renderCell` — função `(item) => JSX` para valores formatados ou com componentes
- `style` — objeto de estilo inline; use `flex` para controlar a largura proporcional
- `className` — classe CSS adicional (opcional)

Os percentuais de `flex` das colunas devem somar ~100%. Exemplos:
- 3 colunas: `40% / 40% / 20%`
- 4 colunas: `35% / 30% / 20% / 15%`

## Regras obrigatórias

- Sempre mostre `BankAccountsTableSkeleton` enquanto `loading` for `true`
- Sempre use `DeleteConfirmation` para confirmação antes de deletar — nunca chame `onDelete` diretamente
- Sempre use `FlexibleTable` para a renderização da lista
- Sempre use `ActionDropdown` com ícones `Pencil` e `Trash2` do `lucide-react` para as ações
- A tabela é apenas de exibição — não faz chamadas à API diretamente
- Valores que precisam de formatação devem usar `renderCell`, não `accessor`
