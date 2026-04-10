Crie o componente de modal de formulário para o recurso **$ARGUMENTS**.

## O que criar

### `src/Modals/Modal<Recurso>/Modal<Recurso>.jsx`

Modal de criação e edição do recurso. Siga exatamente este padrão:

```jsx
import GenericModal from "../../Components/GenericModal/GenericModal";

export const Modal<Recurso> = ({
  setIsModalOpen,
  handleSave<Recurso>,
  setEditing<Recurso>,
  editing<Recurso>,
  formData,
  setField,
  resetForm,
}) => {
  const handleCancel = () => {
    resetForm();
    setEditing<Recurso>(null);
    setIsModalOpen(false);
  };

  const formFields = [
    {
      title: "Dados principais",
      fields: [
        {
          id: "campo1",
          label: "Campo 1",
          type: "text",
          value: formData.campo1,
          onChange: (value) => setField("campo1", value),
          placeholder: "Ex: ...",
          required: true,
          size: "half-width-large",
        },
        {
          id: "campo2",
          label: "Campo 2",
          type: "text",
          value: formData.campo2,
          onChange: (value) => setField("campo2", value),
          placeholder: "Ex: ...",
          size: "half-width-medium",
        },
      ],
    },
  ];

  return (
    <GenericModal
      isOpen={true}
      title={editing<Recurso> ? "Editar <recurso>" : "Cadastrar <recurso>"}
      formFields={formFields}
      onSubmit={handleSave<Recurso>}
      onCancel={handleCancel}
      submitButtonText={editing<Recurso> ? "Salvar" : "Adicionar"}
      width="600px"
    />
  );
};
```

## Referência de tipos de campo (`type`)

| Tipo | Componente renderizado |
|------|----------------------|
| `text` / `email` / `number` / `date` | `<input type="...">` padrão |
| `select` | `<select>` com array `options: [{ value, label }]` |
| `toggle` | `ToggleSwitch` (boolean on/off) |
| `hidden` | `<input type="hidden">` (não visível) |

## Referência de tamanhos de campo (`size`)

| Valor | Largura aproximada |
|-------|-------------------|
| `full-width` | 100% da linha |
| `half-width-large` | ~60% |
| `half-width-medium` | ~40% |
| `half-width-middle-medium` | ~30% |

Campos dentro de um mesmo grupo compartilham a linha e quebram conforme os tamanhos definidos.

## Props do `GenericModal`

| Prop | Descrição |
|------|-----------|
| `isOpen` | Sempre `true` (o pai controla a renderização condicional) |
| `title` | Título do modal |
| `formFields` | Array de grupos com campos |
| `onSubmit` | Função de salvar do handler |
| `onCancel` | Função que fecha o modal e reseta o formulário |
| `submitButtonText` | Texto do botão de confirmação |
| `width` | Largura do modal (ex: `"600px"`, `"900px"`) |
| `loading` | Exibe overlay de carregamento (opcional) |
| `extraPayload` | Dados adicionais mesclados no payload (opcional) |
| `extraActionButton` | Botão de ação adicional `{ text, onClick, visible, disabled, style }` (opcional) |
| `hideSubmitButton` | Oculta o botão de submit (opcional) |
| `children` | Substituição total do corpo do modal por JSX livre (opcional) |

## Regras obrigatórias

- Sempre use `GenericModal` — nunca crie a estrutura de modal manualmente
- `handleCancel` deve sempre chamar `resetForm()` e `setEditing<Recurso>(null)` antes de fechar
- O título deve mudar entre criação e edição usando `editing<Recurso>`
- O botão de submit deve mudar de "Adicionar" (criação) para "Salvar" (edição)
- O modal não acessa a API diretamente — toda a lógica fica no handler
