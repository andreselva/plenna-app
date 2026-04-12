Crie uma tela completa para o recurso **$ARGUMENTS**.

Uma tela completa é composta por 4 partes. Execute cada uma delas em sequência:

---

## 1. Hook (comunicação com API e estado do formulário)

Use o comando `/criar-hook $ARGUMENTS` para criar:
- `src/Hooks/<Recurso>Manager/use<Recurso>s.jsx` — busca, criação, edição e remoção via API
- `src/Handlers/use<Recurso>Handler.jsx` — estado do formulário, validação e ações de UI

---

## 2. Tabela (listagem dos dados)

Use o comando `/criar-table $ARGUMENTS` para criar:
- `src/Tables/<Recurso>/<Recurso>Table.jsx` — tabela com colunas, skeleton de loading e ações de editar/excluir

---

## 3. Modal (formulário de criação/edição)

Use o comando `/criar-modal $ARGUMENTS` para criar:
- `src/Modals/Modal<Recurso>/Modal<Recurso>.jsx` — formulário usando `GenericModal`

---

## 4. Página (orquestração)

Crie `src/Pages/<Recurso>/<Recurso>.jsx` seguindo este padrão:

```jsx
import { use<Recurso>Handler } from "../../Handlers/use<Recurso>Handler";
import { Modal<Recurso> } from "../../Modals/Modal<Recurso>/Modal<Recurso>";
import globalStyles from "../../Styles/GlobalStyles.module.css";
import { <Recurso>Table } from "../../Tables/<Recurso>/<Recurso>Table";

const <Recurso> = () => {
  const {
    <recurso>s,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    editing<Recurso>,
    setEditing<Recurso>,
    handleEdit<Recurso>,
    handleDelete<Recurso>,
    handleSave<Recurso>,
    resetForm,
    refetch,
    loading,
    error,
  } = use<Recurso>Handler();

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles["container-content"]}>
        <div className={globalStyles["content-title"]}>
          <div className={globalStyles["content-title-items"]}>
            <div className={globalStyles["content-title-items-left"]}>
              <button
                className={globalStyles["title-items-button"]}
                onClick={handleOpenModal}
              />
              <span className={globalStyles["title-items-span"]}><Recurso>s</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <<Recurso>Table
            <recurso>s={<recurso>s}
            onEdit={handleEdit<Recurso>}
            onDelete={handleDelete<Recurso>}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {isModalOpen && (
        <Modal<Recurso>
          setIsModalOpen={setIsModalOpen}
          handleSave<Recurso>={handleSave<Recurso>}
          setEditing<Recurso>={setEditing<Recurso>}
          editing<Recurso>={editing<Recurso>}
          formData={formData}
          setField={setField}
          resetForm={resetForm}
        />
      )}
    </div>
  );
};

export default <Recurso>;
```

---

## 5. Registrar a rota

Adicione a rota em `src/routes/appRoutes.jsx`:

```jsx
import <Recurso> from '../Pages/<Recurso>/<Recurso>';

// Dentro do array appRoutes:
{
  path: '/<recurso>s',
  element: <<Recurso> />,
  meta: {
    label: '<Recurso>s',
    icon: <IconeAqui />,
    placements: ['sidebar'],   // ou ['settings'] se for item de configuração
    accessPath: '/<recurso>s',
  },
},
```

---

## Regras gerais

- A página é uma camada de orquestração — não faz chamadas à API nem contém lógica de negócio
- O modal só é renderizado quando `isModalOpen` é `true` (renderização condicional com `&&`)
- Use sempre `globalStyles` de `src/Styles/GlobalStyles.module.css` para o layout da página
- Ao abrir o modal para criação, sempre chame `resetForm()` antes de `setIsModalOpen(true)`
- Ícones vêm do pacote `lucide-react`
