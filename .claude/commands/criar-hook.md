Crie o hook de gerenciamento de dados para o recurso **$ARGUMENTS**.

## O que criar

### 1. Hook base — `src/Hooks/<Recurso>Manager/use<Recurso>s.jsx`

Responsável pela comunicação com a API e pelo estado dos dados. Siga exatamente este padrão:

```jsx
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";

const apiUrl = "/<recurso-no-plural>";

export const use<Recurso>s = () => {
  const [<recurso>s, set<Recurso>s] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch<Recurso>s = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: response, status } = await axiosInstance.get(apiUrl);

      if (response && status >= 200 && status <= 204) {
        const payload =
          response.payload?.<recurso>s ??
          response.payload ??
          response ??
          [];
        set<Recurso>s(Array.isArray(payload) ? payload : []);
        return;
      }

      throw new Error("Um erro ocorreu ao buscar os <recurso>s.");
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch<Recurso>s();
  }, [fetch<Recurso>s]);

  const add<Recurso> = async (<recurso>) => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.post(`${apiUrl}/create`, <recurso>);
      if (response && status >= 200 && status <= 204) {
        await fetch<Recurso>s();
        AlertToast({ icon: "success", title: "<Recurso> cadastrado com sucesso." });
        return true;
      }
      throw new Error("Ocorreu um erro ao cadastrar o <recurso>.");
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.CREATE);
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const update<Recurso> = async (id, <recurso>) => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.put(`${apiUrl}/update/${id}`, <recurso>);
      if (response && status >= 200 && status <= 204) {
        await fetch<Recurso>s();
        AlertToast({ icon: "success", title: "<Recurso> atualizado com sucesso." });
        return true;
      }
      throw new Error("Ocorreu um erro ao atualizar o <recurso>.");
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.UPDATE);
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const delete<Recurso> = async (id) => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.delete(`${apiUrl}/${id}`);
      if (response && status >= 200 && status <= 204) {
        await fetch<Recurso>s();
        AlertToast({ icon: "success", title: "<Recurso> excluído com sucesso." });
        return true;
      }
      throw new Error("Ocorreu um erro durante a exclusão do <recurso>.");
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.DELETE);
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const defineErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation} <recurso>: ${err.response.data.message}.`;
    }
    return `Ocorreu um erro ao ${operation} <recurso>.`;
  };

  return {
    <recurso>s,
    loading,
    error,
    add<Recurso>,
    update<Recurso>,
    delete<Recurso>,
    refetch: fetch<Recurso>s,
  };
};
```

### 2. Handler — `src/Handlers/use<Recurso>Handler.jsx`

Responsável pelo estado do formulário e pelas ações da tela. Importa o hook base e centraliza toda a lógica de UI:

```jsx
import { useState } from "react";
import { use<Recurso>s } from "../Hooks/<Recurso>Manager/use<Recurso>s";

const EMPTY_<RECURSO> = {
  // campos do formulário com valores iniciais vazios
};

export const use<Recurso>Handler = () => {
  const { <recurso>s, add<Recurso>, update<Recurso>, delete<Recurso>, refetch, loading, error } = use<Recurso>s();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing<Recurso>, setEditing<Recurso>] = useState(null);
  const [formData, setFormData] = useState(EMPTY_<RECURSO>);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEditing<Recurso>(null);
    setFormData(EMPTY_<RECURSO>);
  };

  const validate = () => {
    // validações dos campos obrigatórios
    return true;
  };

  const normalizePayload = () => ({
    // normaliza os dados antes de enviar para a API
    ...formData,
  });

  const handleEdit<Recurso> = (<recurso>) => {
    setEditing<Recurso>(<recurso>);
    setFormData({ /* popula com os dados do recurso */ });
    setIsModalOpen(true);
  };

  const handleSave<Recurso> = async () => {
    if (!validate()) return;
    const payload = normalizePayload();
    let success = false;

    if (editing<Recurso>) {
      success = await update<Recurso>(editing<Recurso>.id, payload);
    } else {
      success = await add<Recurso>(payload);
    }

    if (!success) return;
    resetForm();
    setIsModalOpen(false);
  };

  const handleDelete<Recurso> = async (id) => {
    await delete<Recurso>(id);
  };

  return {
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
  };
};
```

## Regras obrigatórias

- Sempre use `axiosInstance` (nunca axios direto)
- Sempre use `AlertToast` para feedback de sucesso e erro
- Sempre use `Operations` enum nas mensagens de erro (`Operations.BUSCAR`, `Operations.CREATE`, `Operations.UPDATE`, `Operations.DELETE`)
- Use `useCallback` + `useEffect` para o fetch inicial — **nunca** use `useRef` como guard de double-fetch
- Todas as operações (`add`, `update`, `delete`) chamam `refetch` ao invés de atualizar o estado local manualmente
- Todas as operações retornam `boolean` (`true` = sucesso, `false` = erro)
- Sempre exponha `refetch` no retorno do hook base e do handler
- O hook base (`use<Recurso>s`) só cuida de estado e API — sem lógica de formulário
- O handler (`use<Recurso>Handler`) só cuida de formulário e ações de UI — sem chamadas diretas à API
- O nome do hook começa sempre com `use` (camelCase)
