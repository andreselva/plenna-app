import GenericModal from "../../Components/GenericModal/GenericModal";

export const ModalCustomers = ({
  setIsModalOpen,
  handleSaveCustomer,
  setEditingCustomer,
  editingCustomer,
  formData,
  setField,
  resetForm,
}) => {
  const handleCancel = () => {
    resetForm();
    setEditingCustomer(null);
    setIsModalOpen(false);
  };

  const formFields = [
    {
      title: "Dados principais",
      fields: [
        {
          id: "name",
          label: "Nome",
          type: "text",
          value: formData.name,
          onChange: (value) => setField("name", value),
          placeholder: "Ex: João da Silva",
          required: true,
          size: "half-width-large",
        },
        {
          id: "email",
          label: "E-mail",
          type: "email",
          value: formData.email,
          onChange: (value) => setField("email", value),
          placeholder: "Ex: cliente@email.com",
          required: true,
          size: "half-width-large",
        },
        {
          id: "phone",
          label: "Telefone",
          type: "text",
          value: formData.phone,
          onChange: (value) => setField("phone", value),
          placeholder: "Ex: (54) 99999-9999",
          size: "half-width-medium",
        },
        {
          id: "document",
          label: "Documento",
          type: "text",
          value: formData.document,
          onChange: (value) => setField("document", value),
          placeholder: "CPF ou CNPJ",
          required: true,
          size: "half-width-medium",
        },
      ],
    },
    {
      title: "Endereço",
      fields: [
        {
          id: "cep",
          label: "CEP",
          type: "text",
          value: formData.cep,
          onChange: (value) => setField("cep", value),
          placeholder: "Ex: 95700-000",
          size: "half-width-middle-medium",
        },
        {
          id: "street",
          label: "Rua",
          type: "text",
          value: formData.street,
          onChange: (value) => setField("street", value),
          placeholder: "Ex: Rua das Flores",
          size: "half-width-large",
        },
        {
          id: "number",
          label: "Número",
          type: "text",
          value: formData.number,
          onChange: (value) => setField("number", value),
          placeholder: "Ex: 123",
          size: "half-width-middle-medium",
        },
        {
          id: "neighborhood",
          label: "Bairro",
          type: "text",
          value: formData.neighborhood,
          onChange: (value) => setField("neighborhood", value),
          placeholder: "Ex: Centro",
          size: "half-width-medium",
        },
        {
          id: "city",
          label: "Cidade",
          type: "text",
          value: formData.city,
          onChange: (value) => setField("city", value),
          placeholder: "Ex: Bento Gonçalves",
          size: "half-width-medium",
        },
        {
          id: "state",
          label: "Estado",
          type: "text",
          value: formData.state,
          onChange: (value) => setField("state", value),
          placeholder: "Ex: RS",
          size: "half-width-middle-medium",
        },
        {
          id: "country",
          label: "País",
          type: "text",
          value: formData.country,
          onChange: (value) => setField("country", value),
          placeholder: "Ex: Brasil",
          size: "half-width-medium",
        },
      ],
    },
  ];

  return (
    <GenericModal
      isOpen={true}
      title={editingCustomer ? "Editar cliente" : "Cadastrar cliente"}
      formFields={formFields}
      onSubmit={handleSaveCustomer}
      onCancel={handleCancel}
      submitButtonText={editingCustomer ? "Salvar" : "Adicionar"}
      width="900px"
    />
  );
};