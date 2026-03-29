import { useState } from "react";
import { useCustomers } from "../Hooks/CustomersManager/useCustomers";

const EMPTY_CUSTOMER = {
  name: "",
  email: "",
  phone: "",
  cep: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  country: "",
  document: "",
};

const onlyDigits = (value = "") => value.replace(/\D/g, "");

const formatCpfCnpj = (value = "") => {
  const digits = onlyDigits(value).slice(0, 14);

  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

const formatPhone = (value = "") => {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

const formatCep = (value = "") => {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.replace(/^(\d{5})(\d)/, "$1-$2");
};

export const useCustomerHandler = () => {
  const {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    loading,
    error,
  } = useCustomers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState(EMPTY_CUSTOMER);

  const setField = (field, value) => {
    let nextValue = value;

    if (field === "document") {
      nextValue = formatCpfCnpj(value);
    }

    if (field === "phone") {
      nextValue = formatPhone(value);
    }

    if (field === "cep") {
      nextValue = formatCep(value);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: nextValue,
    }));
  };

  const resetForm = () => {
    setEditingCustomer(null);
    setFormData(EMPTY_CUSTOMER);
  };

  const normalizePayload = () => ({
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: onlyDigits(formData.phone) || undefined,
    cep: onlyDigits(formData.cep) || undefined,
    street: formData.street?.trim() || undefined,
    number: formData.number?.trim() || undefined,
    neighborhood: formData.neighborhood?.trim() || undefined,
    city: formData.city?.trim() || undefined,
    state: formData.state?.trim() || undefined,
    country: formData.country?.trim() || undefined,
    document: onlyDigits(formData.document) || undefined,
  });

  const validate = () => {
    if (!formData.name.trim()) {
      alert("O nome do cliente não pode ser vazio.");
      return false;
    }

    if (!formData.email.trim()) {
      alert("O e-mail do cliente não pode ser vazio.");
      return false;
    }

    const documentDigits = onlyDigits(formData.document);
    if (!documentDigits || ![11, 14].includes(documentDigits.length)) {
      alert("Informe um CPF ou CNPJ válido.");
      return false;
    }

    return true;
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name || "",
      email: customer.email || "",
      phone: formatPhone(customer.phone || ""),
      cep: formatCep(customer.cep || ""),
      street: customer.street || customer.address || "",
      number: customer.number || "",
      neighborhood: customer.neighborhood || "",
      city: customer.city || "",
      state: customer.state || "",
      country: customer.country || "",
      document: formatCpfCnpj(customer.document || ""),
    });
    setIsModalOpen(true);
  };

  const handleSaveCustomer = async () => {
    if (!validate()) return;

    const payload = normalizePayload();

    if (editingCustomer) {
      await updateCustomer(editingCustomer.id, payload);
    } else {
      await addCustomer(payload);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteCustomer = async (id) => {
    await deleteCustomer(id);
  };

  return {
    customers,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    editingCustomer,
    setEditingCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    handleSaveCustomer,
    resetForm,
    loading,
    error,
  };
};